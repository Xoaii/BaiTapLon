﻿using SuatAn;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Runtime.Remoting.Contexts;
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
                   
                    cm.Parameters.Add("@hoten", SqlDbType.NVarChar, 100).Value = Request["hoten"];
                    cm.Parameters.Add("@gioitinh", SqlDbType.NVarChar,100).Value = Request["gioitinh"];
                    cm.Parameters.Add("@diachi", SqlDbType.NVarChar, 100).Value = Request["diachi"];
                    cm.Parameters.Add("@ngaysinh", SqlDbType.Date, 100).Value = Request["ngaysinh"];
                    cm.Parameters.Add("@khoa", SqlDbType.NVarChar, 100).Value = Request["khoa"];
                    cm.Parameters.Add("@lop", SqlDbType.NVarChar, 100).Value = Request["lop"];
                    cm.Parameters.Add("@email", SqlDbType.NVarChar, 100).Value = Request["email"];
                    cm.Parameters.Add("@password", SqlDbType.NVarChar, 100).Value = Request["password"];
                    //cm.Parameters.Add("@del_at", SqlDbType.DateTime, 100).Value = Request["del_at"];

                    break;

            }

            switch (action)
            {
                case "add_SinhVien":
                case "edit_SinhVien":
                case "delete_SinhVien":
                case "search_SinhVien":
                    cm.Parameters.Add("@masv", SqlDbType.NVarChar,100).Value = Request["masv"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_Sach(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_Sach", action);

            switch (action)
            {
                case "add_Sach":
                case "edit_Sach":
                    cm.Parameters.Add("@tensach", SqlDbType.NVarChar, 100).Value = Request["tensach"];
                    cm.Parameters.Add("@manxb", SqlDbType.NVarChar, 100).Value = Request["manxb"];
                    cm.Parameters.Add("@matacgia", SqlDbType.NVarChar, 100).Value = Request["matacgia"];
                    cm.Parameters.Add("@trangthai", SqlDbType.NVarChar, 100).Value = Request["trangthai"];
                    cm.Parameters.Add("@madausach", SqlDbType.NVarChar, 100).Value = Request["madausach"];
                 
                

                    break;

            }

            switch (action)
            {
                case "add_Sach":
                case "edit_Sach":
                case "delete_Sach":
                case "search_Sach":
                    cm.Parameters.Add("@masach", SqlDbType.NVarChar, 100).Value = Request["masach"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "list_SinhVien":
                case "add_SinhVien":
                case "edit_SinhVien":
                case "delete_SinhVien":
                case "search_SinhVien":

                    xuly_SinhVien(action);
                    break;
                case "list_Sach":
                case "add_Sach":
                case "edit_Sach":
                case "delete_Sach":
                case "search_Sach":
                    xuly_Sach(action);
                    break;

            }
        }
    }
}