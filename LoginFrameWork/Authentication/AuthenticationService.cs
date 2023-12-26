using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using LoginFrameWork.Common;
using System.Web.Security;
using System.Web;
using System.Web.Caching;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Configuration;
using BussinessLayer;
using BussinessLayer.Login;
using BussinessLayer.Common;
namespace LoginFrameWork.Authentication
{
    public class AuthenticationService
    {
        #region variables
        string host;
        IPHostEntry ip;
        private readonly HttpContext _httpContext;
        private Cache _contextCache;
        private UserModel _cachedUser;
        #endregion

        #region ctor
        public AuthenticationService()
        {
            host = Dns.GetHostName();
            ip = Dns.GetHostEntry(host);
        }
        public AuthenticationService(HttpContext httpContext)
        {
            host = Dns.GetHostName();
            ip = Dns.GetHostEntry(host);
            this._httpContext = httpContext;
            this._contextCache = new Cache();
        }
        #endregion

        #region methods
        public string CheckUserLogin(string userName, string passWord, string company)
        {
            LoginDetails LoginDetailsObj = new LoginDetails();
            LoginDetailsObj.User = userName;
            LoginDetailsObj.Password = passWord;
            LoginDetailsObj.Company = company;
            
            //LoginDetailsObj.IPAddress = ip.AddressList[0].ToString();
            //var sIPAddress = Request.ServerVariables("HTTP_X_FORWARDED_FOR");
            //   sIPAddress= HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            //If sIPAddress = "" Then sIPAddress = Request.ServerVariables("REMOTE_ADDR");


            String ip =HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (string.IsNullOrEmpty(ip))
            {
                ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }



            LoginDetailsObj.IPAddress = ip;

            //return commonFunctionObj.SelectData(objGetData, "AD_VW_USER_ROLE");
            BussinessLayer.Common.LoginDetails comoblogin = new BussinessLayer.Common.LoginDetails();
            comoblogin.User = userName;
            comoblogin.Password = passWord;
            comoblogin.Company = company;
            //comoblogin.IPAddress = ip.AddressList[0].ToString();
            comoblogin.IPAddress = ip;

            Javascript JavascriptObj = new Javascript();
            string data = JavascriptObj.JsonSerializer<LoginDetails>(LoginDetailsObj);

            UserBussinessLayer objUserBussinessLayer = new UserBussinessLayer();

            //String conUrl = System.Configuration.ConfigurationManager.AppSettings["RESTURL"].ToString() + System.Configuration.ConfigurationManager.AppSettings["CM"].ToString() + "CheckUserLogin";
            //string RetData = JavascriptObj.Getjson_Url(conUrl, data);
            //return RetData;

            string RetData = JavascriptObj.Getjson_Url(comoblogin, data);
            return RetData;

        }
        public bool SignIn(string userName, string passWord, string company, bool keepAlive)
        {
            DateTime now = DateTime.UtcNow;
            var ticket = new FormsAuthenticationTicket(
                1 /*version*/,
                string.Empty,
                now,
                now.AddDays(1),
                keepAlive,
                string.Format("{0}|{1}|{2}", userName, passWord, company),
                FormsAuthentication.FormsCookiePath);
            var encryptedTicket = FormsAuthentication.Encrypt(ticket);

            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            cookie.HttpOnly = true;
            if (ticket.IsPersistent)
            {
                cookie.Expires = ticket.Expiration;
            }
            cookie.Secure = FormsAuthentication.RequireSSL;
            cookie.Path = FormsAuthentication.FormsCookiePath;
            if (FormsAuthentication.CookieDomain != null)
            {
                cookie.Domain = FormsAuthentication.CookieDomain;
            }
            HttpContext.Current.Response.Cookies.Add(cookie);
            //HttpContext.Current.Response.Cookies.Add(cookie);
            UserModel userModel = GetUserDetails(userName, passWord, company);
            _cachedUser = userModel;
            return true;
        }
        public UserModel GetUserDetails(string userName, string passWord, string company)
        {
            LoginDetails LoginDetailsObj = new LoginDetails();
            LoginDetailsObj.User = userName;
            LoginDetailsObj.Password = passWord;
            LoginDetailsObj.Company = company;


            String ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (string.IsNullOrEmpty(ip))
            {
                ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            //LoginDetailsObj.IPAddress = ip.AddressList[0].ToString();
            LoginDetailsObj.IPAddress = ip;

            BussinessLayer.Common.LoginDetails comoblogin = new BussinessLayer.Common.LoginDetails();
            comoblogin.User = userName;
            comoblogin.Password = passWord;
            comoblogin.Company = company;
            //comoblogin.IPAddress = ip.AddressList[0].ToString();
            comoblogin.IPAddress = ip;

            Javascript JavascriptObj = new Javascript();
            string data = JavascriptObj.JsonSerializer<LoginDetails>(LoginDetailsObj);
            String conUrl = "";

            string RetData = JavascriptObj.Getjson_Url_UD(LoginDetailsObj, data);

            string[] ResultString = RetData.CleanJsonString();
            string dt = ResultString[0];

            UserModel userModel = JsonConvert.DeserializeObject<UserModel>(dt, new CustomConverter<UserModel>());
            if (!string.IsNullOrEmpty(ResultString[1]))
            {
                userModel.CompanyConnectionString = ResultString[1];
            }
            return userModel;

        }




        public void Signout(string userName)
        {
            /* This code should be removed once there is a framework level caching
            * implemented... */
            _contextCache = _httpContext.Cache; //HttpContext.Current.Cache
            _contextCache.Remove(userName + "_CurrentUser");
            /* Caching Code ends */
            _cachedUser = null;
            FormsAuthentication.SignOut();
        }
        #endregion
    }


    public class CustomConverter<T> : CustomCreationConverter<IUserModel> where T : new()
    {
        public override IUserModel Create(Type objectType)
        {
            return ((IUserModel)new T());
        }
    }
}

