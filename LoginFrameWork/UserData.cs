using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;


using System.Security.Principal;
using System.Web.Security;
using LoginFrameWork.Authentication;

/// <summary>
namespace LoginFrameWork
{
    
    public static  class UserData
    {
     
       
        public static  UserModel User
        {
            get
            {
                if (HttpContext.Current != null)
                {
                    try
                    {
                        //LoginFrameWork.Authentication.UserModel userModel = (System.Web.HttpContext.Current.User as UserPrincipal).user;
                        //UserPrincipal currentUser = (HttpContext.Current.User as UserPrincipal);
                        UserPrincipal currentUser = (System.Web.HttpContext.Current.User as UserPrincipal);
                        return currentUser.user;
                    }
                    catch
                    {
                    }
                }
                return null;
            }
        }
    }
}
