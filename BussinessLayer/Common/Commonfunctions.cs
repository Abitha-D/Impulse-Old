using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.IO;
using System.Xml;

namespace BussinessLayer.Common
{
    public class Commonfunctions
    {

        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;

        public IEnumerable<ICommonFunctions> GetUid
        {
            get
            {
                List<ICommonFunctions> urole = new List<ICommonFunctions>();
                using (SqlConnection con = new SqlConnection(connectionstring))
                {
                    SqlCommand cmd = new SqlCommand("SPGetRoleDet", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        ICommonFunctions rolid = new ICommonFunctions();
                        rolid.role_id = Convert.ToInt32(rdr["role_id"]);
                        rolid.language_code = Convert.ToInt32(rdr["language_code"]);
                        rolid.user_id = Convert.ToInt32(rdr["user_id"]);
                        urole.Add(rolid);
                    }
                }
                return urole;
            }
        }

        public string BulkInsertData_IDGEN(string strSessionID, string strJsonData, string strTable, string strAutoGenField, string strFixedstring)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            string strRetData = "";
            try
            {
                //BussinessLayer.Common.ConvertJsonStringToDataTable cjdt = new ConvertJsonStringToDataTable();
                //System.Data.DataTable dt = new DataTable();
                //   dt = cjdt.JsonStringToDataTable(strJsonData);

                XmlNode xml = JsonConvert.DeserializeXmlNode("{\"Row\":" + strJsonData + "}", "Record");
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_INSERTDATA_IDGEN_BULK");
                //SqlCommand myCommand = new SqlCommand("PROC_INSERTDATA_MMDDYYIDGEN");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                // To convert JSON text contained in string json into an XML node
                //XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(strJsonData, "Record");
                string strXMLData = xml.InnerXml;
                myCommand.Parameters.AddWithValue("@strXMLData", strXMLData);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strAutoGenField", strAutoGenField);
                myCommand.Parameters.AddWithValue("@strFixedString", strFixedstring);
                //string StrLogToWrite = "exec PROC_INSERTDATA_IDGEN '" + strXMLData + "','" + strTable + "','" + strAutoGenField + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }     

        public DataSet SelectGridData(GetDatas objGetData, string strTable, int PageIndex, int Fetch)
        {
            string strRetData = "";
            DataSet data = new DataSet();
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {

                //if (sqlCon == null)
                //    return " You are not authorized to use the server";

                SqlCommand myCommand = new SqlCommand("PROC_SELECT_GRID_DATA");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@strFieldNames", objGetData.strFieldNames);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strCondition", objGetData.strCondition);
                myCommand.Parameters.AddWithValue("@intPageIndex", PageIndex);
                myCommand.Parameters.AddWithValue("@intFetch", Fetch);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);

                da.Fill(data);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }

            return data;
        }
       
        public string SelectData(GetDatas objGetData, string strTable)
        {

            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {

                //if (sqlCon == null)
                //    return " You are not authorized to use the server";

                SqlCommand myCommand = new SqlCommand("PROC_SELECTDATA");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@strFieldNames", objGetData.strFieldNames);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strCondition", objGetData.strCondition);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }

