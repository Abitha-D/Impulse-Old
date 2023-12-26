using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using BussinessLayer.Common;
using System.Data;
using System.Data.SqlClient;
//using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.Runtime.Serialization;
using Newtonsoft.Json.Converters;
using System.Xml;
using Newtonsoft.Json;
using System.IO;
using System.Collections;
using System.Reflection;
using LoginFrameWork.Common;
// C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5.1\System.Configuration.dll
namespace LoginFrameWork.Authentication
{
    class login
    {
        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
        public string GetUserDetails(LoginDetails objDetails)
        {
            SqlConnection objConnectionCatalog = new SqlConnection();
            SqlConnection objSQLConnection = new SqlConnection(); ;
            try
            {
                UserModel userModel = new UserModel();
                userModel.OwningCostID = objDetails.Company;
                userModel.CompanyConnectionString = connectionstring;
                string strServerID = "1";


                objSQLConnection.ConnectionString = userModel.CompanyConnectionString.Replace(@"\\", @"\");
                SqlCommand objSQLCommand = new SqlCommand();
                SqlDataAdapter objDataAdapter = new SqlDataAdapter();
                DataTable objResults = new DataTable();
                objSQLCommand.Connection = objSQLConnection;

                //select company details         
                objSQLCommand.CommandText = " SELECT dbo.AD_TB_COMPANY_MASTER.CM_COMPANY_FULL_NAME, dbo.AD_TB_COMPANY_MASTER.language_code," +
                                            " dbo.AD_TB_COMPANY_MASTER.currency_code " +
                                            " FROM  dbo.AD_TB_COMPANY_MASTER INNER JOIN  dbo.LANGAUGE_CODE_VALUES ON dbo.AD_TB_COMPANY_MASTER.language_code = dbo.LANGAUGE_CODE_VALUES.input_language " +
                                            " WHERE CM_OWNING_COST_ID = " + userModel.OwningCostID;
                objDataAdapter.SelectCommand = objSQLCommand;
                objSQLConnection.Open();
                objDataAdapter.Fill(objResults);
                objSQLConnection.Close();
                DataRow objResultRow = objResults.Rows[0];
                userModel.CompanyName = objResultRow.IsNull("CM_COMPANY_FULL_NAME") ? string.Empty : objResultRow["CM_COMPANY_FULL_NAME"].ToString();
                userModel.CompanyLanguage = objResultRow.IsNull("language_code") ? string.Empty : objResultRow["language_code"].ToString();
                userModel.CurrencyId = objResultRow.IsNull("currency_code") ? string.Empty : objResultRow["currency_code"].ToString();

                //select user details
                objSQLCommand.CommandText = " SELECT TFS_TB_USER_MASTER.user_id, TFS_TB_USER_MASTER.username,TFS_TB_USER_MASTER.theme_preference,TFS_TB_USER_MASTER.role_id, TFS_TB_USER_MASTER.access_level, TFS_TB_USER_MASTER.ref_no" +
                                                               " FROM TFS_TB_USER_MASTER" +
                                                               " WHERE password = '" + objDetails.Password + "' AND username = '" + objDetails.User + "' AND company_code <= '" + userModel.OwningCostID + "'";
                objResults = new DataTable();
                objDataAdapter.SelectCommand = objSQLCommand;
                objSQLConnection.Open();
                objDataAdapter.Fill(objResults);
                objSQLConnection.Close();
                objResultRow = objResults.Rows[0];
                userModel.UserID = objResultRow["user_id"].ToString();
                userModel.UserName = objResultRow["username"].ToString();
                userModel.UserThemePref = objResultRow.IsNull("theme_preference") ? string.Empty : objResultRow["theme_preference"].ToString();
                userModel.EmployeeId = objResultRow["ref_no"].ToString();
                userModel.RoleId = objResultRow["role_id"].ToString();
                userModel.AccessLevel = objResultRow["access_level"].ToString();

                //Temporary adjustment
                if (Convert.ToInt32(objDetails.Company) == 40)
                {
                    userModel.AccessLevel = objResultRow["role_id"].ToString();
                }
                else
                {
                    userModel.AccessLevel = objResultRow["access_level"].ToString();
                }

                //select login user fin year id from system parameters
                objSQLCommand.CommandText = "SELECT Int_Value FROM SYSTEM_PARAMETERS WHERE (Parameter_name = 'LOGIN_USER_FINYEAR')";
                objSQLConnection.Open();
                object strLoginFinYear = objSQLCommand.ExecuteScalar();
                objSQLConnection.Close();
                strLoginFinYear = (strLoginFinYear == null) ? (string)null : strLoginFinYear;
                if (string.IsNullOrEmpty(strLoginFinYear.ToString()) || strLoginFinYear.ToString() == "0")
                    objSQLCommand.CommandText = " SELECT  dbo.AD_TB_FINANCIAL_YEAR.FIN_YEARID,dbo.AD_TB_FINANCIAL_YEAR.FIN_FINYEAR  FROM  dbo.AD_TB_FINANCIAL_YEAR INNER JOIN " +
                                                " dbo.AD_TB_COMPANY_MASTER ON dbo.AD_TB_FINANCIAL_YEAR.FIN_COMPANY_CODE = dbo.AD_TB_COMPANY_MASTER.CM_COMPANY_ID " +
                                                " WHERE CM_OWNING_COST_ID= " + objDetails.Company + " and FIN_CLOSE_FLAG<>1  order by dbo.AD_TB_FINANCIAL_YEAR.FIN_YEARID desc ";
                else
                    objSQLCommand.CommandText = " SELECT login_finyearid as FIN_YEARID,fin_finyear as FIN_FINYEAR  FROM USER_SETTING where  user_id = " + userModel.UserID;
                objResults = new DataTable();
                objDataAdapter.SelectCommand = objSQLCommand;
                objSQLConnection.Open();
                objDataAdapter.Fill(objResults);
                objSQLConnection.Close();
                objResultRow = objResults.Rows[0];
                userModel.FinYear = objResultRow.IsNull("FIN_FINYEAR") ? string.Empty : objResultRow["FIN_FINYEAR"].ToString();
                userModel.FinYearID = objResultRow.IsNull("FIN_YEARID") ? string.Empty : objResultRow["FIN_YEARID"].ToString();

                //select date format
                objSQLCommand.CommandText = "SELECT (SELECT Char_value FROM SYSTEM_PARAMETERS WHERE (Parameter_name = 'DATE_FORMAT')) AS DATEFORMAT," +
                                            "(SELECT Char_value FROM SYSTEM_PARAMETERS WHERE (Parameter_name = 'DATE_FORMAT_FOR_GRID')) AS DATEFORMATFORGRID";
                objResults = new DataTable();
                objDataAdapter.SelectCommand = objSQLCommand;
                objSQLConnection.Open();
                objDataAdapter.Fill(objResults);
                objSQLConnection.Close();
                objResultRow = objResults.Rows[0];
                userModel.DateFormat = objResultRow.IsNull("DATEFORMAT") ? "2" : objResultRow["DATEFORMAT"].ToString();

                //create user session id
                objSQLCommand.CommandText = "CM_PROC_INSERT_CATELOG_SESSION";
                objSQLCommand.Connection = objSQLConnection;
                objSQLCommand.CommandType = CommandType.StoredProcedure;

                objSQLCommand.Parameters.AddWithValue("@nUserID", userModel.UserID);
                objSQLCommand.Parameters.AddWithValue("@nServerID", strServerID);
                objSQLCommand.Parameters.AddWithValue("@strConnectionString", userModel.CompanyConnectionString);
                objSQLCommand.Parameters.AddWithValue("@strIPAddress", objDetails.IPAddress);
                objSQLCommand.Parameters.AddWithValue("@OwningCostId", userModel.OwningCostID);
                objDataAdapter = new SqlDataAdapter(objSQLCommand);
                objResults = new DataTable();
                objSQLConnection.Open();
                objDataAdapter.Fill(objResults);
                objSQLConnection.Close();
                objResultRow = objResults.Rows[0];
                userModel.SessionID = objResultRow.IsNull("SESSIONID") ? string.Empty : objResultRow["SESSIONID"].ToString();

                objResults.Dispose();
                objDataAdapter.Dispose();
                objSQLCommand.Dispose();
                objSQLConnection.Dispose();

                #region convert to datatable
                DataTable dt = new DataTable("OutputData");
                DataRow dr = dt.NewRow();
                dt.Rows.Add(dr);
                userModel.GetType().GetProperties().ToList().ForEach(f =>
                {
                    try
                    {
                        f.GetValue(userModel, null);
                        dt.Columns.Add(f.Name, f.PropertyType);
                        dt.Rows[0][f.Name] = f.GetValue(userModel, null);
                    }
                    catch { }
                });
                #endregion
                Javascript JavascriptObj = new Javascript();
                //string data = JavascriptObj.JsonSerializer<string>(dt);
                return JsonConvert.SerializeObject(dt);
            }
            catch
            {
                if (objConnectionCatalog != null && objConnectionCatalog.State != ConnectionState.Closed)
                    objConnectionCatalog.Close();
                if (objSQLConnection != null && objSQLConnection.State != ConnectionState.Closed)
                    objSQLConnection.Close();
            }
            return "";

        }
    }
}
