using Impulse.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Impulse.Repository
{
     
    public class SqlEmployeesProvider
    {
        static string strConnectionString = ConfigurationManager.ConnectionStrings["Connectioncontext"].ConnectionString;
        
        public static List<Employee> GetEmployeeLists(Int64 iID, Int64 sRoleID)
        {
            List<Employee> empList = new List<Employee>();
            using (SqlConnection con = new SqlConnection(strConnectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("PROC_GET_EMPLOYEE_DETAILS");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    cmd.Connection = con;
                    cmd.Parameters.AddWithValue("@refNo", iID);
                    cmd.Parameters.AddWithValue("@RoleId", sRoleID);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Employee emp = new Employee();

                        emp.Empname = reader["emp_full_name"].ToString();
                        emp.Department = reader["emp_department"].ToString();
                        emp.filePath = reader["file_path"].ToString();
                        emp.refNo = reader["emp_ref_no"].ToString();
                        emp.employeeCode = reader["emp_ref_code"].ToString();

                        if(emp.filePath == null || emp.filePath == "")
                        {
                            emp.filePath = "../Content/Image/avatar.png";
                        }

                        empList.Add(emp);

                    }
                    reader.Close();
                    con.Close();
                }
                catch (Exception ex)
                {
                    //return ex.ToString();
                }
                finally
                {
                    if (con != null)
                    {
                        if (con.State == System.Data.ConnectionState.Open)
                            con.Close();
                    }
                }
            }
            return empList;
        }
    }
}