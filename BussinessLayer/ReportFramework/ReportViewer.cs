using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Configuration;
using System.ComponentModel;
using System.Drawing;
using System.Text;
using System.Data;
using System.Data.SqlClient;
namespace BussinessLayer.ReportFramework
{
   public class ReportViewer
    {
        //public void generatereport()
        //{
        //    //ReportViewer1.Visible = true;
        //    int id = 1;
        //    //ReportViewer1.ProcessingMode = ProcessingMode.Local;
        //    //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Content/Report/Rdlc/Report1.rdlc");
        //    DataSet ds = new DataSet();
        //    ds = GetData(id);
        //    if (ds.Tables[0].Rows.Count > 0)
        //    {
        //        ReportDataSource rds = new ReportDataSource("DataSet1", ds.Tables[0]);
        //        ReportViewer1.LocalReport.DataSources.Clear();
        //        ReportViewer1.LocalReport.DataSources.Add(rds);
        //    }
        //}
       public static DataSet GetData(string strJsonData)
        {
            SqlConnection con = new SqlConnection("server=ECESIS-TVM05\\SQL2008R2; database=BTS_V1;Integrated Security=False;User ID=sa;Password=sameer@123");
            con.Open();
            SqlCommand cmd = new SqlCommand("select * from BTS_TB_BPO_ORDER ");
            using (con)
            {
                using (SqlDataAdapter da = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    da.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    return (ds);
                }
            }
        }

       
    }
}
