using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.IO;
using System.Xml;
using System.Net;
using System.Net.Mail;
using System.Web.Script.Serialization;
//using System.Web.Mvc;
namespace BussinessLayer.EMail
{
    public class EMail
    {
        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;

        public string sendmail(string strJsonData)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                 var jss = new JavaScriptSerializer();
                 Dictionary<string, string> sData = jss.Deserialize<Dictionary<string, string>>(strJsonData);

                SmtpClient mailClient = new SmtpClient();
                var message = new MailMessage();
                message.To.Add(sData["mail_to"]);  // replace with valid value 
                message.Subject =sData["mail_subject"];
                message.Body = sData["mail_body"];
                message.IsBodyHtml = true;
                //message.Attachments.Add(attach);

                message.Priority = MailPriority.High;

                bool isssl = Convert.ToBoolean(ConfigurationManager.AppSettings["mailssl"]);

                mailClient.EnableSsl = isssl;
                mailClient.Send(message);

                message.Dispose();
                mailClient.Dispose();
                return "Mail send sucessfully..";
                //using (var smtp = new SmtpClient())
                //{
                //    //var credential = new NetworkCredential
                //    //{
                //    //    UserName = "icorepioneerteam@gmail.com",  // replace with valid value
                //    //    Password = "IcoreAdmin@123"  // replace with valid value
                //    //};
                //    //smtp.Credentials = credential;
                //    //smtp.Host = "smtp.gmail.com";
                //    //smtp.Port = 587;
                //    smtp.EnableSsl = true;



                //    //smtp.UseDefaultCredentials = true;
                //    smtp.Send(message);


                //    //smtp.SendMailAsync(message);
                //    //return "0";
                //    //return RedirectToAction("Sent");
                
