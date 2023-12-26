using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BussinessLayer.Login
{
    class IUserLogin
    {
        public int UserID { get; set; }
        public string FullName { get; set; }
        [StringLength(6, MinimumLength = 5, ErrorMessage = "5-6 char allowed!")]
        [Required(ErrorMessage = "Please Provide Username", AllowEmptyStrings = false)]
        public string Username { get; set; }
        [Required(ErrorMessage = "Please provide password", AllowEmptyStrings = false)]
        [DataType(System.ComponentModel.DataAnnotations.DataType.Password)]
        public string Password { get; set; }
    }
}
