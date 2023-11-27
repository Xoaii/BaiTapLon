using SuatAn;
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
                    cm.Parameters.Add("@khoa", SqlDbType.NVarChar, 50).Value = Request["khoa"];
                    break;

            }

            switch (action)
            {
                case "add_Sach":
                case "edit_Sach":
                case "delete_Sach":
                    cm.Parameters.Add("@masach", SqlDbType.NVarChar, 100).Value = Request["masach"];
                    break;
                case "search_Sach":
                    cm.Parameters.Add("@tensach", SqlDbType.NVarChar, 100).Value = Request["tensach"];
                    cm.Parameters.Add("@khoa", SqlDbType.NVarChar, 50).Value = Request["khoa"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_DauSach(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_DauSach", action);

            switch (action)
            {
                case "add_DauSach":
                case "edit_DauSach":
                   
                    cm.Parameters.Add("@soluong", SqlDbType.Int, 100).Value = Request["soluong"];

                    break;

            }

            switch (action)
            {
                case "add_DauSach":
                case "edit_DauSach":
                case "delete_DauSach":
                    cm.Parameters.Add("@madausach", SqlDbType.NVarChar, 100).Value = Request["madausach"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_ThuThu(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_ThuThu", action);

            switch (action)
            {
                case "add_ThuThu":
                case "edit_ThuThu":

                    cm.Parameters.Add("@hoten", SqlDbType.NVarChar, 200).Value = Request["hoten"];
                    cm.Parameters.Add("@ngaysinh", SqlDbType.Date, 200).Value = Request["ngaysinh"];
                    cm.Parameters.Add("@diachi", SqlDbType.NVarChar, 200).Value = Request["diachi"];
                    cm.Parameters.Add("@gioitinh", SqlDbType.NVarChar, 50).Value = Request["gioitinh"];
                    cm.Parameters.Add("@sdt", SqlDbType.NVarChar,50).Value = Request["sdt"];
                    cm.Parameters.Add("@email", SqlDbType.NVarChar, 50).Value = Request["email"];
                    cm.Parameters.Add("@password", SqlDbType.NVarChar, 50).Value = Request["password"];

                    break;

            }

            switch (action)
            {
                case "add_ThuThu":
                case "edit_ThuThu":
                case "delete_ThuThu":
                    cm.Parameters.Add("@mathuthu", SqlDbType.NVarChar, 200).Value = Request["mathuthu"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_NCC(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_NCC", action);

            switch (action)
            {
                case "add_NCC":
                case "edit_NCC":

                    cm.Parameters.Add("@tenncc", SqlDbType.NVarChar, 100).Value = Request["tenncc"];
                    cm.Parameters.Add("@diachi", SqlDbType.NVarChar,100).Value = Request["diachi"];
                    cm.Parameters.Add("@sdt", SqlDbType.NVarChar,50).Value = Request["sdt"];
                    ;

                    break;

            }

            switch (action)
            {
                case "add_NCC":
                case "edit_NCC":
                case "delete_NCC":
                    cm.Parameters.Add("@mancc", SqlDbType.NVarChar, 100).Value = Request["mancc"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_NXB(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_nhaXB", action);

            switch (action)
            {
                case "add_nhaXB":
                case "edit_nhaXB":

                    cm.Parameters.Add("@tennxb", SqlDbType.NVarChar, 100).Value = Request["tennxb"];
                    cm.Parameters.Add("@diachi", SqlDbType.NVarChar, 100).Value = Request["diachi"];
                    cm.Parameters.Add("@sdt", SqlDbType.NVarChar, 50).Value = Request["sdt"];
                    ;

                    break;

            }

            switch (action)
            {
                case "add_nhaXB":
                case "edit_nhaXB":
                case "delete_nhaXB":
                    cm.Parameters.Add("@manxb", SqlDbType.NVarChar, 100).Value = Request["manxb"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_TacGia(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_TacGia", action);

            switch (action)
            {
                case "add_TacGia":
                case "edit_TacGia":

                    cm.Parameters.Add("@tentacgia", SqlDbType.NVarChar, 100).Value = Request["tentacgia"];
                    break;

            }

            switch (action)
            {
                case "add_TacGia":
                case "edit_TacGia":
                case "delete_TacGia":
                    cm.Parameters.Add("@matacgia", SqlDbType.NVarChar, 100).Value = Request["matacgia"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_MuonSach(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_MuonSach", action);

            switch (action)
            {
                case "add_MuonSach":
                    cm.Parameters.Add("@ngaymuon", SqlDbType.DateTime, 100).Value = Request["ngaymuon"];
                    cm.Parameters.Add("@mathuthu", SqlDbType.NVarChar, 100).Value = Request["mathuthu"];

                    break;
                case "edit_MuonSach":
                    cm.Parameters.Add("@ngaymuon", SqlDbType.DateTime, 100).Value = Request["ngaymuon"];
                    cm.Parameters.Add("@ngaytra", SqlDbType.DateTime, 100).Value = Request["ngaytra"];
                    cm.Parameters.Add("@mathuthu", SqlDbType.NVarChar, 100).Value = Request["mathuthu"];

                    break;

            }

            switch (action)
            {
                case "add_MuonSach":
                case "edit_MuonSach":
                case "delete_MuonSach":
                    cm.Parameters.Add("@masach", SqlDbType.NVarChar, 100).Value = Request["masach"];
                    cm.Parameters.Add("@masv", SqlDbType.NVarChar, 100).Value = Request["masv"];

                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_PhieuNhap(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_PhieuNhap", action);

            switch (action)
            {
                case "add_PhieuNhap":
   
                case "edit_PhieuNhap":
                    cm.Parameters.Add("@mancc", SqlDbType.NVarChar, 100).Value = Request["mancc"];
                    cm.Parameters.Add("@ngaynhap", SqlDbType.DateTime, 100).Value = Request["ngaynhap"];
                   

                    break;

            }

            switch (action)
            {
                case "add_PhieuNhap":
                case "edit_PhieuNhap":
                case "delete_PhieuNhap":
                    cm.Parameters.Add("@maphieunhap", SqlDbType.NVarChar, 100).Value = Request["maphieunhap"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            Response.Write(json);
        }
        void xuly_ChiTietPhieuNhap(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_ChiTietNhap", action);

            switch (action)
            {
                case "add_ChiTietNhap":
                case "edit_ChiTietNhap":
                    cm.Parameters.Add("@madausach", SqlDbType.NVarChar, 100).Value = Request["madausach"];
                    cm.Parameters.Add("@tensach", SqlDbType.NVarChar, 100).Value = Request["tensach"];
                    cm.Parameters.Add("@soluong", SqlDbType.Int, 100).Value = Request["soluong"];
                    cm.Parameters.Add("@dongia", SqlDbType.Money,255).Value = Request["dongia"];


                    break;

            }

            switch (action)
            {
                case "add_ChiTietNhap":
                case "edit_ChiTietNhap":
                case "delete_ChiTietNhap":
                    cm.Parameters.Add("@maphieunhap", SqlDbType.NVarChar, 100).Value = Request["maphieunhap"];
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

                case "list_DauSach":
                case "add_DauSach":
                case "edit_DauSach":
                case "delete_DauSach":
                      xuly_DauSach(action);
                    break;
                case "list_ThuThu":
                case "add_ThuThu":
                case "edit_ThuThu":
                case "delete_ThuThu":
                    xuly_ThuThu(action);
                    break;
                case "list_NCC":
                case "add_NCC":
                case "edit_NCC":
                case "delete_NCC":
                    xuly_NCC(action);
                    break;
                case "list_nhaXB":
                case "add_nhaXB":
                case "edit_nhaXB":
                case "delete_nhaXB":
                    xuly_NXB(action);  
                    break;
                case "list_TacGia":
                case "add_TacGia":
                case "edit_TacGia":
                case "delete_TacGia":
                    xuly_TacGia(action);
                    break;
                case "list_MuonSach":
                case "add_MuonSach":
                case "edit_MuonSach":
                case "delete_MuonSach":
                    xuly_MuonSach(action);
                    break;
                case "list_PhieuNhap":
                case "add_PhieuNhap":
                case "edit_PhieuNhap":
                case "delete_PhieuNhap":
                   xuly_PhieuNhap(action);
                    break;
                case "list_ChiTietNhap":
                case "add_ChiTietNhap":
                case "edit_ChiTietNhap":
                case "delete_ChiTietNhap":
                    xuly_ChiTietPhieuNhap(action);
                    break;
            }
        }
    }
}