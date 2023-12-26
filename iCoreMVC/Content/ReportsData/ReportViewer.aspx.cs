using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.IO;
using System.Xml;

using Microsoft.Reporting;
using Microsoft.ReportingServices;
using Microsoft.Reporting.WebForms;

using System.ComponentModel;
using System.Drawing;
using System.Web.Services;

namespace impulse.Content.ReportsData
{

    public partial class ReportViewer : System.Web.UI.Page
    {
        string connectionstring = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
        string report_id = "";
        string report_codition = "";
        string report_table = "";
        string report_name = "";
        string file_name = "";
        string dataset = ""; string[] datasetarray;
        string table_type = ""; string[] rpttablearray;
        protected void Page_Load(object sender, EventArgs e)
        {

            //ReportViewer1.Visible = false;
            report_id = Request.QueryString["report_id"];
            report_codition = Request.QueryString["report_codition"];
            table_type = Request.QueryString["table_type"];
            file_name = Request.QueryString["file_name"];
            
            if (report_id != null)
            {
                var v = report_id;

                if (!IsPostBack)
                {
                    if (table_type != null)
                    {
                        generatereport_Multiple();
                    }
                    else if (report_id == "62")
                    {
                        generateemployeereport();
                    }
                    else if (report_id == "55" || report_id == "70")
                    {
                        generateemployeepayslip();
                    }
                    else if (file_name != "")
                    {
                        generateMonthlyReports();
                    }
                    else
                    {
                        generatereport();
                    }

                }


            }
        }

        private void generateMonthlyReports()
        {
            SqlConnection con = new SqlConnection(connectionstring);
            
            string query = "select * from BTS_TB_REPORT_DATA where report_id=" + report_id;

            SqlCommand cmd = new SqlCommand(query, con);

            con.Open();

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                report_name = Convert.ToString(rdr["report_name"]);
                dataset = Convert.ToString(rdr["report_dataset"]);
                report_table = Convert.ToString(rdr["report_table"]);
                ReportViewer1.LocalReport.DisplayName = Convert.ToString(file_name);
            }

            con.Close();

            ReportViewer1.ProcessingMode = ProcessingMode.Local;

            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Content/ReportsData/Rdlc/" + report_name);

            System.Data.DataSet ds = new System.Data.DataSet();

            ds = GetData();

            if (ds.Tables[0].Rows.Count > 0)
            {
                ReportViewer1.Visible = true;

                ReportDataSource rds = new ReportDataSource("" + dataset + "", ds.Tables[0]);

                ReportViewer1.LocalReport.DataSources.Clear();

                ReportViewer1.LocalReport.DataSources.Add(rds);

                ReportViewer1.LocalReport.EnableExternalImages = true;

                ReportViewer1.LocalReport.Refresh();

            }
            else
            {
                Response.Write("<h4 style='text-align: center;padding-top: 15%;'>No Datas Found</h4>");
            }
        }

