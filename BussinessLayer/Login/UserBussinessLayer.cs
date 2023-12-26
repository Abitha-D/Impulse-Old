using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using BussinessLayer.Common;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
namespace BussinessLayer.Login
{
    public class UserBussinessLayer
    {
        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
        public string CheckUserLogin(LoginDetails objDetails)
        {

            object owningCostID = objDetails.Company;
            object companyConnectionString = connectionstring;

            if (companyConnectionString != null)
            {

                //getting company details
                string companyDetailsQuery = " SELECT dbo.AD_TB_COMPANY_MASTER.installation_type, dbo.AD_TB_COMPANY_MASTER.inactive_date" +
                                             " FROM dbo.AD_TB_COMPANY_MASTER INNER JOIN  dbo.LANGAUGE_CODE_VALUES ON dbo.AD_TB_COMPANY_MASTER.language_code = dbo.LANGAUGE_CODE_VALUES.input_language " +
                                             " WHERE CM_OWNING_COST_ID = " + owningCostID.ToString();
                SqlDataAdapter objCompanyDataAdapter = new SqlDataAdapter(companyDetailsQuery, companyConnectionString.ToString());
                DataTable companyDetails = new DataTable();
                objCompanyDataAdapter.Fill(companyDetails);
                if (companyDetails.Rows.Count > 0)
                {
                    DataRow companyDataRow = companyDetails.Rows[0];

                    //check for trial period
                    if (Convert.ToInt16(companyDataRow["installation_type"]) == 1 && Convert.ToDateTime(companyDataRow["installation_type"]).Date < DateTime.Now.Date)
                    {
                        companyDetails.Dispose();
                        objCompanyDataAdapter.Dispose();
                        return "Trial has been Expired";
                    }

                    //check for given user details 
                    string userDetailsQuery = "SELECT user_id as USERID,password_expiry,inactive_date,delete_status FROM TFS_TB_USER_MASTER" +
                                              " WHERE password = '" + objDetails.Password + "' AND username = '" + objDetails.User + "' AND company_code <= '" + owningCostID.ToString() + "'";
                    objCompanyDataAdapter = new SqlDataAdapter(userDetailsQuery, companyConnectionString.ToString());
                    DataTable userDetails = new DataTable();
                    objCompanyDataAdapter.Fill(userDetails);
                    if (userDetails.Rows.Count > 0)
                    {
                        DataRow userDetailsRow = userDetails.Rows[0];

                        //check for guest user trial period
                        //if (Convert.ToBoolean(userDetailsRow["is_guest_user"]) == true && Convert.ToDateTime(companyDataRow["inactive_date"]).Date < DateTime.Now.Date)                        
                        if (Convert.ToDateTime(companyDataRow["inactive_date"]).Date < DateTime.Now.Date)
                        {
                            userDetails.Dispose();
                            objCompanyDataAdapter.Dispose();
                            return "Login has been Expired";
                        }
                        else if (Convert.ToDateTime(userDetailsRow["password_expiry"]).Date < DateTime.Now.Date)
                        {
                            userDetails.Dispose();
                            objCompanyDataAdapter.Dispose();
                            return "Password has been Expired";
                        }
                        else if (Convert.ToInt32(userDetailsRow["delete_status"]) == 1)
                        {
                            userDetails.Dispose();
                            objCompanyDataAdapter.Dispose();
                            return "You are blocked contact Vendor";
                        }
                        userDetails.Dispose();
                        objCompanyDataAdapter.Dispose();
                        return "Success";
                    }
                    return "Invalid Login Details";
                }
                else
                    return "";
            }
            return "Selected Company Not Found";

        }

        
    }
}
