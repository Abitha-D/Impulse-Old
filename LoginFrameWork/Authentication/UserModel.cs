using System;
using System.Collections.Generic;
using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
using System.Web;
namespace LoginFrameWork.Authentication
{
    public interface IUserModel
    {
        string SessionID { get; set; }
        string UserID { get; set; }
        string UserName { get; set; }
        string FinYearID { get; set; }
        string FinYear { get; set; }
        string DateFormat { get; set; }
        string DateFormatForGrid { get; set; }
        string OwningCostID { get; set; }
        string CompanyLanguage { get; set; }
        string CurrencyId { get; set; }
        string CompanyName { get; set; }
        string CompanyConnectionString { get; set; }
        string UserThemePref { get; set; }
        string EmployeeId { get; set; }
        string AccessLevel { get; set; }
        string RoleId { get; set; }
    }

    /// <summary>
    /// Summary description for UserModel
    /// </summary>    
    public class UserModel : IUserModel
    {

        public string SessionID { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string FinYearID { get; set; }
        public string FinYear { get; set; }
        public string DateFormat { get; set; }
        public string DateFormatForGrid { get; set; }
        public string OwningCostID { get; set; }
        public string CompanyLanguage { get; set; }
        public string CurrencyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyConnectionString { get; set; }
        public string UserThemePref { get; set; }
        public string EmployeeId { get; set; }
        public string AccessLevel { get; set; }
        public string RoleId { get; set; }
    }
}