        public void generatereport_Multiple()
        {

            //ReportViewer1.Visible = true;
            //int id = 1;
            SqlConnection con = new SqlConnection(connectionstring);
            //var report_id = Request.QueryString["report_id"];
            //var report_codition = Request.QueryString["report_codition"];

            string query = "select * from BTS_TB_REPORT_DATA where report_id=" + report_id;
            SqlCommand cmd = new SqlCommand(query, con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                report_name = Convert.ToString(rdr["report_name"]);
                dataset = Convert.ToString(rdr["report_dataset"]);
                datasetarray = dataset.Split(new string[] { "," }, StringSplitOptions.None);
                report_table = Convert.ToString(rdr["report_table"]);
                rpttablearray = report_table.Split(new string[] { "," }, StringSplitOptions.None);
                ReportViewer1.LocalReport.DisplayName = Convert.ToString(rdr["report_export_name"]);
            }

            con.Close();

            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Content/ReportsData/Rdlc/" + report_name);
            System.Data.DataSet ds = new System.Data.DataSet();
            //ds = BussinessLayer.ReportFramework.ReportViewer.GetData(strJsonData);
            ds = GetData_multi();

              //for (int i = 0; i < this.dsMyDataSet.Tables.Count; i++)
              //       {
              //            this.reportViewer1.LocalReport.DataSources.Add(this.GetMyDataTable
              //       }

            ReportViewer1.LocalReport.DataSources.Clear();
            for (var i = 0; i < ds.Tables.Count; i++) {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ReportViewer1.Visible = true;
                    ReportDataSource rds = new ReportDataSource("" + datasetarray[i] + "", ds.Tables[i]);
                   
                    ReportViewer1.LocalReport.DataSources.Add(rds);
                    ReportViewer1.LocalReport.EnableExternalImages = true;
                    ReportViewer1.LocalReport.Refresh();
                }
                else
                {
                    Response.Write("<h4 style='text-align: center;padding-top: 15%;'>No Datas Found</h4>");
                }
            }
              
        }
        public void generatereport()
        {
            //ReportViewer1.Visible = true;
            //int id = 1;
            SqlConnection con = new SqlConnection(connectionstring);
            //var report_id = Request.QueryString["report_id"];
            //var report_codition = Request.QueryString["report_codition"];

            string query = "select * from BTS_TB_REPORT_DATA where report_id=" + report_id;
            SqlCommand cmd = new SqlCommand(query, con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                report_name = Convert.ToString(rdr["report_name"]);
                dataset = Convert.ToString(rdr["report_dataset"]);
                report_table = Convert.ToString(rdr["report_table"]);
                ReportViewer1.LocalReport.DisplayName = Convert.ToString(rdr["report_export_name"]);
            }

            con.Close();

            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Content/ReportsData/Rdlc/" + report_name);
            System.Data.DataSet ds = new System.Data.DataSet();
            //ds = BussinessLayer.ReportFramework.ReportViewer.GetData(strJsonData);
            ds = GetData();
            if (ds.Tables[0].Rows.Count > 0)
            {
                ReportViewer1.Visible = true;
                ReportDataSource rds = new ReportDataSource("" + dataset + "", ds.Tables[0]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(rds);
                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.Refresh();
            }
            else
            {
                Response.Write("<h4 style='text-align: center;padding-top: 15%;'>No Datas Found</h4>");
            }
        }
        public void generateemployeepayslip()
        {
            //ReportViewer1.Visible = true;
            //int id = 1;
            SqlConnection con = new SqlConnection(connectionstring);
            //var report_id = Request.QueryString["report_id"];
            //var report_codition = Request.QueryString["report_codition"];

            string query = "select * from BTS_TB_REPORT_DATA where report_id=" + report_id;
            SqlCommand cmd = new SqlCommand(query, con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                report_name = Convert.ToString(rdr["report_name"]);
                dataset = Convert.ToString(rdr["report_dataset"]);
                report_table = Convert.ToString(rdr["report_table"]);
                //ReportViewer1.LocalReport.DisplayName = Convert.ToString(rdr["report_export_name"]);
                ReportViewer1.LocalReport.DisplayName = file_name;

            }

            con.Close();

            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Content/ReportsData/Rdlc/" + report_name);
            System.Data.DataSet ds = new System.Data.DataSet();
            //ds = BussinessLayer.ReportFramework.ReportViewer.GetData(strJsonData);
            ds = GetData();
            if (ds.Tables[0].Rows.Count > 0)
            {
                ReportViewer1.Visible = true;
                ReportDataSource rds = new ReportDataSource("" + dataset + "", ds.Tables[0]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(rds);
                ReportViewer1.LocalReport.Refresh();
            }
            else
            {
                Response.Write("<h4 style='text-align: center;padding-top: 15%;'>No Datas Found</h4>");
            }

            ReportViewer1.LocalReport.EnableExternalImages = true;
            //string FilePath = @"file:\" + ds.Tables[0].file_path ; //Application.StartupPath is for WinForms, you should try AppDomain.CurrentDomain.BaseDirectory  for .net
            string host = Request.Url.Host;
            string fileName = Convert.ToString(ds.Tables[0].Rows[0]["logo_src"]);

            string FilePath;

            if (fileName != "")
            {
                FilePath = "http://" + host + "/Impulse_Pay/Content/Image/" + fileName;
            }
            else
            {
                FilePath = "http://" + host + "/Impulse_Pay/Content/Image/EcesisLogoPNG.png";
            }

            //string FilePath = "http://" + host + "/Impulse/Content/Employee/EmployeeProfileImages/RamKumar328_images.png";
            ReportParameter[] param = new ReportParameter[1];
            param[0] = new ReportParameter("Image", FilePath);
            ReportViewer1.LocalReport.SetParameters(param);
        }
        public void generateemployeereport()
        {
            //ReportViewer1.Visible = true;
            //int id = 1;
            SqlConnection con = new SqlConnection(connectionstring);
            //var report_id = Request.QueryString["report_id"];
            //var report_codition = Request.QueryString["report_codition"];

            string query = "select * from BTS_TB_REPORT_DATA where report_id=" + report_id;
            SqlCommand cmd = new SqlCommand(query, con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                report_name = Convert.ToString(rdr["report_name"]);
                dataset = Convert.ToString(rdr["report_dataset"]);
                report_table = Convert.ToString(rdr["report_table"]);
                //ReportViewer1.LocalReport.DisplayName = Convert.ToString(rdr["report_export_name"]);
                ReportViewer1.LocalReport.DisplayName = file_name;
                
            }

            con.Close();

            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Content/ReportsData/Rdlc/" + report_name);
            System.Data.DataSet ds = new System.Data.DataSet();
            //ds = BussinessLayer.ReportFramework.ReportViewer.GetData(strJsonData);
            ds = GetData();
            if (ds.Tables[0].Rows.Count > 0)
            {
                ReportViewer1.Visible = true;
                ReportDataSource rds = new ReportDataSource("" + dataset + "", ds.Tables[0]);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(rds);
                ReportViewer1.LocalReport.Refresh();
            }
            else
            {
                Response.Write("<h4 style='text-align: center;padding-top: 15%;'>No Datas Found</h4>");
            }

            ReportViewer1.LocalReport.EnableExternalImages = true;
            //string FilePath = @"file:\" + ds.Tables[0].file_path ; //Application.StartupPath is for WinForms, you should try AppDomain.CurrentDomain.BaseDirectory  for .net
            string host = Request.Url.Host;
            string fileName = Convert.ToString(ds.Tables[0].Rows[0]["file_name"]);

            string FilePath;

            if (fileName != "")
            {
                FilePath = "http://" + host + "/Impulse/Content/Employee/EmployeeProfileImages/" + fileName;
            }
            else
            {
                FilePath = "http://" + host + "/Impulse/Content/Image/avatar.png";
            }

            //string FilePath = "http://" + host + "/Impulse/Content/Employee/EmployeeProfileImages/RamKumar328_images.png";
            ReportParameter[] param = new ReportParameter[1];
            param[0] = new ReportParameter("Image", FilePath);
            ReportViewer1.LocalReport.SetParameters(param);
        }
        private System.Data.DataSet GetData()
        {
            SqlConnection con = new SqlConnection(connectionstring);
            //System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection("server=ECESIS-TVM05\\SQL2008R2; database=BTS_V1;Integrated Security=False;User ID=sa;Password=sameer@123");
            con.Open();
            SqlCommand cmd = new SqlCommand("select * from " + report_table + " " + report_codition);
            using (con)
            {
                using (SqlDataAdapter da = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    da.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    con.Close();
                    return (ds);
                }
            }
        }
        private System.Data.DataSet GetData_multi()
        {
            var constring = ConfigurationManager.ConnectionStrings["Connectionom"].ConnectionString;
            //SqlConnection con = new SqlConnection(constring);
            DataSet ds = new DataSet();
            //System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection("server=ECESIS-TVM05\\SQL2008R2; database=BTS_V1;Integrated Security=False;User ID=sa;Password=sameer@123");
            
            for (var i = 0; i < rpttablearray.Length; i++)
            {
                SqlConnection con = new SqlConnection(constring);
                con.Open();
                SqlCommand cmd = new SqlCommand("select * from " + rpttablearray[i] + " " + report_codition);
                using (con)
                {
                    using (SqlDataAdapter da = new SqlDataAdapter())
                    {
                      

                        cmd.Connection = con;
                        da.SelectCommand = cmd;
                        da.Fill(ds,"table"+i);
                        

                        
                    }
                }
                con.Close();
                cmd.Dispose();
                con.Dispose();
            }
            
            return (ds);
        }
    }
}