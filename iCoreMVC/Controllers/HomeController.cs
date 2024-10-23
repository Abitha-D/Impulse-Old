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
using System.Data;
using System.Data.SqlClient;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Web.Script.Serialization;
using BussinessLayer.EMail;

using System.Text.RegularExpressions;

using System.Net.Http;
using System.Text;
using System.Threading.Tasks;


namespace Impulse.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Impulse/Home/

        private readonly string GetEmpIDapiURL = "http://13.202.88.154/Impulse_Attendance/api/Attendance/GetIdByEmployeeCode";

        Commonfunctions commonFunctionObj = new Commonfunctions();
        LoginFrameWork.Authentication.UserModel sUserDetails = new LoginFrameWork.Authentication.UserModel();

        EMail emailobj = new EMail();

        #region systemwakesleep

        private static DateTime? lastSleepTime;
        private static DateTime? lastWakeTime;
        private static List<Dictionary<string, string>> sleepWakeEvents = new List<Dictionary<string, string>>();

        [HttpPost]
        public ActionResult RecordSleepEvent(string sleepTime)
        {
            DateTime parsedSleepTime;
            if (DateTime.TryParse(sleepTime, out parsedSleepTime))
            {
                lastSleepTime = parsedSleepTime;

                var sleepEvent = new Dictionary<string, string>
                {
                    { "SleepTime", lastSleepTime.Value.ToString("yyyy-MM-dd HH:mm:ss") }
                };

                sleepWakeEvents.Add(sleepEvent);
                Session["SleepWakeEvents"] = JsonConvert.SerializeObject(sleepWakeEvents);

                Console.WriteLine("Sleep Time Recorded: " + lastSleepTime.Value.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult RecordWakeEvent(string wakeTime)
        {
            DateTime parsedWakeTime;
            if (DateTime.TryParse(wakeTime, out parsedWakeTime))
            {
                lastWakeTime = parsedWakeTime;

                var wakeEvent = new Dictionary<string, string>
                {
                    { "WakeTime", lastWakeTime.Value.ToString("yyyy-MM-dd HH:mm:ss") }
                };

                // Check if there's a previous sleep event to pair with this wake event
                if (sleepWakeEvents.Count > 0 && !sleepWakeEvents[sleepWakeEvents.Count - 1].ContainsKey("WakeTime"))
                {
                    sleepWakeEvents[sleepWakeEvents.Count - 1]["WakeTime"] = lastWakeTime.Value.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else
                {
                    sleepWakeEvents.Add(wakeEvent);
                }

                Session["SleepWakeEvents"] = JsonConvert.SerializeObject(sleepWakeEvents);

                Console.WriteLine("Wake Time Recorded: " + lastWakeTime.Value.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            return Json(new { success = true });
        }

        public ActionResult GetSleepWakeTimes()
        {
            //return Json(new
            //{
            //    sleepTime = lastSleepTime.HasValue ? lastSleepTime.Value.ToString("yyyy-MM-dd HH:mm:ss") : "No data",
            //    wakeTime = lastWakeTime.HasValue ? lastWakeTime.Value.ToString("yyyy-MM-dd HH:mm:ss") : "No data"
            //}, JsonRequestBehavior.AllowGet);

            var eventsToReturn = new List<Dictionary<string, string>>(sleepWakeEvents); // Copy the events to return
            sleepWakeEvents.Clear(); // Clear the original list

            return Json(eventsToReturn, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSleepWakeTimeswithoutClearEntry()
        {
            //return Json(new
            //{
            //    sleepTime = lastSleepTime.HasValue ? lastSleepTime.Value.ToString("yyyy-MM-dd HH:mm:ss") : "No data",
            //    wakeTime = lastWakeTime.HasValue ? lastWakeTime.Value.ToString("yyyy-MM-dd HH:mm:ss") : "No data"
            //}, JsonRequestBehavior.AllowGet);

            var eventsToReturn = new List<Dictionary<string, string>>(sleepWakeEvents); // Copy the events to return
            //sleepWakeEvents.Clear(); // Clear the original list

            return Json(eventsToReturn, JsonRequestBehavior.AllowGet);
        }

        #endregion systemwakesleep

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
                sUserDetails = userModel;
                string varhdnUserDetails = JavascriptObj.CreateJsonObject(userModel);
                return varhdnUserDetails;
            }
            catch
            {
            }
            return "";
        }
        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
        public JsonResult loadpage()
        {
            var AjaxReturn = new
            {
                Message = "Error"
            };
            try
            {
                Javascript JavascriptObj = new Javascript();
                LoginFrameWork.Authentication.UserModel userModel = (System.Web.HttpContext.Current.User as UserPrincipal).user;

                string varhdnUserDetails = JavascriptObj.CreateJsonObject(userModel);
                //return varhdnUserDetails;

                string strModuleData = "";
                DataSet data = new DataSet();
                SqlConnection sqlCon = new SqlConnection(connectionstring);
                SqlCommand sqlCmd = new SqlCommand();

                SqlCommand myCommand = new SqlCommand("PROC_SELECT_STARTUP_DATA_HR");
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = sqlCon;
                myCommand.Parameters.AddWithValue("@EmpRefNo", userModel.EmployeeId);
                //myCommand.Parameters.AddWithValue("@strCondition", objGetData.strCondition);
                //myCommand.Parameters.AddWithValue("@intPageIndex", PageIndex);
                //myCommand.Parameters.AddWithValue("@intFetch", Fetch);
                SqlDataAdapter da = new SqlDataAdapter(myCommand);

                da.Fill(data);
                da.Dispose();
                sqlCon.Close();

                DataTable ModuleTable = data.Tables[0];
                strModuleData = Serialize(ModuleTable);
                var AjaxData = new
                {
                    //Page = tblPagination.Rows[0]["Page"].ToString(),
                    //TotalPage = tblPagination.Rows[0]["TotalPage"].ToString(),
                    //CurrentPage = tblPagination.Rows[0]["Count"].ToString(),
                    //Total = tblPagination.Rows[0]["Count"].ToString(),
                    //Data = strRetData,
                    SessionData = varhdnUserDetails, // Session
                    ModuleData = strModuleData, // Modules
                    DesignationData = Serialize(data.Tables[1]), //Designation
                    EmployeeImagePath = Serialize(data.Tables[2])// Order Summary
                };

                return Json(AjaxData, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(AjaxReturn, JsonRequestBehavior.AllowGet);
            }

        }
        public String LogoutUser()
        {
            string strModuleData = "";

            try
            {
                Int64 refNo = Convert.ToInt64(Session["emp_ref_no"].ToString());

                Int64 RoleId = Convert.ToInt64(Session["role_id"].ToString());

                Session["emp_ref_no"] = "";

                Session["role_id"] = "";

                //if (RoleId == 1 || RoleId == 9 || RoleId == 10)
                //{

                //    DataSet data = new DataSet();
                //    SqlConnection sqlCon = new SqlConnection(connectionstring);
                //    SqlCommand sqlCmd = new SqlCommand();

                //    SqlCommand myCommand = new SqlCommand("PROC_SELECT_EMPLOYEE_SALARY_DETAILS");
                //    myCommand.CommandType = CommandType.StoredProcedure;
                //    myCommand.Connection = sqlCon;
                //    myCommand.Parameters.AddWithValue("@empRef", refNo);
                //    //myCommand.Parameters.AddWithValue("@strCondition", objGetData.strCondition);
                //    //myCommand.Parameters.AddWithValue("@intPageIndex", PageIndex);
                //    //myCommand.Parameters.AddWithValue("@intFetch", Fetch);
                //    SqlDataAdapter da = new SqlDataAdapter(myCommand);

                //    da.Fill(data);
                //    da.Dispose();
                //    sqlCon.Close();

                //    DataTable ModuleTable = data.Tables[0];
                //    strModuleData = Serialize(ModuleTable);
                //}
            }
            catch (Exception ex)
            {
                //return ex.ToString();
            }
            return strModuleData;
        }
        #endregion SessionMethod

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Photoframe()
        {
            return View();
        }
        public ActionResult DefaultHome()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public ActionResult Partial1()
        {
            return View();
        }
        public ActionResult QuoteoftheDay()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public object GetNotification(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_NOTIFICATION");

        }
        public object SelectEmployeeDetails(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "HR_VW_EMP_LIST");

        }
        public object GetPendingList(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "IM_VW_PENDING_APPROVAL");

        }
        [HttpPost]
        public async Task<ActionResult> Index(BussinessLayer.Common.LoginDetails u)
        {
            string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
            string newuser = Request.Form["newuser"].ToString();
            string newpwd = Request.Form["newpwd"].ToString();

            String CompanyID = null;
            String lid = null;
            String pword = null;
            if (newuser == "" && newpwd == "")
            {
                if (ModelState.IsValid)
                {
                    CompanyID = "40";
                    lid = u.User;
                    pword = u.Password;
                }
                else
                {
                    ViewBag.Message = "Enter Username or Password";
                    return View(u);
                }
            }
            else
            {
                CompanyID = "40";
                lid = newuser;
                pword = newpwd;
            }

            if (!string.IsNullOrEmpty(lid))
            {
                Session["EmployeeCode"] = lid;

                // Call API to get emp_ref_no
                int empRefNo = await GetEmployeeRefNoAsync(lid);

            }
            AuthenticationService authService = new AuthenticationService(System.Web.HttpContext.Current);
            //string authMessage = authService.CheckUserLogin(ID_TXT_USER.Text, HidBase64Password.Value, CompanyID);

            string authmessage = "";

            if (!Regex.Match(u.User.ToString(), @"^[a-zA-Z0-9/]+(?:[\\w -]*[a-zA-Z0-9/]+)*$").Success)
            {
                //iResult = -2;

                //string IPAddress = GetIPAddress();

                //var sr = new StreamReader(Server.MapPath("~/MailTemplate/common.txt"));
                //string body = sr.ReadToEnd();
                ////Send verification mail
                //string strMessage = "Hi,<br/><br/><p>There is an spam registration occurs our site from IP " + IPAddress + " at " + System.DateTime.Now + ". We block it, please do needfull.</p>";
                //body = body.Replace("##message##", strMessage);
                //CommonMethods.SendMailRegisteration("devteamsnapshark@gmail.com", "SNAP SHARK Account Automation Registeration", body);

                //TempData["error"] = "First name must not contain numbers or special characters";

                authmessage = "Invalid Entry Detected";
            }
            else
            {
                authmessage = authService.CheckUserLogin(lid, pword, CompanyID);
            }


            if (string.Compare(authmessage, "Success") == 0)
            {
                //string userid = "0";

                authService.SignIn(lid, pword, CompanyID, true);

                if (lid == "$login$user$")
                {
                    return RedirectToAction("PasswordReset", "Master");
                }
                //response.redirect("applicationlandingpage.aspx");
                return RedirectToAction("applicationhome");
            }
            else
            {
                ViewBag.Message = authmessage;
            }

            //return RedirectToAction("Error",new {msg =authmessage }); 
            return View(u);

        }

        private async Task<int> GetEmployeeRefNoAsync(string employeeCode)
        {
            try
            {
                var requestBody = new
                {
                    attendance_Id = 0,
                    emp_Ref_No = 0,
                    emp_Code = employeeCode,
                    login_Time = DateTime.UtcNow,
                    logout_Time = DateTime.UtcNow,
                    attendance_Status = 0, // Assuming 1 for Mark In and 0 for Mark Out
                    remarks = "string",
                    delete_Status = 0
                };

                using (var client = new HttpClient())
                {
                    var json = JsonConvert.SerializeObject(requestBody);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    var response = await client.PostAsync(GetEmpIDapiURL, content);

                    if (!response.IsSuccessStatusCode)
                    {
                        // Handle non-success status code
                        return 0;
                    }

                    var responseContent = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(responseContent);

                    if (data.apiStatus == 0)
                    {

                        // Extract empRefNo from response
                        string empRefNoMessage = data.apiStatusMessage;

                        int empRefNo = 0;

                        string apiStatusMessage = data.apiStatusMessage;

                        string empRefNoPattern = @"Emp_Ref_No:\s*(\d+)";
                        string firstNamePattern = @"Emp_First_Name:\s*([^\n\r]+)";
                        string lastNamePattern = @"Emp_Last_Name:\s*([^\n\r]+)";

                        Regex empRefNoRegex = new Regex(empRefNoPattern);
                        Regex firstNameRegex = new Regex(firstNamePattern);
                        Regex lastNameRegex = new Regex(lastNamePattern);

                        Match empRefNoMatch = empRefNoRegex.Match(apiStatusMessage);
                        Match firstNameMatch = firstNameRegex.Match(apiStatusMessage);
                        Match lastNameMatch = lastNameRegex.Match(apiStatusMessage);

                        empRefNo = empRefNoMatch.Success ? int.Parse(empRefNoMatch.Groups[1].Value) : 0;
                        string firstName = firstNameMatch.Success ? firstNameMatch.Groups[1].Value.Trim() : string.Empty;
                        string lastName = lastNameMatch.Success ? lastNameMatch.Groups[1].Value.Trim() : string.Empty;

                        Session["Emp_First_Name"] = firstName;
                        Session["Emp_Last_Name"] = lastName;

                        //string pattern = @"Emp_Ref_No:\s*(\d+)";
                        //Regex regex = new Regex(pattern);

                        //Match match = regex.Match(empRefNoMessage);
                        //if (match.Success)
                        //{
                        //    string empRefNoValue = match.Groups[1].Value;
                        //    empRefNo = int.Parse(empRefNoValue); // Convert to integer if needed


                        //    //Console.WriteLine(empRefNo); // Or use empRefNoValue directly
                        //}

                        return empRefNo;
                    }
                    else
                    {
                        // Handle case where apiStatus is not 0
                        return 0;
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
                Console.WriteLine("Exception: " + ex.Message);
                return 0;
            }
        }
        public ActionResult ApplicationHome()
        {
            GetUserConfig();

            Session["emp_ref_no"] = sUserDetails.EmployeeId;

            Session["role_id"] = sUserDetails.RoleId;

            return View();
        }
        public ActionResult UploadDocument()
        {
            bool isSavedSuccessfully = true;
            string sessionid = Request.Form[0];
            string EmpName = Request.Form[1];

            try
            {
                var file = Request.Files[0];
                var fileName = Path.GetFileName(file.FileName);

                string pathString = Server.MapPath("../Content/Employee/EmployeeDocuments/EmployeeExperience");
                bool isExists = System.IO.Directory.Exists(pathString);
                if (!isExists)
                    System.IO.Directory.CreateDirectory(pathString);


                fileName = EmpName + "_" + sessionid + "_" + fileName;

                var path = string.Format("{0}\\{1}", pathString, fileName);
                bool fileexists = System.IO.Directory.Exists(path);
                if (fileexists)
                {
                    fileName = 1 + '_' + fileName;
                    path = string.Format("{0}\\{1}", pathString, fileName);
                }



                file.SaveAs(path);
                var result = new { fileName };
                return Json(result);

                //fileName, 1, 

                //InsertAttachment(fileName, 1, Int32.Parse(ordID), Int32.Parse(sessionid), Int32.Parse(CurrentUser));

            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }

            if (isSavedSuccessfully)
            {
                return Json(new { Message = "Documents Sucessfully uploaded" });
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }

        }
        public string CreateEmployeeExperience(PutDatas objPutDatas)
        {

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "HR_TB_EMPLOYEE_EXPERIENCE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return "Created";
        }
        public string UpdateEmployeeDetails(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "HR_TB_EMPLOYEE_MASTER");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public string UpdateEmployeeExperience(UpdateDatas objUpdateDatas)
        {
            try
            {

                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "HR_TB_EMPLOYEE_EXPERIENCE");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        private bool FormatJsonOutput { get; set; }
        public string Serialize(object value)
        {
            Type type = value.GetType();

            Newtonsoft.Json.JsonSerializer json = new Newtonsoft.Json.JsonSerializer();


            json.NullValueHandling = NullValueHandling.Ignore;

            json.ObjectCreationHandling = Newtonsoft.Json.ObjectCreationHandling.Replace;
            json.MissingMemberHandling = Newtonsoft.Json.MissingMemberHandling.Ignore;
            json.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            if (type == typeof(DataTable))
                json.Converters.Add(new DataTableConverter());
            else if (type == typeof(DataSet))
                json.Converters.Add(new DataSetConverter());

            StringWriter sw = new StringWriter();
            Newtonsoft.Json.JsonTextWriter writer = new JsonTextWriter(sw);
            if (this.FormatJsonOutput)
                writer.Formatting = Newtonsoft.Json.Formatting.Indented;
            else
                writer.Formatting = Newtonsoft.Json.Formatting.None;

            writer.QuoteChar = '"';
            json.Serialize(writer, value);

            string output = sw.ToString();

            writer.Close();
            sw.Close();

            return output;
        }
        public string UpdateNotification(UpdateDatas objUpdateDatas)
        {
            try
            {
                if (objUpdateDatas.strJsonData == null)
                    return "strCondition is null";
                return commonFunctionObj.UpdateData(objUpdateDatas.strSessionID, objUpdateDatas.strCondition, objUpdateDatas.strJsonData, "IMPULSE_TB_NOTIFICATION");
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        public ActionResult LockScreen()
        {
            GetUserConfig();

            Dictionary<string, string> DataList = new Dictionary<string, string>();

            DataList.Add("UserID", sUserDetails.UserID);
            DataList.Add("RoleId", sUserDetails.RoleId);
            DataList.Add("EmployeeId", sUserDetails.EmployeeId);
            ViewBag.userDetails = DataList;

            return View();
        }
        public object SelectPassword(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "TFS_TB_USER_MASTER");

        }
        public string SendMail(PutDatas objPutDatas)
        {
            var msg = "";
            string strSessionID = null;

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                //return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "CUSTOMER_ORDER_COMPARABLES");
                msg = emailobj.sendmail(objPutDatas.strJsonData);
                return msg.ToString();

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

        }

        public string SendMailWithCc(PutDatas objPutDatas)
        {
            var msg = "";
            string strSessionID = null;

            try
            {
                if (objPutDatas.strJsonData == null)
                    return "strJsonData is null";
                //return commonFunctionObj.InsertData_RetID(objPutDatas.strSessionID, objPutDatas.strJsonData, "CUSTOMER_ORDER_COMPARABLES");
                msg = emailobj.sendmailwithCCs(objPutDatas.strJsonData);
                return msg.ToString();

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

        }
        public string SelectEmailTemplate(GetDatas objGetData)
        {
            Commonfunctions commonFunctionObj = new Commonfunctions();
            return commonFunctionObj.SelectData(objGetData, "BTS_TB_MAIL_TEMPLATE");

        }
    }
}