            return strRetData;
        }
        public string InsertData_RetID(string strSessionID, string strJsonData, string strTable)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_INSERTDATA");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                // To convert JSON text contained in string json into an XML node
                XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(strJsonData, "Record");
                string strXMLData = doc.InnerXml;
                myCommand.Parameters.AddWithValue("@strXMLData", strXMLData);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                //string StrLogToWrite = "exec PROC_INSERTDATA '" + strXMLData + "','" + strTable + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }
        public string InsertData_IDGEN(string strSessionID, string strJsonData, string strTable, string strAutoGenField)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            string strRetData = "";
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                //SqlCommand myCommand = new SqlCommand("PROC_INSERTDATA_IDGEN");
                SqlCommand myCommand = new SqlCommand("PROC_INSERTDATA_MMDDYYIDGEN");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                // To convert JSON text contained in string json into an XML node
                XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(strJsonData, "Record");
                string strXMLData = doc.InnerXml;
                myCommand.Parameters.AddWithValue("@strXMLData", strXMLData);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strAutoGenField", strAutoGenField);
                //string StrLogToWrite = "exec PROC_INSERTDATA_IDGEN '" + strXMLData + "','" + strTable + "','" + strAutoGenField + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }     

        public string UpdateData(string strSessionID, string strCondition, string strJsonData, string strTable)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            string strRetData = "";
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_UPDATEDATA");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                // To convert JSON text contained in string json into an XML node
                XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(strJsonData, "Record");
                string strXMLData = doc.InnerXml;
                myCommand.Parameters.AddWithValue("@strXMLData", strXMLData);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strCondition", strCondition);
                //string StrLogToWrite = "exec PROC_UPDATEDATA '" + strXMLData + "','" + strTable + "','" + strCondition + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return "Update Success";
        }

        public string DeleteData(string strSessionID, string strCondition, string strTable)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_DELETEDATA");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                //string StrLogToWrite = "exec PROC_DELETEDATA '" + strTable + "','" + strCondition + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strCondition", strCondition);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return "Delete Success";
        }

        public string DeleteData(string strSessionID, string strCondition, string strTable, string strDeleteFlagField)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_DELETERECORD");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@strDelField", strDeleteFlagField);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strCondition", strCondition);
                //string StrLogToWrite = "exec PROC_DELETERECORD '" + strDeleteFlagField + "','" + strTable + "','" + strCondition + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(strTable + "DeleteRecord Error");
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return "Delete Success";
        }

        public string DeleteDatawithimage(string strSessionID, string strCondition, string strTable)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_DELETEDATA");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                //string StrLogToWrite = "exec PROC_DELETEDATA '" + strTable + "','" + strCondition + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strCondition", strCondition);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return "Delete Success";
        }
        public string ExecuteProcedure(string procName, ProcedureData objProcedureData)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            try
            {
                //sqlCon = GetConnectionString(objProcedureData.strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.CommandText = procName;
                myCommand.Parameters.Clear();
                for (int i = 0; i < objProcedureData.ProcInputData.Count; i++)
                    myCommand.Parameters.AddWithValue(string.Format("@{0}", objProcedureData.ProcParameters[i]), objProcedureData.ProcInputData[i]);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

        public string ExecuteProcedureSalaryDetails(int refNo, int sMonth, int sYear,Int64 sRoleId)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            try
            {
                //sqlCon = GetConnectionString(objProcedureData.strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.CommandText = "PROC_SELECT_EMPLOYEE_MONTHLY_SALARY_DETAILS";
                myCommand.Parameters.Clear();
                //for (int i = 0; i < objProcedureData.ProcInputData.Count; i++)
                //    myCommand.Parameters.AddWithValue(string.Format("@{0}", objProcedureData.ProcParameters[i]), objProcedureData.ProcInputData[i]);

                myCommand.Parameters.AddWithValue("@sRefNo", refNo);
                myCommand.Parameters.AddWithValue("@sRoleId", sRoleId);
                myCommand.Parameters.AddWithValue("@sMonth", sMonth);
                myCommand.Parameters.AddWithValue("@sYear", sYear);

                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

        public string ExecuteProcedure1(string procName, DateTime bdate, DateTime edate, String sEmpId)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            try
            {
                //sqlCon = GetConnectionString(objProcedureData.strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.CommandText = procName;
                myCommand.Parameters.Clear();
                //for (int i = 0; i < objProcedureData.ProcInputData.Count; i++)
                //    myCommand.Parameters.AddWithValue(string.Format("@{0}", objProcedureData.ProcParameters[i]), objProcedureData.ProcInputData[i]);

                myCommand.Parameters.AddWithValue("@bdate", bdate);
                myCommand.Parameters.AddWithValue("@edate", edate);
                myCommand.Parameters.AddWithValue("@sEmpId", sEmpId);

                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

        private bool FormatJsonOutput { get; set; }
        public string Serialize(object value)
        {
            Type type = value.GetType();

            Newtonsoft.Json.JsonSerializer json = new Newtonsoft.Json.JsonSerializer();

            json.NullValueHandling = NullValueHandling.Ignore;

            json.ObjectCreationHandling = Newtonsoft.Json.ObjectCreationHandling.Replace;
            json.MissingMemberHandling = Newtonsoft.Json.MissingMemberHandling.Ignore;
            json.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            if (type == typeof(DataTable))
                json.Converters.Add(new DataTableConverter());
            else if (type == typeof(DataSet))
                json.Converters.Add(new DataSetConverter());

            StringWriter sw = new StringWriter();
            Newtonsoft.Json.JsonTextWriter writer = new JsonTextWriter(sw);
            if (this.FormatJsonOutput)
                writer.Formatting = Newtonsoft.Json.Formatting.Indented;
            else
                writer.Formatting = Newtonsoft.Json.Formatting.None;

            writer.QuoteChar = '"';
            json.Serialize(writer, value);

            string output = sw.ToString();

            writer.Close();
            sw.Close();

            return output;
        }

        public string ExecuteProcedurewithoutdata(string procName)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            try
            {
                //sqlCon = GetConnectionString(objProcedureData.strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.CommandText = procName;
                myCommand.Parameters.Clear();
                //for (int i = 0; i < objProcedureData.ProcInputData.Count; i++)
                //    myCommand.Parameters.AddWithValue(string.Format("@{0}", objProcedureData.ProcParameters[i]), objProcedureData.ProcInputData[i]);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }


        public string ExecuteProcedure1(string procName, DateTime bdate, DateTime edate)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            try
            {
                //sqlCon = GetConnectionString(objProcedureData.strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.CommandText = procName;
                myCommand.Parameters.Clear();
                //for (int i = 0; i < objProcedureData.ProcInputData.Count; i++)
                //    myCommand.Parameters.AddWithValue(string.Format("@{0}", objProcedureData.ProcParameters[i]), objProcedureData.ProcInputData[i]);

                myCommand.Parameters.AddWithValue("@bdate", bdate);
                myCommand.Parameters.AddWithValue("@edate", edate);

                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

        public string ExecuteProcedure3(string procName, DateTime bdate, DateTime edate, String sGtype, String sEmpId)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            try
            {
                //sqlCon = GetConnectionString(objProcedureData.strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.CommandText = procName;
                myCommand.Parameters.Clear();

                //for (int i = 0; i < objProcedureData.ProcInputData.Count; i++)
                //    myCommand.Parameters.AddWithValue(string.Format("@{0}", objProcedureData.ProcParameters[i]), objProcedureData.ProcInputData[i]);

                myCommand.Parameters.AddWithValue("@bdate", bdate);
                myCommand.Parameters.AddWithValue("@edate", edate);
                myCommand.Parameters.AddWithValue("@sGtype", sGtype);
                myCommand.Parameters.AddWithValue("@sEmpId", sEmpId);

                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }
        public string CodeDuplicationCheck(string strSessionID, string strInputValue, string strTable, string strAutoGenField)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_CHK_DUPLICATION_CODE");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@strFieldValue", strInputValue);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strAutoGenField", strAutoGenField);
                //string StrLogToWrite = "exec PROC_CHK_DUPLICATION_CODE '" + "'" + strInputValue + "'," + strTable + "','" + strAutoGenField + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }


        public string CodeDuplicationCheckwithcondition(string strSessionID, string strInputValue, string strTable, string strAutoGenField, string strCondition)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_CHK_DUPLICATION_CODE_WITHCONDITION");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@strFieldValue", strInputValue);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strAutoGenField", strAutoGenField);
                myCommand.Parameters.AddWithValue("@strCondition", strCondition);
                //string StrLogToWrite = "exec PROC_CHK_DUPLICATION_CODE '" + "'" + strInputValue + "'," + strTable + "','" + strAutoGenField + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

        public string CodeDuplicationMail(string strSessionID, string strInputValue, string strInputValue1, string strTable, string strAutoGenField)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_CHK_DUPLICATION_MAIL");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@strFieldValue1", strInputValue);
                myCommand.Parameters.AddWithValue("@strFieldValue2", strInputValue1);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strAutoGenField", strAutoGenField);
                //string StrLogToWrite = "exec PROC_CHK_DUPLICATION_CODE '" + "'" + strInputValue + "'," + strTable + "','" + strAutoGenField + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

        public string DescDuplicationCheck(string strSessionID, string strUniqueField, string strUniqueFieldValue, string strTableName, string strInputField, string strInputFieldValue)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                //sqlCon = GetConnectionString(strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand("PROC_CHK_DUPLICATION_DESC");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@strTableName", strTableName);
                myCommand.Parameters.AddWithValue("@strUniqueField", strUniqueField);
                myCommand.Parameters.AddWithValue("@strUniqueFieldValue", strUniqueFieldValue);
                myCommand.Parameters.AddWithValue("@strInputField", strInputField);
                myCommand.Parameters.AddWithValue("@strInputFieldValue", strInputFieldValue);
                //string StrLogToWrite = "EXEC PROC_CHK_DUPLICATION_DESC '" + "'" + strTableName + "','" + strUniqueField + "','" + strUniqueFieldValue + "','" + strInputField + "','" + strInputFieldValue + "'";
                //oLogFile.WriteToFile(StrLogToWrite);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                //oLogFile.WriteToFile(ex.ToString());
                //return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

        public string ExecuteProcGetLeaveValue(int roleId, int refNo, int year, int type)
        {
            string strRetData = "";
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            try
            {
                //sqlCon = GetConnectionString(objProcedureData.strSessionID);
                if (sqlCon == null)
                    return " You are not authorized to use the server";
                SqlCommand myCommand = new SqlCommand();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.CommandText = "PROC_GET_EMPLOYEE_LEAVE_VALUES";
                myCommand.Parameters.Clear();

                myCommand.Parameters.AddWithValue("@refNo", refNo);
                myCommand.Parameters.AddWithValue("@sRoleId", roleId);
                myCommand.Parameters.AddWithValue("@sYear", year);
                myCommand.Parameters.AddWithValue("@sType", type);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                DataSet data = new DataSet();
                da.Fill(data);
                DataTable myDataTable = data.Tables[0];
                strRetData = Serialize(myDataTable);
                da.Dispose();
                sqlCon.Close();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            finally
            {
                if (sqlCon != null)
                {
                    if (sqlCon.State == System.Data.ConnectionState.Open)
                        sqlCon.Close();
                }
            }
            return strRetData;
        }

    }
}
