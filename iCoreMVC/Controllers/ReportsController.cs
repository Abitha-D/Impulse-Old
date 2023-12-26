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
using System.Data;
using System.Data.SqlClient;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Web.Script.Serialization;
using BussinessLayer.Common;

namespace Impulse.Controllers
{
    public class ReportsController : Controller
    {
        // GET: Reports
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
                string varhdnUserDetails = JavascriptObj.CreateJsonObject(userModel);
                return varhdnUserDetails;
            }
            catch
            {
            }
            return "";
        }
        #endregion SessionMethod
        public ActionResult OrderReports()
        {
            return View();
        }
        //public ActionResult loadviewer()
        //{
        //    //var s = PartialView("ReportViewer");
        //    //return s;
        //} 
        public string SelectBtsStatus(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "GENERIC_ENUMERATION_VALUES");

        }

        #region DailyReport
        public ActionResult DailyReport()
        {
            return View();
        }
        public string GetDailyRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_DAILY_ORDER", objProcedureData);
        }


        #endregion

        #region WeeklyReport
        public ActionResult WeeklyReport()
        {
            return View();
        }

        public string GetWeeklyRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_WEEKLY_ORDER", objProcedureData);
        }
        #endregion

        #region MonthlyReport
        public ActionResult MonthlyReport()
        {
            return View();
        }

        public string GetMonthlyRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_MONTHLY_ORDER", objProcedureData);
        }
        #endregion

        #region YearlyReport
        public ActionResult YearlyReport()
        {
            return View();
        }

        #endregion

        #region PortalwiseReport
        public ActionResult PortalwiseReport()
        {
            return View();
        }
        public string GetPortalwiseRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_PORTALWISE", objProcedureData);
        }

        #endregion



        #region CitywiseReport
        public ActionResult CitywiseReport()
        {
            return View();
        }
        public string GetCitywiseRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_CITYWISE", objProcedureData);
        }

        #endregion

        #region ZipcodeReport
        public ActionResult ZipcodewiseReport()
        {
            return View();
        }
        public string GetZipcodewiseRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_ZIPCODEWISE", objProcedureData);
        }

        #endregion

        #region StatuswiseReport
        public ActionResult PaidReport()
        {
            return View();
        }
        public ActionResult UnPaidReport()
        {
            return View();
        }
        public ActionResult CancelledReport()
        {
            return View();
        }
        public ActionResult HoldReport()
        {
            return View();
        }

        public string GetPaidRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_STATUSWISE", objProcedureData);
        }


        #endregion

        #region PhtWisePaidReports
        public ActionResult PhtwisePaidReport()
        {
            return View();
        }
        public ActionResult PhtwiseUnPaidReport()
        {
            return View();
        }
        public string SelectClientPhtMapList(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "BTS_VW_PHOTO_CLIENT_MAP");

        }

        public string GetPhtWiseRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_PHTWISE", objProcedureData);
        }

      

        #endregion

        #region DataEntryReports

        public ActionResult DataEntrywiseRpt()
        {
            return View();
        }
        public ActionResult DEwiseUnPaidReport()
        {
            return View();
        }
        public string SelectMasterClient(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "BTS_TB_CPD_MASTER");

        }

        public string GetDEwiseRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_DATAEN_WISE", objProcedureData);
        }
        #endregion

        #region PhtListOrderReport
        public ActionResult PhtListOrderReport()
        {
            return View();
        }


        public string GetPhtListOrderRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_PHT_ORDERLIST", objProcedureData);
        }



        #endregion

        #region ClientwisePaidReport

        public ActionResult ClientPaidReport()
        {
            return View();
        }

        public ActionResult ClientUnPaidReport()
        {
            return View();
        }

        public string GetClientRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_CLIENTWISE", objProcedureData);
        }

        #endregion

        #region ClientwiseStatusReport

        public ActionResult ClientStatusReport()
        {
            return View();
        }

        public string GetClientStatusRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_CLIENTWISE_STATUS", objProcedureData);
        }

        #endregion

        #region IncomeReport

        public ActionResult IncomeReport()
        {
            return View();
        }
        public string GenIncomeReports(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("BTS_PROC_RT_CLIENT_INCOME", objProcedureData);
        }

        #endregion

        #region EmployeepersonalReport
        public ActionResult EmployeepersonalReport()
        {
            return View();
        }
        public string SelectDepartment(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "DEPARTMENT_VALUES");

        }
        public JsonResult GetEmployeepersonalReportPageLoad(int CurrentUser)
        {
            var AjaxReturn = new
            {
                Message = "Error"
            };
            try
            {

                string strCompany = "";
                string strDepartment = "";
                string strDesignation = "";
                string strEmployeelist = "";
                DataSet data = new DataSet();
                SqlConnection sqlCon = new SqlConnection(connectionstring);
                SqlCommand sqlCmd = new SqlCommand();
                SqlCommand myCommand = new SqlCommand("PROC_SELECT_EMPLOYEERPT_PAGE_LOAD");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                SqlDataAdapter da = new SqlDataAdapter(myCommand);
                da.Fill(data);
                da.Dispose();
                sqlCon.Close();
                var AjaxData = new
                {

                    strCompany = Serialize(data.Tables[0]),
                    strDepartment = Serialize(data.Tables[1]),
                    strDesignation = Serialize(data.Tables[2]),
                    strEmployeelist = Serialize(data.Tables[3]),
                };

                return Json(AjaxData, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(AjaxReturn, JsonRequestBehavior.AllowGet);
            }

        }
        public string SelectEmployee(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_VW_EMPLOYEELIST");

        }

        #endregion

        #region EmployeepersonalReport
        public ActionResult EmployeeWisePerfomanceReport()
        {
            return View();
        }
        public string SelectPerfomanceRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_RPT_EMP_PERFOMANCE", objProcedureData);
        }
        #endregion

        #region EmployeeTrackingReport
        public ActionResult EmpTrackingRpt()
        {
            return View();
        }
        public string SelectTrackingRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_RPT_EMPLOYEEWISE_TRACKING", objProcedureData);
        }
        #endregion

        #region EmployeeDailyWorkStatusReport
        public ActionResult EmpDailyWrkStatusRpt()
        {
            return View();
        }
        public string SelectDlyWrkStatusRpt(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_RPT_EMPLOYEE_DAILY_WORK_ORDER_STATUS", objProcedureData);
        }
        #endregion

    }
}