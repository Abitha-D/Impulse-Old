using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using System.Configuration;
using LoginFrameWork.Common;
using LoginFrameWork;
using LoginFrameWork.Authentication;
using BussinessLayer;
using BussinessLayer.EMail;
using BussinessLayer.Common;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Web.Script.Serialization;

namespace Impulse.Controllers
{
    public class PayrollController : Controller
    {
        Commonfunctions commonFunctionObj = new Commonfunctions();
        LoginFrameWork.Authentication.UserModel sUserDetails = new LoginFrameWork.Authentication.UserModel();

        EMail emailobj = new EMail();
        #region SessionMethod
        public string getsessionvalue()
        {
            return GetUserConfig();
        }
        private string GetUserConfig()
        {
            try
            {
                Javascript JavascriptObj = new Javascript();
                LoginFrameWork.Authentication.UserModel userModel = (System.Web.HttpContext.Current.User as UserPrincipal).user;
                sUserDetails = userModel;
                string varhdnUserDetails = JavascriptObj.CreateJsonObject(userModel);
                return varhdnUserDetails;
            }
            catch
            {
            }
            return "";
        }
        #endregion SessionMethod
        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;

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
        public ActionResult SalarySlab()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult PayrollMonthlyDetails()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public string SelectSalaryScale(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_TB_EMPLOYEE_SALARY_SCALE");

        }
        public string InsertSalaryScale(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_EMPLOYEE_SALARY_SCALE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string getserverdateOm()
        {
            DateTime now = DateTime.Now;
            DateTime yesterday = DateTime.Now.AddDays(-1);

            //now.ToString("yyyy-MM-dd");DateTime.Now.ToString("h:mm:ss tt")
            return now.ToString("yyyy-MM-dd HH:mm:ss tt");
        }
        public string UpdateSalaryScale(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "IM_TB_EMPLOYEE_SALARY_SCALE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        #region Payslip

        public ActionResult MyPayslip()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult EmployeePayslip()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        
        }
        public string SelectManagerandEmployee(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_VW_EMP_LIST");

        }
        public ActionResult SalaryPayslip()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();

        }
        public string SelectEmployeeDetailsMaster(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_MASTER");

        }
        public string SelectEmployeeDetailsForSalary(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_EMPLOYEE_MONTHLY_SALARY");

        }
        public string SelectEmployeeDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_EMPLOYEE_DETAILS");

        }
        public string SelectEmployeerSalaryDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_LEAVE_ENTRY");

        }
        public string UpdateSalaryList(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "IM_TB_EMPLOYEE_MONTHLY_SALARY_DETAILS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string InsertSalaryPayslipDetails(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_MONTHLY_PAYSLIP");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string InsertMonthlyPayslipDetails(PutDatas objPutDatas)
        {
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_EMPLOYEE_MONTHLY_SALARY_DETAILS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string SelectEmployeeMonthlySalaryDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_TB_EMPLOYEE_MONTHLY_SALARY_DETAILS");

        }
        public string SelectEmployeeSalaryDetails(int refNo, int sMonth, int sYear)
        {
            Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedureSalaryDetails(refNo, sMonth, sYear, RoleId);
        }

        

        #endregion

        #region wage

        public ActionResult GenerateWage()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();

        }

        public string SelectEmployeeDetailsByCompany(ProcedureData objProcedureData)
        {
            Int64 refNo = Convert.ToInt64(Session["emp_ref_no"].ToString());

            Int64 salRef = Convert.ToInt64(objProcedureData.ProcInputData[1]);

            Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());

            var msg = "";

            if (salRef == RoleId || RoleId == 1 || RoleId == 9 || RoleId == 10 || RoleId == 27)
            {
                Commonfunctions commonFunctionObj = new Commonfunctions();
                return commonFunctionObj.ExecuteProcedure("PROC_GET_EMPLOYEE_DETAILS", objProcedureData);
            }
            else
            {
                msg = emailobj.sendmailwithCC(refNo);

                return msg.ToString();
            }
        }

        public string SavePayroll(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_INSERT_PAYROLL_DETAILS", objProcedureData);
        }

        #endregion

        #region Payroll

        public ActionResult MyPayroll()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();

        }

        public ActionResult EmployeePayroll()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();

        }

        public String MySalaryPayroll(Nullable<Int64> refN)
        {
            string strModuleData = "";

            try
            {
                Int64 refNo;

                if(refN == null)
                {
                    refNo = Convert.ToInt64(Session["emp_ref_no"].ToString());
                }
                else
                {
                    refNo = (long)refN;
                }

                Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());
                
                if (RoleId == 1 || RoleId == 9 || RoleId == 10 || RoleId == 27)
                {

                    DataSet data = new DataSet();
                    SqlConnection sqlCon = new SqlConnection(connectionstring);
                    SqlCommand sqlCmd = new SqlCommand();

                    SqlCommand myCommand = new SqlCommand("PROC_SELECT_EMPLOYEE_SALARY_DETAILS");
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Connection = sqlCon;
                    myCommand.Parameters.AddWithValue("@empRef", refNo);
                    //myCommand.Parameters.AddWithValue("@strCondition", objGetData.strCondition);
                    //myCommand.Parameters.AddWithValue("@intPageIndex", PageIndex);
                    //myCommand.Parameters.AddWithValue("@intFetch", Fetch);
                    SqlDataAdapter da = new SqlDataAdapter(myCommand);

                    da.Fill(data);
                    da.Dispose();
                    sqlCon.Close();

                    DataTable ModuleTable = data.Tables[0];
                    strModuleData = Serialize(ModuleTable);
                }
            }
            catch (Exception ex)
            {
                //return ex.ToString();
            }
            return strModuleData;
        }

        public String GetEmployees()
        {
            string strModuleData = "";

            try
            {
                Int64 refNo = Convert.ToInt64(Session["emp_ref_no"].ToString());

                Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());

                if (RoleId == 1 || RoleId == 9 || RoleId == 10 || RoleId == 27)
                {
                    DataSet data = new DataSet();
                    SqlConnection sqlCon = new SqlConnection(connectionstring);
                    SqlCommand sqlCmd = new SqlCommand();

                    SqlCommand myCommand = new SqlCommand("PROC_GET_EMPLOYEE_DETAILS");
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Connection = sqlCon;
                    myCommand.Parameters.AddWithValue("@refNo", refNo);
                    myCommand.Parameters.AddWithValue("@RoleId", RoleId);
                    myCommand.Parameters.AddWithValue("@type", 1);
                    //myCommand.Parameters.AddWithValue("@strCondition", objGetData.strCondition);
                    //myCommand.Parameters.AddWithValue("@intPageIndex", PageIndex);
                    //myCommand.Parameters.AddWithValue("@intFetch", Fetch);
                    SqlDataAdapter da = new SqlDataAdapter(myCommand);

                    da.Fill(data);
                    da.Dispose();
                    sqlCon.Close();

                    DataTable ModuleTable = data.Tables[0];
                    strModuleData = Serialize(ModuleTable);
                }
                else
                {
                    strModuleData = "Scrapping is Not allowed here....";
                }
               
            }
            catch (Exception ex)
            {
                //return ex.ToString();
            }
            return strModuleData;
        }

        #endregion

        #region Final Settlement
        
        public ActionResult FinalSettlement()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();

        }

        public string GetSeparationEmployees(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_SELECT_SEPARATION_EMPLOYEES", objProcedureData);
        }

        public string CreateEmployeeFinalSettlement(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_EMPLOYEE_FINAL_SETTLEMENT", objProcedureData);
        }

        #endregion
    }
}