                //}
            }
            catch (SmtpFailedRecipientsException ex)
            {
                string er = ex.Message;
                return "Sorry mail can't send... Check your internet connection...";
            }
            
        }
        public string sendmailAdmin(string strJsonData)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                var jss = new JavaScriptSerializer();
                Dictionary<string, string> sData = jss.Deserialize<Dictionary<string, string>>(strJsonData);

                SmtpClient mailClient = new SmtpClient();
                var message = new MailMessage();
                message.To.Add(sData["mail_to"]);
                message.To.Add(sData["mail_to1"]);  // replace with valid value 
                message.Subject = sData["mail_subject"];
                message.Body = sData["mail_body"];
                message.IsBodyHtml = true;

                message.Priority = MailPriority.High;

                bool isssl = Convert.ToBoolean(ConfigurationManager.AppSettings["mailssl"]);

                mailClient.EnableSsl = isssl;
                mailClient.Send(message);

                message.Dispose();
                mailClient.Dispose();
                return "Mail send sucessfully..";
            }
            catch (SmtpFailedRecipientsException ex)
            {
                string er = ex.Message;
                return "Sorry mail can't send... Check your internet connection...";
            }

        }
        public string SendMailPhtAttached(string strJsonData ,string sServerPath)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                var jss = new JavaScriptSerializer();
                Dictionary<string, string> sData = jss.Deserialize<Dictionary<string, string>>(strJsonData);

                SmtpClient mailClient = new SmtpClient();
                var message = new MailMessage();
                message.To.Add(sData["mail_to"]);  // replace with valid value  "..//iCoreMvc//Content//Template//fw9.pdf"
                message.Subject = sData["mail_subject"];
                message.Body = sData["mail_body"];
                message.IsBodyHtml = true;
                Attachment attachpath = new Attachment(sServerPath);
                message.Attachments.Add(attachpath);
                
                message.Priority = MailPriority.High;

                bool isssl = Convert.ToBoolean(ConfigurationManager.AppSettings["mailssl"]);

                mailClient.EnableSsl = isssl;
                mailClient.Send(message);

                message.Dispose();
                mailClient.Dispose();
                return "Mail send sucessfully..";
             
            }
            catch (SmtpFailedRecipientsException ex)
            {
                string er = ex.Message;
                return "Sorry mail can't send... Check your internet connection...";
            }

        }
        public string sendmailphotos(string strJsonData,string dir)
        {
            //SqlConnection sqlCon = new SqlConnection(connectionstring);
           
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                var jss = new JavaScriptSerializer();
                Dictionary<string, string> sData = jss.Deserialize<Dictionary<string, string>>(strJsonData);

                SmtpClient mailClient = new SmtpClient();
                var message = new MailMessage();
                message.To.Add(sData["mail_to"]);  // replace with valid value 
                if (sData["mail_cc"] != "" || sData["mail_cc"] != null)
                {
                    message.CC.Add(sData["mail_cc"]);
                }
                message.Subject = sData["mail_subject"];
                message.Body = sData["mail_body"];
                message.IsBodyHtml = true;
                //message.Attachments.Add(attach);
                var orderid = sData["orderid"]; ;
                //var attachmentid = "1,2,3,4,5,6,7";
                var attachmentid = sData["attachmentid"];

                if (attachmentid != "")
                {

                    string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
                    SqlConnection objSQLConnection = new SqlConnection(); ;
                    objSQLConnection.ConnectionString = connectionstring;
                    SqlCommand objSQLCommand = new SqlCommand();
                    SqlDataAdapter objDataAdapter = new SqlDataAdapter();
                    DataTable objResults = new DataTable();
                    objSQLCommand.Connection = objSQLConnection;
                    objSQLCommand.CommandText = "SELECT FileName,DisplayName FROM BTS_TB_ATTACHMENT WHERE AttachmentID in (" + attachmentid + ") and OrderID=" + orderid + "";
                    //objSQLCommand.CommandText = "SELECT FileName FROM BTS_TB_ATTACHMENT WHERE AttachmentID in (" + attachmentid + ")";
                    objDataAdapter.SelectCommand = objSQLCommand;
                    objSQLConnection.Open();
                    objDataAdapter.Fill(objResults);
                    objSQLConnection.Close();
                    for (int i = 0; i < objResults.Rows.Count; i++)
                    {
                        var file = dir + "/" + objResults.Rows[i][0].ToString();

                        Attachment attachment;
                        attachment = (new Attachment(dir + "\\" + objResults.Rows[i][0].ToString()));
                        attachment.ContentDisposition.FileName = objResults.Rows[i][1].ToString()+".jpg";
                        message.Attachments.Add(attachment);

                        //message.Attachments.Add(new Attachment(dir + "\\" + objResults.Rows[i][0].ToString()));
                    }
                }

                message.Priority = MailPriority.High;

                bool isssl = Convert.ToBoolean(ConfigurationManager.AppSettings["mailssl"]);

                mailClient.EnableSsl = isssl;
                mailClient.Send(message);

                message.Dispose();
                mailClient.Dispose();
                return "Mail send sucessfully..";
                //using (var smtp = new SmtpClient())
                //{
                //    //var credential = new NetworkCredential
                //    //{
                //    //    UserName = "xxxxxxxxx@xxxxxxx.xxx",  // replace with valid value
                //    //    Password = "xxxxxxxxxx"  // replace with valid value
                //    //};
                //    //smtp.Credentials = credential;
                //    //smtp.Host = "smtp.gmail.com";
                //    //smtp.Port = 587;
                //    smtp.EnableSsl = true;



                //    //smtp.UseDefaultCredentials = true;
                //    smtp.Send(message);


                //    //smtp.SendMailAsync(message);
                //    //return "0";
                //    //return RedirectToAction("Sent");

                //}
            }
            catch (SmtpFailedRecipientsException ex)
            {
                string er = ex.Message;
                return "Sorry mail can't send... Check your internet connection...";
            }

        }
        public string sendmailwithCC(Int64 refNo)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
               
                SmtpClient mailClient = new SmtpClient();
                var message = new MailMessage();
                message.To.Add("ramkfaizi97@gmail.com");  // replace with valid value 
                message.CC.Add("ramkfaizi97@gmail.com");
                message.Subject = "Unauthorized Access";
                message.Body = "Hi,<br> Employee <b>'" + refNo + "'</b> try get employee salary details using scrapping or direct URL <b></b> </body></html>";
                message.IsBodyHtml = true;

                message.Priority = MailPriority.High;

                bool isssl = Convert.ToBoolean(ConfigurationManager.AppSettings["mailssl"]);

                mailClient.EnableSsl = isssl;
                mailClient.Send(message);

                message.Dispose();
                mailClient.Dispose();
                return "Mail send sucessfully..";
            }
            catch (SmtpFailedRecipientsException ex)
            {
                string er = ex.Message;
                return "Sorry mail can't send... Check your internet connection...";
            }

        }

        public string sendBirthdayMail(string strJsonData)
        {
            SqlConnection sqlCon = new SqlConnection(connectionstring);
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                var jss = new JavaScriptSerializer();
                Dictionary<string, string> sData = jss.Deserialize<Dictionary<string, string>>(strJsonData);

                string template = "", imagePath = "", employeeNames = "", employeeCode = "";

                string domainname = "http://localhost/"; //HttpContext.Current.Request.Url.Host;

                SmtpClient mailClient = new SmtpClient();
                var message = new MailMessage();
                message.To.Add(sData["mail_to"]);
                message.CC.Add(sData["mail_cc"]);  // replace with valid value 
                message.Subject = sData["mail_subject"];
                message.Body = sData["mail_body"];

                //template = sData["template"];

                //imagePath = sData["imagePath"];

                //employeeNames = sData["employeeName"];

                //employeeCode = sData["employeeCode"];

                //if (template == "1")
                //{
                //    message.Body = "<html><body><center>Wishing you a great birthday and a memorable year. From all of us. </center><div><center><img src='http://bpotrackers.com/Impulse_pay/Content/Image/balloon.gif' style='height: 85px;'/><label>" + employeeCode + "</label><img src='http://bpotrackers.com/Impulse_pay/Content/Image/balloon.gif' style='height: 85px;' /> <br/>" +
                //                    "<img src='http://bpotrackers.com/Impulse_pay/Content/Image/cake_1.jpg' style='height: 431px;margin-top: 20px;width: 700px;' /><div style='position: absolute;top: 52%;left: 50%;transform: translate(-50%, -50%);color: white;font-family: Josefin Sans, sans-serif;'><label>" + employeeNames + "</label></div></center><div><center style='margin-top: 30px;' >" +
                //                    " Wishing you a day filled with happiness and a year filled with joy. Happy birthday! ...</center></body></html>";
                //}
                //else if (template == "2")
                //{
                //    message.Body = "<html><body><center>Wishing you a great birthday and a memorable year. From all of us. </center><div><center><img src='" + domainname + "/Impulse/Content/Image/balloon.gif' style='height: 85px;'/><label>" + employeeCode + "</label><img src='" + domainname + "/Impulse/Content/Image/balloon.gif' style='height: 85px;' /> <br/>" +
                //                    "<img src='" + domainname + "/Impulse/Content/Image/cake_1.jpg' style='height: 431px;margin-top: 20px;width: 700px;' /><div style='position: absolute;top: 52%;left: 50%;transform: translate(-50%, -50%);color: white;font-family: Josefin Sans, sans-serif;'><label>" + employeeNames + "</label></div></center><div><center style='margin-top: 30px;' >" +
                //                    " Wishing you a day filled with happiness and a year filled with joy. Happy birthday! ...</center></body></html>";
                //}

                //string file = @"C:\Users\acv\Pictures\Logo.jpg";
                
                //Attachment attachpath = new Attachment(serverPath + "cake_1.jpg");
                //Attachment attachpath1 = new Attachment(serverPath + "balloon.gif");


                //message.Attachments.Add(attachpath);
                //message.Attachments.Add(attachpath1);
               
                message.IsBodyHtml = true;

                message.Priority = MailPriority.High;

                bool isssl = Convert.ToBoolean(ConfigurationManager.AppSettings["mailssl"]);

                mailClient.EnableSsl = isssl;
                mailClient.Send(message);

                message.Dispose();
                mailClient.Dispose();
                return "Mail send sucessfully..";
            }
            catch (SmtpFailedRecipientsException ex)
            {
                string er = ex.Message;
                return "Sorry mail can't send... Check your internet connection...";
            }

        }
    }
}
