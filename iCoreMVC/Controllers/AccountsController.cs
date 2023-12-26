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
namespace Impulse.Controllers
{
    public class AccountsController : Controller
    {
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
                string varhdnUserDetails = JavascriptObj.CreateJsonObject(userModel);
                return varhdnUserDetails;
            }
            catch
            {
            }
            return "";
        }
        #endregion SessionMethod

        //
        // GET: /Accounts/
        public ActionResult CreateInvoice()
        {
            return View();
        }
        public ActionResult InvoiceList()
        {
            return View();
        }
        public ActionResult ClientPriceList()
        {
            return View();
        }
        public string SelectMasterClient(GetDatas objGetData)
        {
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
            return commonFunctionObj.SelectData(objGetData, "SL_TB_CUSTOMER_MASTER");

        }
        public string SelectOrders(GetDatas objGetData)
        {
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
            return commonFunctionObj.SelectData(objGetData, "VW_INVOICE_GEN_ORDER_LIST");

        }
        public string SelectInvoiceList(GetDatas objGetData)
        {
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
            return commonFunctionObj.SelectData(objGetData, "VW_INVOICE_LIST");

        }
        //public string createinvoicemaster(PutDatas objPutDatas)
        //{
        //    //Commonfunctions commonFunctionObj = new Commonfunctions();
        //    CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
        //    string strSessionID = null;
        //    try
        //    {
        //        if (objPutDatas.strJsonData == null)
        //            return "strJsonData is null";
        //        return commonFunctionObj.InsertData_IDGEN(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_MASTER", "INV_CODE");
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.ToString();
        //    }
        //    return "Created";
        //}


        public string createinvoicemaster(PutDatas objPutDatas)
        {
            //Commonfunctions commonFunctionObj = new Commonfunctions();
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                //return commonFunctionObj.InsertData_IDGEN(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_MASTER", "INV_CODE");
                return commonFunctionObj.InsertData_IDGEN_fixedstring(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_MASTER", "INV_CODE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }



        public string createinvoicdetailes(PutDatas objPutDatas)
        {
            //Commonfunctions commonFunctionObj = new Commonfunctions();
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                //return commonFunctionObj.InsertData_IDGEN(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_MASTER", "INV_CODE");
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_DETAILES");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string ProcInvoiceCreation(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_INSERT_INOVICE_CL", objProcedureData);
        }
        public string ProcInsertInvoiceAmount(ProcedureData objProcedureData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.ExecuteProcedure("PROC_INSERT_INOVICE_AMT", objProcedureData);
        }

        public string SelectPriceOrders(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "BTS_TB_CLIENT_ORDER_TYPE_PRICE");

        }
        public string SelectGenericData(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "GENERIC_ENUMERATION_VALUES");

        }
        public string SelectClientService(GetDatas objGetData)
        {
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
            return commonFunctionObj.SelectData(objGetData, "CLIENT_SERVICES");

        }
        public string DeleteInvoice(DeleteDatas objDeleteDatas)
        {
            try
            {
                CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
                return commonFunctionObj.DeleteData(objDeleteDatas.strSessionID, objDeleteDatas.strCondition, "SL_TB_INVOICE_MASTER");

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }


        public string createinvoiccount(PutDatas objPutDatas)
        {
            //Commonfunctions commonFunctionObj = new Commonfunctions();
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                //return commonFunctionObj.InsertData_IDGEN(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_MASTER", "INV_CODE");
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_AMOUNT");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }

        public string UpdateOrderom(UpdateDatas objUpdateDatas)
        {
            //Commonfunctions commonFunctionObj = new Commonfunctions();
            CommonFunctionlink commonFunctionObj = new CommonFunctionlink();
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

        public string CreateClientOrderPrice(PutDatas objPutDatas)
        {
            //Commonfunctions commonFunctionObj = new Commonfunctions();
            Commonfunctions commonFunctionObj = new Commonfunctions();
            string strSessionID = null;
            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                //return commonFunctionObj.InsertData_IDGEN(objPutDatas.strSessionID, objPutDatas.strJsonData, "SL_TB_INVOICE_MASTER", "INV_CODE");
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "BTS_TB_CLIENT_ORDER_TYPE_PRICE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }

        public string DeleteClientPrice(DeleteDatas objDeleteDatas)
        {
            try
            {
                Commonfunctions commonFunctionObj = new Commonfunctions();
                return commonFunctionObj.DeleteData(objDeleteDatas.strSessionID, objDeleteDatas.strCondition, "BTS_TB_CLIENT_ORDER_TYPE_PRICE");

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

    }
}