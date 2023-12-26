using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Security.Principal;
using System.Web.Security;
using LoginFrameWork.Authentication;

namespace LoginFrameWork
{
    public class UserPrincipal : IPrincipal
    {
       
    #region variables
    AuthenticationService authService;
    #endregion

    #region ctors
    public UserPrincipal()
    {
    }
    public UserPrincipal(string userName, string passWord, string company, FormsAuthenticationTicket authTicket)
    {
        this.Identity = new FormsIdentity(authTicket);
        authService = new AuthenticationService();
        this.user = authService.GetUserDetails(userName,passWord,company);
	}
    #endregion

    public UserModel user { get; set; }
    public IIdentity Identity { get; private set; }
    public bool IsInRole(string role)
    {
        throw new NotImplementedException();
    }
    public object ReportFilter { get; set; }
    public object Downloads { get; set; }
    }
}
