#region NameSpace
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.IO;
using System.Net;
using System.Collections.Specialized;
using LoginFrameWork.Authentication;
using BussinessLayer.Common;
using BussinessLayer.Login;
//using loginFrameWork.Authentication;
#endregion

namespace LoginFrameWork.Common
{
    /// <summary>
    /// Common Jquery Serielizer
    /// </summary>
    public class Javascript
    {
        #region Constructor
        public Javascript()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        #endregion

        #region Methods
        public string JsonSerializer<T>(T t)
        {
            string jsonString = string.Empty;
            try
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
                MemoryStream ms = new MemoryStream();
                ser.WriteObject(ms, t);
                jsonString = Encoding.UTF8.GetString(ms.ToArray());
                ms.Close();
            }
            catch (Exception ex)
            {
            }
            return jsonString;
        }
        //public string Getjson_Url(string url, string data)LoginDetails
        public string Getjson_Url(BussinessLayer.Common.LoginDetails obLoginDetails, string data)
        {

            string result = "CheckUserLogin";
            UserBussinessLayer res = new UserBussinessLayer();
            result = res.CheckUserLogin(obLoginDetails);
            return result;
        }
        public string Getjson_Url_UD(LoginFrameWork.Authentication.LoginDetails obLoginDetails, string data)
        {

            string result = "";
            login res = new login();
            //UserBussinessLayer res = new UserBussinessLayer();
            result = res.GetUserDetails(obLoginDetails);
            //result = res.GetUserDetails(data);
            return result;
        }
        public string CreateJsonObject(LoginFrameWork.Authentication.UserModel userContextDetails)
        {
            StringBuilder jSonObject = new StringBuilder();
            jSonObject.Append("({'SessionID':'" + userContextDetails.SessionID + "',");
            jSonObject.Append("'UserID':'" + userContextDetails.UserID + "',");
            jSonObject.Append("'UserName':'" + userContextDetails.UserName + "',");
            jSonObject.Append("'FinYearID':'" + userContextDetails.FinYearID + "',");
            jSonObject.Append("'FinYear':'" + userContextDetails.FinYear + "',");
            jSonObject.Append("'DateFormat':'" + userContextDetails.DateFormat + "',");
            jSonObject.Append("'DateFormatForGrid':'" + userContextDetails.DateFormatForGrid + "',");
            jSonObject.Append("'OwningCostID':'" + userContextDetails.OwningCostID + "',");
            jSonObject.Append("'CompanyLanguage':'" + userContextDetails.CompanyLanguage + "',");
            jSonObject.Append("'CurrencyId':'" + userContextDetails.CurrencyId + "',");
            jSonObject.Append("'CompanyName':'" + userContextDetails.CompanyName + "',");
            jSonObject.Append("'UserThemePref':'" + userContextDetails.UserThemePref + "',");
            jSonObject.Append("'EmployeeId':'" + userContextDetails.EmployeeId + "',");
            jSonObject.Append("'RoleId':'" + userContextDetails.RoleId + "',");
            jSonObject.Append("'AccessLevel':'" + userContextDetails.AccessLevel + "'})");
            return jSonObject.ToString().Replace('"', ' ');
        }
        #endregion

    }
}
