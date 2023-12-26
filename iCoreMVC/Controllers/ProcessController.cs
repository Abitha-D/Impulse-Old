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
using System.IO;
using System.IO.Compression;
using System.Data.SqlClient;

using System.Net.NetworkInformation;
using System.Management;
using BussinessLayer.EMail;
//using Excel1 = Microsoft.Office.Interop.Excel;
using Impulse.Models;

using System.Security.Principal;
using System.Runtime.InteropServices;
using System.Data;
using System.Data.OleDb;
//<%@ Import Namespace = "System.Security.Principal" %>
//<%@ Import Namespace = "System.Runtime.InteropServices" %>

using System.Drawing;
using System.Drawing.Imaging;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Web.Script.Serialization;
using System.Web.UI;
namespace Impulse.Controllers
{
    public class ProcessController : Controller
    {
        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
        string connectionstringBTS = ConfigurationManager.ConnectionStrings["ConnectionBTS"].ConnectionString;


        Commonfunctions commonFunctionObj = new Commonfunctions();
        LoginFrameWork.Authentication.UserModel sUserDetails = new LoginFrameWork.Authentication.UserModel();
        CommonFunctionlink commonFunctionBTS = new CommonFunctionlink();
        #region OrderList

       
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
        public ActionResult OrderList()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
            
        }
        public string UpdateTFSUserFilter(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "TFS_TB_ORDER_USER_FILTERS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string getserverdateOm()
        {
            DateTime now = DateTime.Now;
            DateTime yesterday = DateTime.Now.AddDays(-1);

            //now.ToString("yyyy-MM-dd");DateTime.Now.ToString("h:mm:ss tt")
            return now.ToString("yyyy-MM-dd HH:mm:ss tt");
        }

        public JsonResult SelectOrderDetails(int OrderId)
        {

            var AjaxReturn = new
            {
                Message = "Error"
            };
            try
            {
                DataSet Responds = new DataSet();
                SqlConnection sqlCon = new SqlConnection(connectionstring);
                SqlCommand sqlCmd = new SqlCommand();

                SqlCommand myCommand = new SqlCommand("PROC_SELECT_ORDER_DETAILS");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                // SQL Parameters
                myCommand.Parameters.AddWithValue("@OrderID", OrderId);
                //myCommand.Parameters.AddWithValue("@strTableName", Table);
                //myCommand.Parameters.AddWithValue("@strCondition", strCondition);
                //myCommand.Parameters.AddWithValue("@intPageIndex", page);
                //myCommand.Parameters.AddWithValue("@intFetch", rows);

                SqlDataAdapter da = new SqlDataAdapter(myCommand);

                da.Fill(Responds);
                da.Dispose();
                sqlCon.Close();

                var AjaxData = new
                {
                    EmployeeDet = Serialize(Responds.Tables[0]),
                    PictureStatus = Serialize(Responds.Tables[1]),
                    Status = Serialize(Responds.Tables[2]),
                    StatusReason = Serialize(Responds.Tables[3]),
                    StatusClari = Serialize(Responds.Tables[4]),

                    DistricName = Serialize(Responds.Tables[5]),

                };

                return Json(AjaxData, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(AjaxReturn, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult LoadPageOrderList(int page, int rows, string strCondition, string strFieldNames, string strSessionID, string sidx, string sord, string Table)
        {
           
            var AjaxReturn = new
            {
                Message = "Error"
            };
            try
            {
                DataSet Responds = new DataSet();
                SqlConnection sqlCon = new SqlConnection(connectionstring);
                SqlCommand sqlCmd = new SqlCommand();

                SqlCommand myCommand = new SqlCommand("PROC_SELECT_PAGELOAD_ORDERLIST_DATA");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                // SQL Parameters
                myCommand.Parameters.AddWithValue("@strFieldNames", strFieldNames);
                myCommand.Parameters.AddWithValue("@strTableName", Table);
                myCommand.Parameters.AddWithValue("@strCondition", strCondition);
                myCommand.Parameters.AddWithValue("@intPageIndex", page);
                myCommand.Parameters.AddWithValue("@intFetch", rows);

                SqlDataAdapter da = new SqlDataAdapter(myCommand);

                da.Fill(Responds);
                da.Dispose();
                sqlCon.Close();
                DataTable tblPagination = Responds.Tables[1];

                var AjaxData = new
                {
                    Page = tblPagination.Rows[0]["Page"].ToString(),
                    TotalPage = tblPagination.Rows[0]["TotalPage"].ToString(),
                    CurrentPage = tblPagination.Rows[0]["Count"].ToString(),
                    Total = tblPagination.Rows[0]["Count"].ToString(),
                    Data = Serialize(Responds.Tables[0]),
                    ResultClientGrp = Serialize(Responds.Tables[2]), //Filter data
                };

                return Json(AjaxData, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(AjaxReturn, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetJqGridData(int page, int rows, string strCondition, string strFieldNames, string strSessionID, string sidx, string sord, string Table)
        {
         
            var AjaxReturn = new
            {
                Message = "Error"
            };
            if (this.Request.RequestType == "POST")
            {


                try
                {
                    Commonfunctions commonFunctionObj = new Commonfunctions();
                    BussinessLayer.Common.GetDatas objGetData = new GetDatas();
                    objGetData.strCondition = strCondition; ;
                    objGetData.strFieldNames = strFieldNames;
                    objGetData.strSessionID = strSessionID;
                    DataSet Responds = commonFunctionObj.SelectGridData(objGetData, Table, page, rows);

                    DataTable myDataTable = Responds.Tables[0];
                    var strRetData = Serialize(myDataTable);

                    DataTable tblPagination = Responds.Tables[1];

                    var jqGridData = new
                    {
                        Page = tblPagination.Rows[0]["Page"].ToString(),
                        TotalPage = tblPagination.Rows[0]["TotalPage"].ToString(),
                        CurrentPage = tblPagination.Rows[0]["Count"].ToString(),
                        Total = tblPagination.Rows[0]["Count"].ToString(),
                        Data = strRetData,
                    };

                    return Json(jqGridData, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(AjaxReturn, JsonRequestBehavior.AllowGet);
                }

            }
                return Json(AjaxReturn, JsonRequestBehavior.AllowGet);
            
        }
        public string Selecttotaolorder(GetDatas objGetData)
        {
            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.SelectData(objGetData, "CUSTOMER_ORDER");

        }
        #endregion

        public string SelectFilterList(GetDatas objGetData)
        {
            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.SelectData(objGetData, "TFS_TB_ORDER_USER_FILTERS");

        }

        #region OrderAcceptBy
        public ActionResult OrderAcceptBy()
        {
            return View();
        }
        public string SelectClient(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "OM_VW_ORDERLIST");

        }
        public string SelectAccept(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "OM_VW_ORDERLIST");

        }

        #endregion

        #region OrderStatusSet
        public ActionResult OrderStatusSet()
        {
            return View();
        }
        public string UpdateClientOrder(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "CUSTOMER_ORDER");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string SelectOrderStatusCheck(GetDatas objGetData)
        {
            return commonFunctionObj.SelectData(objGetData, "OM_VW_ORD_STATUS_CHECK");
        }


        public string UpdateBtsClientOrder(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionBTS.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "BTS_TB_BPO_ORDER");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public string CreateOrderStatus(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "CUSTOMER_ORDER_STATUS");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

        }
        #endregion

        #region OrderAssign

        public ActionResult OrderAssign()
        {
            return View();
        }
        public string SelectProcAutoAssign(ProcedureData objProcedureData)
        {
            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcedure("PROC_ORDER_AUTO_ASSIGN", objProcedureData);
        }

        public JsonResult GetOrderAssignPageLoad(int CurrentUser, int EmployeeId)
        {
            var AjaxReturn = new
            {
                Message = "Error"
            };
            try
            {


                string strClientList = "";
                string strEmpList = "";
                string strStatusList = "";
                string strPhotoList = "";
                string strStatusReasonList = "";
                DataSet data = new DataSet();
                SqlConnection sqlCon = new SqlConnection(connectionstring);
                SqlCommand sqlCmd = new SqlCommand();

                SqlCommand myCommand = new SqlCommand("PROC_SELECT_ORDER_ASSIGN_LOAD");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;

                myCommand.Parameters.AddWithValue("@UserId", CurrentUser);
                myCommand.Parameters.AddWithValue("@sEmpId", EmployeeId);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);

                da.Fill(data);
                da.Dispose();
                sqlCon.Close();
                var AjaxData = new
                {

                    strClientList = Serialize(data.Tables[0]),
                    strEmpList = Serialize(data.Tables[1]),
                    strStatusList = Serialize(data.Tables[2]),
                    strPhotoList = Serialize(data.Tables[3]),
                    strStatusReasonList = Serialize(data.Tables[4]),
                };

                return Json(AjaxData, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(AjaxReturn, JsonRequestBehavior.AllowGet);
            }

        }


        #endregion

        #region MarkPicStatus

        public ActionResult MarkPicStatus()
        {
            return View();
        }

        public string SelectMarkPictStatus(ProcedureData objProcedureData)
        {
            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcedure("PROC_PICTURE_MARK_STATUS", objProcedureData);
        }

        #endregion

        #region ClientOrderListing


        public string SelectClientOrderListing(DateTime bdate, DateTime edate, String sEmpId)
        {
            //string bndate = bdate;

            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcedure1("sp_orderlising", bdate, edate, sEmpId);

        }

        public string SelectClientGrpOrderListing(DateTime bdate, DateTime edate, String sGtype, String sEmpId)
        {
            //string bndate = bdate;

            Commonfunctions Commonfunctions = new Commonfunctions();
            return Commonfunctions.ExecuteProcedure3("sp_grp_orderlising", bdate, edate, sGtype, sEmpId);

        }

        #endregion
        public ActionResult OrderManagement()
        {
            return View();
        }
        public ActionResult ModifyOrder()
        {
            return View();
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

    }
}