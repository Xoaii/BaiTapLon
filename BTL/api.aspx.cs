using SuatAn;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BTL
{
    public partial class Default : System.Web.UI.Page
    {
        void xuly_SinhVien(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_SinhVien", action);

            switch (action)
            {
                case "add_SinhVien":
                case "edit_SinhVien":
                    cm.Parameters.Add("@masv", SqlDbType.NVarChar, 255).Value = Request["masv"];
                    cm.Parameters.Add("@hoten", SqlDbType.NVarChar, 255).Value = Request["hoten"];
                    cm.Parameters.Add("@gioitinh", SqlDbType.NVarChar,100).Value = Request["gioitinh"];
                    cm.Parameters.Add("@diachi", SqlDbType.NVarChar,255).Value = Request["diachi"];
                    cm.Parameters.Add("@ngaysinh", SqlDbType.Date, 100).Value = Request["ngaysinh"];
                    cm.Parameters.Add("@khoa", SqlDbType.NVarChar, 255).Value = Request["khoa"];
                    cm.Parameters.Add("@lop", SqlDbType.NVarChar, 255).Value = Request["lop"];
                    cm.Parameters.Add("@email", SqlDbType.NVarChar, 255).Value = Request["email"];
                    cm.Parameters.Add("@password", SqlDbType.NVarChar, 255).Value = Request["password"];
                    cm.Parameters.Add("@del_at", SqlDbType.DateTime, 100).Value = Request["del_at"];

                    break;

            }

            switch (action)
            {
                case "edit_SinhVien":
                case "delete_SinhVien":
                    cm.Parameters.Add("@masv", SqlDbType.NVarChar,255).Value = Request["masv"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "add_SinhVien":
                case "edit_SinhVien":
                case "delete_SinhVien":
                case "list_SinhVien":
                    xuly_SinhVien(action);
                    break;

            }
        }
    }
}