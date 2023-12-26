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
    public class CommonFunctionlink
    {
        string connectionstring = ConfigurationManager.ConnectionStrings["ConnectionBTS"].ConnectionString;
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
        public string InsertData_IDGEN_fixedstring(string fixedstring, string strJsonData, string strTable, string strAutoGenField)
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
                SqlCommand myCommand = new SqlCommand("PROC_INSERTDATA_MMDDYYIDGEN_FIXEDSTRING");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                // To convert JSON text contained in string json into an XML node
                XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(strJsonData, "Record");
                string strXMLData = doc.InnerXml;
                myCommand.Parameters.AddWithValue("@strXMLData", strXMLData);
                myCommand.Parameters.AddWithValue("@strTableName", strTable);
                myCommand.Parameters.AddWithValue("@strAutoGenField", strAutoGenField);
                myCommand.Parameters.AddWithValue("@strFixedString", fixedstring);
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

        private bool FormatJsonOutput { get; set; }

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
    }
}
