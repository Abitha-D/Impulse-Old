using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace BussinessLayer.Common
{
    public class ICommonFunctions
    {

        public int user_id { get; set; }
        public int role_id { get; set; }
        public int role_code { get; set; }
        public int is_approval_role { get; set; }
        public int language_code { get; set; }
        public int short_display { get; set; }

        public int intdisplay_value { get; set; }
    }


    //public interface ICommonFunctions
    //{

    public class GetDatas
    {

        public string strSessionID { get; set; }
        public string strCondition { get; set; }
        public string strCondition1 { get; set; }
        public string strFieldNames { get; set; }
    }


    public class DeleteDatas
    {
        [DataMember]
        public string strSessionID { get; set; }

        [DataMember]
        public string strCondition { get; set; }


    }

    public class DeleteAttachment
    {
        [DataMember]
        public string path { get; set; }
    }

    [DataContract]
    public class PutDatas
    {

        [DataMember]
        public string strSessionID { get; set; }

        [DataMember]
        public string strJsonData { get; set; }

    }
    [DataContract]
    public class UpdateDatas
    {
        [DataMember]
        public string strSessionID { get; set; }


        [DataMember]
        public string strJsonData { get; set; }

        [DataMember]
        public string strCondition { get; set; }

    }

    public class DupChk
    {

        [DataMember]
        public string strSessionID { get; set; }

        [DataMember]
        public string strInputValue { get; set; }

        [DataMember]
        public string strInputValue1 { get; set; }

        [DataMember]
        public string strUniqueValue { get; set; }

        [DataMember]
        public string strCondition { get; set; }

    }
    public class LoginDetails
    {

        [DataMember]
        [Required]
        public string User { get; set; }
        [DataMember]
        [Required]
        public string Password { get; set; }
        [DataMember]
        public string Company { get; set; }
        [DataMember]
        public string IPAddress { get; set; }


    }
    public class UserModel
    {
        [DataMember]
        public string SessionID { get; set; }

        [DataMember]
        public string UserID { get; set; }

        [DataMember]
        public string UserName { get; set; }

        [DataMember]
        public string FinYearID { get; set; }

        [DataMember]
        public string FinYear { get; set; }

        [DataMember]
        public string DateFormat { get; set; }

        [DataMember]
        public string DateFormatForGrid { get; set; }

        [DataMember]
        public string OwningCostID { get; set; }

        [DataMember]
        public string CompanyLanguage { get; set; }

        [DataMember]
        public string CurrencyId { get; set; }

        [DataMember]
        public string CompanyName { get; set; }

        [DataMember]
        public string CompanyConnectionString { get; set; }

        [DataMember]
        public string UserThemePref { get; set; }

        [DataMember]
        public string Implied_Number { get; set; }

        [DataMember]
        public string Implied_Quantity { get; set; }

        [DataMember]
        public string Implied_Amount { get; set; }

        [DataMember]
        public string Implied_Quantity_PJM { get; set; }

        [DataMember]
        public string Implied_Distance { get; set; }

        [DataMember]
        public string EmployeeId { get; set; }

        [DataMember]
        public string AccessLevel { get; set; }
    }
    public class ProcedureData
    {
        [DataMember]
        public string strSessionID { get; set; }
        [DataMember]
        public string ProcName { get; set; }
        [DataMember]
        public List<string> ProcParameters { get; set; }
        [DataMember]
        public List<object> ProcInputData { get; set; }

    }

    //}
}
