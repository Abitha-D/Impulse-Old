using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoginFrameWork
{
    public static class Extension
    {
        public static string SpiltString(this string source, string strFirst, string strLast)
        {
            int Pos1 = source.IndexOf(strFirst) + strFirst.Length;
            int Pos2 = source.IndexOf(strLast);
            return source.Substring(Pos1, Pos2 - Pos1);
        }
        public static string GetFirst(this string source, int head_length)
        {
            if (head_length >= source.Length)
                return source;
            return source.Substring(source.Length - head_length);
        }
        public static string GetLast(this string source, int tail_length)
        {
            if (tail_length >= source.Length)
                return source;
            return source.Substring(source.Length - tail_length);
        }
        public static string[] CleanJsonString(this string RetData)
        {
            string companyConnectionString = string.Empty;
            RetData = RetData.Replace("[", "").Replace("]", "");
            //RetData = RetData.Remove(RetData.IndexOf('"'), 1);
            //RetData = RetData.Remove(RetData.LastIndexOf('"'), 1);
            try
            {
                //string FirstString = "\\\"CompanyConnectionString\\\"", SecondString = "\\\"UserThemePref\\\"";

                //companyConnectionString = RetData.SpiltString(FirstString, SecondString);
                //companyConnectionString = "Data Source=SOFT1\\SQL2008R2;Initial Catalog=Techflowdb_P1;Integrated Security=True";
                //companyConnectionString = companyConnectionString.Replace(@":\", "").Replace(@"\\\\", @"\");
                //companyConnectionString = companyConnectionString.Substring(1, companyConnectionString.Length - 4);
                ////companyConnectionString = "Data Source=SOFT1\\SQL2008R2;Initial Catalog=Techflowdb_P1;Integrated Security=True";


            }
            catch
            {

            }
            //RetData = RetData.Replace("null", "' '").Replace(@"\", "");
            string[] ResultStringCollection = { RetData, companyConnectionString };
            return ResultStringCollection;

        }
    }
}
