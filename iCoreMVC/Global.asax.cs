using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;

namespace Impulse
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //Database.SetInitializer<MVCApplication1.Models.Connectioncontext>(null);
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        private System.Web.Caching.Cache contextCache;


        void Application_PostAuthenticateRequest(Object sender, EventArgs e)
        {
            //System.Web.HttpContext.Current.Application.Remove(System.Web.HttpContext.Current.User.Identity.Name);
            this.contextCache = HttpContext.Current.Cache;
            UserPrincipal currentUser = new UserPrincipal();
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (FormsAuthentication.CookiesSupported == true)
            {
                //HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName].Value;
                if (authCookie != null)
                {
                    //FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(authCookie);
                    FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                    //string authTicket = FormsAuthentication.Decrypt(authCookie.Value).Name;
                    try
                    {
                        currentUser = this.contextCache.Get(authTicket.UserData + "_CurrentUser") as UserPrincipal;
                    }
                    catch (NullReferenceException)
                    {
                        currentUser = null;
                    }
                    if (currentUser == null || currentUser.user == null || string.IsNullOrEmpty(currentUser.user.SessionID))
                    {
                        string[] userData = authTicket.UserData.Split('|');
                        currentUser = new UserPrincipal(userData[0], userData[1], userData[2], authTicket);
                        this.contextCache.Insert(authTicket.UserData + "_CurrentUser", currentUser, null, System.Web.Caching.Cache.NoAbsoluteExpiration, System.Web.Caching.Cache.NoSlidingExpiration);
                    }
                    HttpContext.Current.User = currentUser;
                }
            }
        }

    }
}
