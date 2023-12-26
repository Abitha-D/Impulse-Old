using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoginFrameWork.Authentication
{
    /// </summary>
    public class LoginDetails
    {
        //public LoginDetails()
        //{
        //    User = null;
        //    Password = null;
        //    Company = null;
        //}

        public String User { get; set; }
        public String Password { get; set; }
        public String Company { get; set; }
        public String IPAddress { get; set; }
    }

}

