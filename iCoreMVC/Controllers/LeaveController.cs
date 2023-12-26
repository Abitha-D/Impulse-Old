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

using BussinessLayer.Common;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Web.Script.Serialization;
using BussinessLayer.EMail;

namespace Impulse.Controllers
{
    public class LeaveController : Controller
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
            //System.Web.HttpContext.Current.Application.Remove(System.Web.HttpContext.Current.User.Identity.Name);
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

        public ActionResult Applyleave()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult ApproveLeave()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public object GetPendingApproval(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_LEAVE_PENDING_APPROVAL");

        }
        public string SelectEmployeeDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_MASTER");

        }
        public string SelectEmployees(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_VW_EMP_LIST");

        }
        public string SelectEmployeeLeaveDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_LEAVE_VALUE");

        }
        public string InsertLeaveEntry(PutDatas objPutDatas)
        {
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "HR_TB_EMPLOYEE_LEAVE_ENTRY");
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
        public string UpdateLeaveEntry(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "HR_TB_EMPLOYEE_LEAVE_ENTRY");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string UpdateLeaveCount(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "HR_TB_EMPLOYEE_LEAVE_VALUE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public ActionResult MyLeaves()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult LeaveHistory()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult LeaveStatus()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult LeaveCalendar()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public string GetMonthlyLeave(ProcedureData objProcedureData)
        {
            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcedure("IM_PROC_MONTHLY_LEAVE_COUNT", objProcedureData);
        }
        public string InsertApprovedTable(PutDatas objPutDatas)
        {
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "IM_TB_APPROVED_LEAVES");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public object GetLeaveDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_TB_EMPLOYEE_LEAVE_ENTRY");

        }
        public object GetLeaveDetailsByDate(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_LEAVE_CALENDAR");

        }

        #region Bulk LOP
        public ActionResult LOPBulk()
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

        public string SaveEmployeeLOP(ProcedureData objProcedureData)
        {
            Int64 refNo = Convert.ToInt64(Session["emp_ref_no"].ToString());
            
            Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());

            var msg = "";

            if (RoleId == 1 || RoleId == 9 || RoleId == 10 || RoleId == 27)
            {
                Commonfunctions commonFunctionObj = new Commonfunctions();
                return commonFunctionObj.ExecuteProcedure("PROC_INSERT_EMPLOYEE_LOP", objProcedureData);
            }
            else
            {
                msg = emailobj.sendmailwithCC(refNo);

                return msg.ToString();
            }
        }

        #endregion

        public ActionResult EmployeeLeave()
        {
            Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());

            if (RoleId == 9 || RoleId == 10 || RoleId == 1 || RoleId == 2 || RoleId == 12 || RoleId == 27)
            {
                GetUserConfig();

                Dictionary<string, string> DataList = new Dictionary<string, string>();

                DataList.Add("UserID", sUserDetails.UserID);
                DataList.Add("RoleId", sUserDetails.RoleId);
                DataList.Add("EmployeeId", sUserDetails.EmployeeId);
                ViewBag.userDetails = DataList;

                return View();
            }
            else
            {
                return new EmptyResult();
            }
        }
        public string GetEmployeeLeaveValue(int refNo, int sYear, int type)
        {
            int RoleId = Convert.ToInt16(Session["role_id"].ToString());

            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcGetLeaveValue(RoleId, refNo, sYear, type);
        }
        public string UpdateEmployeeLeaveValue(ProcedureData objProcedureData)
        {
            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcedure("PROC_UPDATE_EMPLOYEE_LEAVE_VALUE", objProcedureData);
        }

        public string CancelApprovedLeave(ProcedureData objProcedureData)
        {
            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcedure("PROC_CANCEL_APPROVED_LEAVE", objProcedureData);
        }
    }

}