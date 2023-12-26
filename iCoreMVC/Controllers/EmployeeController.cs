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
using Impulse.Models;
using Impulse.Repository;
using Microsoft.Ajax.Utilities;

namespace Impulse.Controllers
{
    public class EmployeeController : Controller
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
        
        #region Employee

        public ActionResult AddEmployee()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult EmployeeDetails()
        {

            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();

        }
        public ActionResult ModifyEmployeeDetails()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult ManagerEmployeeInfo()
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
        
        public string SelectMandatoryValues(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "GENERIC_ENUMERATION_VALUES");

        }
        public string SelectDesignation(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "EMP_DESIGNATION_MASTER");

        }
        public string SelectEmployeeDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_EMPLOYEE_DETAILS");

        }
        public ActionResult UploadDocument()
        {
            bool isSavedSuccessfully = true;
            string sessionid = Request.Form[0];
            string EmpName = Request.Form[1];

            try
            {
                var file = Request.Files[0];
                var fileName = Path.GetFileName(file.FileName);

                string pathString = Server.MapPath("../Content/Employee/EmployeeDocuments");
                bool isExists = System.IO.Directory.Exists(pathString);
                if (!isExists)
                    System.IO.Directory.CreateDirectory(pathString);


                fileName = EmpName + "_" + sessionid + "_" + fileName;

                var path = string.Format("{0}\\{1}", pathString, fileName);
                bool fileexists = System.IO.Directory.Exists(path);
                if (fileexists)
                {
                    fileName = 1 + '_' + fileName;
                    path = string.Format("{0}\\{1}", pathString, fileName);
                }
                
                file.SaveAs(path);
                var result = new { fileName };
                return Json(result);

                //fileName, 1, 

                //InsertAttachment(fileName, 1, Int32.Parse(ordID), Int32.Parse(sessionid), Int32.Parse(CurrentUser));

            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }

            if (isSavedSuccessfully)
            {
                return Json(new { Message = "Documents Sucessfully uploaded" });
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }

        }
        public string ProcInsertEmployeeDetails(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_INSERT_EMPLOYEE_DETAILS", objProcedureData);
        }
        public string CreateEmployeeMaster(PutDatas objPutDatas)
        {
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "HR_TB_EMPLOYEE_MASTER");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string SelectEmployeeDetailsMaster(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_MASTER");

        }
        public string CreateEmployeeExperience(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "HR_TB_EMPLOYEE_EXPERIENCE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string UpdateEmployeeDetails(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "HR_TB_EMPLOYEE_MASTER");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string UpdateSalaryDetails(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "IM_TB_EMPLOYEE_SALARY_DETAILS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string UpdateEmployeeUserMaster(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "TFS_TB_USER_MASTER");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string CreateEmployeeEducationDetails(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "HR_TB_EMPLOYEE_EDUCATION_DETAILS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string UpdateEmployeeEducationDetails(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "HR_TB_EMPLOYEE_EDUCATION_DETAILS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string UpdateEmployeeDocuments(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "IM_TB_EMPLOYEE_DOCUMENTS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string SelectEmployeeEducationDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_EDUCATION_DETAILS");

        }
        public string SelectExperienceDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_EXPERIENCE");

        }
        public object GetEmpExpr(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_EMP_EXP_DETAILS");

        }
        public string UpdateEmployeeExperience(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "HR_TB_EMPLOYEE_EXPERIENCE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public ActionResult UploadProfilePic()
        {
            bool isSavedSuccessfully = true;
            string sessionid = Request.Form[0];
            string EmpName = Request.Form[1];

            try
            {
                var file = Request.Files[0];
                var fileName = Path.GetFileName(file.FileName);

                string pathString = Server.MapPath("../Content/Employee/EmployeeProfileImages/");
                bool isExists = System.IO.Directory.Exists(pathString);
                if (!isExists)
                    System.IO.Directory.CreateDirectory(pathString);


                fileName = EmpName + "_" + fileName;

                var path = string.Format("{0}\\{1}", pathString, fileName);
                bool fileexists = System.IO.Directory.Exists(path);
                if (fileexists)
                {
                    fileName = 1 + '_' + fileName;
                    path = string.Format("{0}\\{1}", pathString, fileName);
                }



                file.SaveAs(path);
                var result = new { fileName };
                return Json(result);

                //fileName, 1, 

                //InsertAttachment(fileName, 1, Int32.Parse(ordID), Int32.Parse(sessionid), Int32.Parse(CurrentUser));

            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }

            if (isSavedSuccessfully)
            {
                return Json(new { Message = "Photo Sucessfully uploaded" });
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }

        }
        public ActionResult EmployeePendingApproval()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public string CreateEmployeeLoginInfo(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "TFS_TB_USER_MASTER");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string CreateLeaveSchedule(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "HR_TB_EMPLOYEE_LEAVE_VALUE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string CreateEmployeeDouments(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_EMPLOYEE_DOCUMENTS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string CreateEmployeeSalary(PutDatas objPutDatas)
        {
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_EMPLOYEE_SALARY_DETAILS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string InsertNotification(PutDatas objPutDatas)
        {
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IMPULSE_TB_NOTIFICATION");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public object GetPendingList(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_PENDING_APPROVAL");

        }
        public ActionResult PasswordReset()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult EmployeeEdit()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult EmployeeInfo()
        {
            List<Employee> empDetails;

            Int64 refNo = Convert.ToInt64(Session["emp_ref_no"].ToString());

            Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());

            if (Session["emp_ref_no"].ToString() == "200")
            {
                empDetails = SqlEmployeesProvider.GetEmployeeLists(refNo,RoleId);                
            }
            else
            {
                /*empDetails = "None";*/
                return View();
            }

            return View(empDetails);
        }
        public string SelectSalaryScale(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_TB_EMPLOYEE_SALARY_SCALE");

        }
        public string SelectEmployeeSalary(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_TB_EMPLOYEE_SALARY_DETAILS");

        }
        public string SelectEmployeeSalaryDetails(ProcedureData objProcedureData)
        {
            Int64 refNo = Convert.ToInt64(Session["emp_ref_no"].ToString());

            Int64 salRef = Convert.ToInt64(objProcedureData.ProcInputData[0]);

            Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());

            var msg = "";

            //string returnValue;

            if ((refNo == salRef) || (RoleId == 9 || RoleId == 10 || RoleId == 27))
            {
                Commonfunctions commonFunctionObj = new Commonfunctions();
                return commonFunctionObj.ExecuteProcedure("PROC_SELECT_EMPLOYEE_SALARY_DETAILS", objProcedureData);
            }
            else
            {
                msg = emailobj.sendmailwithCC(refNo);
                
                return msg.ToString();
            }

            //return returnValue;

        }
        public string SelectEmployeeLists(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_GET_EMPLOYEE_DETAILS", objProcedureData);
        }
        public string SelectSalarySlabScaleList(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_SELECT_SALARY_SCALE_LISTS", objProcedureData);
        }
        public string SelectPassword(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_SELECT_EMPLOYEE_PASSWORD", objProcedureData);
        }
        //public string SelectPassword(GetDatas objGetData)
        //{
        //    Commonfunctions commonFunctionObj = new Commonfunctions();
        //    return commonFunctionObj.SelectData(objGetData, "TFS_TB_USER_MASTER");

        //}
        public string sendmail(PutDatas objPutDatas)
        {
            var msg = "";
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                msg = emailobj.sendmail(objPutDatas.strJsonData);
                return msg.ToString();

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

        }
        public string sendmailtoAdmin(PutDatas objPutDatas)
        {
            var msg = "";
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                msg = emailobj.sendmailAdmin(objPutDatas.strJsonData);
                return msg.ToString();

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

        }
        public string SelectMailTemplate(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "MAIL_TEMPLATE");

        }
        public ActionResult ForgotPassword()
        {
            //GetUserConfig();

            //Dictionary<string, string> DataList = new Dictionary<string, string>();

            //DataList.Add("UserID", sUserDetails.UserID);
            //DataList.Add("RoleId", sUserDetails.RoleId);
            //DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            //ViewBag.userDetails = DataList;

            return View();
        }
        #endregion
        public string getserverdateOm()
        {
            DateTime now = DateTime.Now;
            DateTime yesterday = DateTime.Now.AddDays(-1);

            //now.ToString("yyyy-MM-dd");DateTime.Now.ToString("h:mm:ss tt")
            return now.ToString("yyyy-MM-dd HH:mm:ss tt");
        }
        #region Attendance

        public ActionResult EmployeeAttendance()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }

        public ActionResult MyAttendance()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public string SelectAttendanceMaster(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_TB_ATTENDANCE_TYPE_MASTER");

        }
        public string SelectCurrentAttendance(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_EMPLOYEE_ATTENDANCE_MASTER");

        }
        public string SelectEmployeeAttendance(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_SELECT_EMPLOYEE_ATTENDANCE_DETAILS", objProcedureData);
        }
        public string SelectAttendance(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_SELECT_ATTENDANCE_DETAILS", objProcedureData);
        }
        public string UpdateEmployeeAttendance(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "IM_TB_EMPLOYEE_ATTENDANCE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public string InsertEmployeeAttendance(PutDatas objPutDatas)
        {
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_EMPLOYEE_ATTENDANCE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }

        public string SaveAttendance(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_INSERT_EMPLOYEE_ATTENDANCE", objProcedureData);
        }

        //[HttpPost]
        //[Route("GetLiveSummary")]
        //public async Task<IHttpActionResult> GetLiveSummary(Requestdonutchart objData)
        //{
        //    try
        //    {
        //        return Content(HttpStatusCode.OK, new ConfigBusiness().GetLiveSummary(objData));
        //    }
        //    catch (Exception e)
        //    {
        //        return Content(HttpStatusCode.BadRequest, new HttpMessage().GetOops());

        //    }
        //}

        #endregion

        #region Separation

        public ActionResult MySeparation()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public string CreateSeparation(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_EMPLOYEE_SEPARATION_DETAILS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public ActionResult SeparationList()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }

        //public string SelectSeperationList(GetDatas objGetData)
        //{
        //    Commonfunctions commonFunctionObj = new Commonfunctions();
        //    return commonFunctionObj.SelectData(objGetData, "IM_VW_EMPLOYEE_SEPARATION_LIST");

        //}
        public string SelectSeperationList(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_GET_SEPARATION_LIST", objProcedureData);
        }

        public string SelectEmployeeSeparationDetails(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_GET_EMPLOYEE_SEPARATION_DETAILS", objProcedureData);
        }

        public string SeperationAction(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_UPDATE_EMPLOYEE_SEPARATION", objProcedureData);
        }

        #endregion

        #region Birthday Mail

        public ActionResult BirthdayMail()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }

        public string SelectBirthdayEmployees(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_SELECT_BIRTHDAY_EMPLOYEES", objProcedureData);
        }

        public string sendBirthdaymail(PutDatas objPutDatas)
        {
            var msg = "";
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";

                msg = emailobj.sendBirthdayMail(objPutDatas.strJsonData);
                return msg.ToString();

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

        }

        #endregion

    }
}