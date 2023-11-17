$(document).ready(function () {
    //code js here mẫu của jquery
    giao_dien_animation()
    
    const api = '/api.aspx';
    /*list_Sach();*/
    function delete_SinhVien(id, json) {
        var SinhVien;
        for (var item of json.data) {
            if (item.masv == id) {
                SinhVien = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa sinh viên: ${SinhVien.masv}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_SinhVien',
                            masv: id, //gửi đi id của sinh viên cần xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                cap_nhat_SinhVien();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function edit_SinhVien(id, json) {
        var SinhVien;
        for (var item of json.data) {
            if (item.masv == id) {
                SinhVien = item;
                break;
            }
        }

        var content = `
        
       Họ Tên:    <input class="w3-input" type="text" id="edit-hoten" value="${SinhVien.hoten}"><br> 
       Giới Tính: <input  class="w3-radio" type="radio" id="edit-nam" name="gioitinh" value="Nam" ${SinhVien.gioitinh === 'Nam' ? 'checked' : ''}>
          <label for="edit-nam">Nam</label>
        <input class="w3-radio" type="radio" id="edit-nu" name="gioitinh" value="Nữ" ${SinhVien.gioitinh === 'Nữ' ? 'checked' : ''}>
         <label for="edit-nu">Nữ</label><br>
         <br>
       Địa Chỉ:   <input class="w3-input" type="text" id="edit-diachi" value="${SinhVien.diachi}"><br> 
       Ngày Sinh: <input class="w3-input" type="text" id="edit-ngaysinh" value="${SinhVien.ngaysinh}"><br> 
       Khoa:      <input class="w3-input" type="text" id="edit-khoa" value="${SinhVien.khoa}"><br> 
       Lớp:       <input class="w3-input" type="text" id="edit-lop" value="${SinhVien.lop}"><br> 
       Email:     <input class="w3-input" type="text" id="edit-email" value="${SinhVien.email}"><br> 
       Password:  <input class="w3-input" type="text" id="edit-password" value="${SinhVien.password}"><br> 
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Sinh viên',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_SinhVien',

                            hoten: $('#edit-hoten').val(),
                            gioitinh: $('[name="gioitinh"]:checked').val(),
                            diachi: $('#edit-diachi').val(),
                            ngaysinh: $('#edit-ngaysinh').val(),
                            khoa: $('#edit-khoa').val(),
                            lop: $('#edit-lop').val(),
                            email: $('#edit-email').val(),
                            password: $('#edit-password').val(),
                            masv: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_SinhVien();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }


    function cap_nhat_SinhVien() {
        $.post(api,
            {
                action: 'list_SinhVien'
            },
            function (data) {
                //alert(data)
                var json = JSON.parse(data); //txt trong data -> obj json
                var noidung_ds_SinhVien_html = "";
                if (json.ok) {
                    noidung_ds_SinhVien_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Sinh Viên</th>
                     <th>Họ Tên</th>
                     <th>Giới Tính</th>
                     <th>Địa Chỉ</th>
                     <th>Ngày Sinh</th>
                     <th>Khoa</th>
                     <th>Lớp</th>
                     <th>Email</th>
                     <th>Password</th>
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;
                    for (var SinhVien of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="edit_SinhVien">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="delete_SinhVien">Xóa</button>`;
                        noidung_ds_SinhVien_html += `
                     <tr>
                     <td>${++stt}</td>
                     <td>${SinhVien.masv}</td>
                     <td>${SinhVien.hoten}</td>
                     <td>${SinhVien.gioitinh}</td>
                     <td>${SinhVien.diachi}</td>
                     <td>${SinhVien.ngaysinh}</td>
                     <td>${SinhVien.khoa}</td>
                     <td>${SinhVien.lop}</td>
                     <td>${SinhVien.email}</td>
                     <td>${SinhVien.password}</td>
                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_SinhVien_html += "</tbody></table>";
                } else {

                    noidung_ds_SinhVien_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: 
                $('.sinh-vien').html(noidung_ds_SinhVien_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_SinhVien') { //dùng action
                        //can xac nhan
                        delete_SinhVien(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_SinhVien') {
                        //ko can xac nhan
                        edit_SinhVien(id, json);
                    }
                });
            })
    }

    function list_SinhVien() {

        cap_nhat_SinhVien();
    }
    $('#tab-sinhvien').click(function () {
        list_SinhVien();
    });
    /*  tìm kiếm sinh viên*/
    $('#btn-timsv').click(function () {


        $.post(api, {
            action: 'search_SinhVien',
            masv: $('#timkiemsv').val(),
            boxWidth: '50%',
            useBootstrap: false,
        }, function (data) {
            // Xử lý dữ liệu sau khi nhận được từ API
            console.log(data); // In dữ liệu lấy được từ API vào console
            var json = JSON.parse(data);
            var thongtintimkiem = "";
            // Sử dụng hàm confirm để hiển thị dữ liệu lấy được từ API
            if (json.ok) {
                thongtintimkiem += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Sinh Viên</th>
                     <th>Họ Tên</th>
                     <th>Giới Tính</th>
                     <th>Địa Chỉ</th>
                     <th>Ngày Sinh</th>
                     <th>Khoa</th>
                     <th>Lớp</th>
                     <th>Email</th>
                     <th>Password</th>
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                //duyet json -> noidung_ds_cty_html xịn
                var stt = 0;
                for (var SinhVien of json.data) {
                    //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                    var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="edit_SinhVien">Sửa</button>`;
                    sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="delete_SinhVien">Xóa</button>`;
                    thongtintimkiem += `
                     <tr>
                     <td>${++stt}</td>
                     <td>${SinhVien.masv}</td>
                     <td>${SinhVien.hoten}</td>
                     <td>${SinhVien.gioitinh}</td>
                     <td>${SinhVien.diachi}</td>
                     <td>${SinhVien.ngaysinh}</td>
                     <td>${SinhVien.khoa}</td>
                     <td>${SinhVien.lop}</td>
                     <td>${SinhVien.email}</td>
                     <td>${SinhVien.password}</td>
                   
                     <td>${sua_xoa}</td>
                   </tr>`;
                }

                thongtintimkiem += "</tbody></table>";
            } else {

                thongtintimkiem = "không có dữ liệu";
            }
            //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
            $('.sinh-vien').html(thongtintimkiem); //gán html vào thân dialog
            $('.nut-sua-xoa').click(function () {
                //phân biệt các nút bằng data kèm theo
                var action = $(this).data('action')  //lấy action kèm theo
                var id = $(this).data('cid')  //lấy cid kèm theo
                if (action == 'delete_SinhVien') { //dùng action
                    //can xac nhan
                    delete_SinhVien(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                } else if (action == 'edit_SinhVien') {
                    //ko can xac nhan
                    edit_SinhVien(id, json);
                }
            });


        });
    });
    $('#themsv').click(function () {
        // Đảm bảo bạn đã có dữ liệu SinhVien để hiển thị trong dialog
        var SinhVien = {};

        var content = `
        Mã sinh viên:  <input class="w3-input" type="text" id="nhap-masv" "><br> 
        Họ Tên:    <input class="w3-input" type="text" id="nhap-hoten" "><br> 
        Giới Tính: 
        <input class="w3-radio" type="radio" id="nhap-nam" name="gioitinh" value="Nam">
        <label for="nhap-nam">Nam</label>
        <input class="w3-radio" type="radio" id="nhap-nu" name="gioitinh" value="Nữ">
        <label for="nhap-nu">Nữ</label><br>
        <br>

        Địa Chỉ:   <input class="w3-input" type="text" id="nhap-diachi" ><br> 
        Ngày Sinh: <input class="w3-input" type="text" id="nhap-ngaysinh" ><br> 
        Khoa:      <input class="w3-input" type="text" id="nhap-khoa" ><br> 
        Lớp:       <input class="w3-input" type="text" id="nhap-lop" ><br> 
        Email:     <input class="w3-input" type="text" id="nhap-email"><br> 
        Password:  <input class="w3-input" type="text" id="nhap-password">
    `;

        var dialog_add = $.confirm({
            title: 'Thêm Sinh viên',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        // Đảm bảo giá trị của gioitinh là hoặc 'Nam' hoặc 'Nữ'
                        var gioitinh = $('[name="gioitinh"]:checked').val();
                        if (!gioitinh) {
                            alert('Vui lòng chọn giới tính.');
                            return false; // Ngăn chặn đóng dialog nếu giới tính không hợp lệ
                        }
                       

                        var data_gui_di = {
                            action: 'add_SinhVien',
                            masv: $('#nhap-masv').val(),
                            hoten: $('#nhap-hoten').val(),
                            gioitinh: gioitinh,
                            diachi: $('#nhap-diachi').val(),

                            ngaysinh: $('#nhap-ngaysinh').val(),
                            khoa: $('#nhap-khoa').val(),
                            lop: $('#nhap-lop').val(),
                            email: $('#nhap-email').val(),
                            password: $('#nhap-password').val(),
                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_SinhVien();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    });
    /*end sinh vien*/

    /*  bảng sách*/
    function cap_nhat_Sach() {
        $.post(api,
            {
                action: 'list_Sach'
            },
            function (data) {
                //alert(data)
                var json = JSON.parse(data); //txt trong data -> obj json
                var noidung_ds_Sach_html = "";
                if (json.ok) {
                    noidung_ds_Sach_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Sách</th>
                     <th>Tên Sách</th>
                     <th>Mã NXB</th>
                     <th>Mã Tác Giả</th>
                     <th>Trạng Thái</th>
                     <th>Mã Đầu Sách</th>
                  
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;
                    for (var Sach of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${Sach.masach}" data-action="edit_Sach">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${Sach.masach}" data-action="delete_Sach">Xóa</button>`;
                        noidung_ds_Sach_html += `
                     <tr>
                     <td>${++stt}</td>
                     <td>${Sach.masach}</td>
                     <td>${Sach.tensach}</td>
                     <td>${Sach.manxb}</td>
                     <td>${Sach.matacgia}</td>
                     <td>${Sach.trangthai}</td>
                     <td>${Sach.madausach}</td>

                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_Sach_html += "</tbody></table>";
                } else {

                    noidung_ds_Sach_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('.sach').html(noidung_ds_Sach_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_Sach') { //dùng action
                        //can xac nhan
                        delete_Sach(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_Sach') {
                        //ko can xac nhan
                        edit_Sach(id, json);
                    }
                });
            })
    }
    //thêm sách
    $('#themsach').click(function () {
       
        var content = `
        Mã Sách:  <input class="w3-input" type="text" id="nhap-masach" "><br> 
        Tên Sách:    <input class="w3-input" type="text" id="nhap-tensach" "><br> 
       Mã NXB:   <input class="w3-input" type="text" id="nhap-manxb" ><br> 
        Mã Tác Giả: <input class="w3-input" type="text" id="nhap-matacgia" ><br>
        Trạng Thái:<input class="w3-input" type="text" id="nhap-trangthai" ><br>
        Mã Đầu Sách:       <input class="w3-input" type="text" id="nhap-madausach" ><br> 
        
    `;

        var dialog_add = $.confirm({
            title: 'Thêm Sách',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        

                        var data_gui_di = {
                            action: 'add_Sach',
                            masach: $('#nhap-masach').val(),
                            tensach: $('#nhap-tensach').val(),
                           manxb: $('#nhap-manxb').val(),
                            matacgia: $('#nhap-matacgia').val(),
                            trangthai: $('#nhap-trangthai').val(),
                            madausach: $('#nhap-madausach').val(),
                           
                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_Sach();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });

    });
    
    function list_Sach() {
        cap_nhat_Sach();
    }
   

    function edit_Sach(id, json) {



        var Sach;
        for (var item of json.data) {
            if (item.masach == id) {
                Sach = item;
               
                break;
            }
        }
       
        var content = `
        Tên Sách:   <input class="w3-input" type="text" id="edit-tensach" value="${Sach.tensach}"><br> 
        Mã NXB: <input class="w3-input" type="text" id="edit-manxb" value="${Sach.manxb}"><br> 
        Mã Tác Giả:      <input class="w3-input" type="text" id="edit-matacgia" value="${Sach.matacgia}"><br> 
        Trạng Thái:       <input class="w3-input" type="text" id="edit-trangthai" value="${Sach.trangthai}"><br> 
        Mã Đầu Sách:     <input class="w3-input" type="text" id="edit-madausach" value="${Sach.madausach}"><br> `;

        var dialog_edit = $.confirm({
            title: 'Sửa Sách',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_Sach',
                            tensach: $('#edit-tensach').val(),
                            manxb: $('#edit-manxb').val(),
                            matacgia: $('#edit-matacgia').val(),
                            trangthai: $('#edit-trangthai').val(),
                            madausach: $('#edit-madausach').val(),
                            masach: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_Sach();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }

        
    function delete_Sach(id, json) {
        var Sach;
        for (var item of json.data) {
            if (item.masach == id) {
                Sach = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa sách: ${Sach.masach}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_Sach',
                            masach: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_Sach();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    /* đầu sách*/
    
   
    //bấm head sách
    $('#tab-sach').click(function () {
        //phân biệt các nút bằng data kèm theo
        list_Sach();
    });
    //bấm điều hướng sách
    //$('#sach').click(function () {
    //    //phân biệt các nút bằng data kèm theo
    //    list_Sach();
    //});
    /*tìm sách*/
    $('#btn-timsach').click(function () {
        $.post(api, {
            action: 'search_Sach',
            tensach: $('#timkiemsach').val(),
            boxWidth: '50%',
            useBootstrap: false,
        }, function (data) {
            console.log("Dữ liệu trả về từ server:", data); // Log dữ liệu trả về từ server
            var json = JSON.parse(data);
            var timsach = "";
            // ... (phần xử lý khác)

            if (json.ok) {
                timsach += `<table class="w3-table-all w3-hoverable">
               <thead>
               <tr>
                 <th>STT</th>
                 <th>Mã Sách</th>
                 <th>Tên Sách</th>
                 <th>Mã NXB</th>
                 <th>Mã Tác Giả</th>
                 <th>Trạng Thái</th>
                 <th>Mã Đầu Sách</th>
                 <th>Sửa/xóa</th>
               </tr>
               </thead><tbody>`;
                var stt = 0;
                for (var Sach of json.data) {
                    var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${Sach.masach}" data-action="edit_Sach">Sửa</button>`;
                    sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${Sach.masach}" data-action="delete_Sach">Xóa</button>`;
                    timsach += `
                 <tr>
                 <td>${++stt}</td>
                 <td>${Sach.masach}</td>
                 <td>${Sach.tensach}</td>
                 <td>${Sach.manxb}</td>
                 <td>${Sach.matacgia}</td>
                 <td>${Sach.trangthai}</td>
                 <td>${Sach.madausach}</td>
                 <td>${sua_xoa}</td>
               </tr>`;
                }
                timsach += "</tbody></table>";
            } else {
                console.log("Không có dữ liệu hoặc có lỗi:", json.msg); // Log thông báo lỗi từ server
                timsach = "Không có dữ liệu hoặc có lỗi";
            }

            $('.sach').html(timsach);

            $('.nut-sua-xoa').click(function () {
                var action = $(this).data('action');
                var id = $(this).data('cid');
                if (action == 'delete_Sach') {
                    delete_Sach(id, json);
                } else if (action == 'edit_Sach') {
                    edit_Sach(id, json);
                }
            });
        });
    });

    
    //$('#dausach').click(function () {
    //    //phân biệt các nút bằng data kèm theo

    //    list_DauSach();
    //});
    function cap_nhat_DauSach() {
        $.post(api,
            {
                action: 'list_DauSach'
            },
            function (data) {
                //alert(data)
                var json = JSON.parse(data); //txt trong data -> obj json
                var noidung_ds_DauSach_html = "";
                if (json.ok) {
                    noidung_ds_DauSach_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Đầu Sách</th>
                     <th>Số Lượng</th>

                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var DauSach of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${DauSach.madausach}" data-action="edit_DauSach">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${DauSach.madausach}" data-action="delete_DauSach">Xóa</button>`;
                        noidung_ds_DauSach_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${DauSach.madausach}</td>
                     <td>${DauSach.soluong}</td>

                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_DauSach_html += "</tbody></table>";
                } else {

                    noidung_ds_DauSach_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_dausach').html(noidung_ds_DauSach_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_DauSach') { //dùng action
                        //can xac nhan
                        delete_DauSach(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_DauSach') {
                        //ko can xac nhan
                        edit_DauSach(id, json);
                    }

                });
            })
    }
    function add_Dausach(){
        var content = `
        Mã Đầu  Sách:  <input class="w3-input" type="text" id="nhap-madausach" "><br> 
       
        Số Lượng:       <input class="w3-input" type="text" id="nhap-soluong" ><br> 
        
    `;

        var dialog_add = $.confirm({
            title: 'Thêm Đầu Sách',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {


                        var data_gui_di = {
                            action: 'add_DauSach',
                            
                            madausach: $('#nhap-madausach').val(),
                            soluong: $('#nhap-soluong').val(),

                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_DauSach();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function list_DauSach() {
        var dialog_list_Dausach = $.confirm({
            title: "Danh Sách Đầu Sách",
            content: `<div id="ds_dausach">loading...</div>`,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm Đầu Sách',
                    action: function () {
                        add_Dausach();
                        return false; // ko đóng dialog_list_company
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                //alert('dialog show ok')
                //hoi api: ds cong ty la json nao?
                cap_nhat_DauSach(); //fill html vào thêm dialog tại div#ds_cong_ty
            }
        });
    }
    function edit_DauSach(id, json) {
        var DauSach;
        for (var item of json.data) {
            if (item.madausach == id) {
                DauSach = item;

                break;
            }
        }

        var content = `
        Số Lượng:     <input class="w3-input" type="text" id="edit-soluong" value="${DauSach.soluong}"><br> `;

        var dialog_edit = $.confirm({
            title: 'Sửa Đầu Sách',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_DauSach',
                            soluong: $('#edit-soluong').val(),
                           
                            madausach: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_DauSach();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_DauSach(id, json) {
        var DauSach;
        for (var item of json.data) {
            if (item.madausach == id) {
                DauSach = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa đầu sách: ${DauSach.madausach}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_DauSach',
                            madausach: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_DauSach();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    $('#dausach').click(function () {
        // Thay đổi thành API URL của bạn

        list_DauSach();
      
        
    });
    /*    ---end đầu sách--*/


/*    --Thủ thư--*/
    function cap_nhat_ThuThu() {
        $.post(api,
            {
                action: 'list_ThuThu'
            },
            function (data) {
                //alert(data)
                var json = JSON.parse(data); //txt trong data -> obj json
                var noidung_ds_ThuThu_html = "";
                if (json.ok) {
                    noidung_ds_ThuThu_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Thủ Thư</th>
                     <th>Họ Tên</th>
                     <th>Ngày Sinh</th>
                     <th>Địa Chỉ</th>
                     <th>Giới Tính</th>
                     <th>SDT</th>
                     <th>Email</th>
                     <th>Password</th>


                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var ThuThu of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${ThuThu.mathuthu}" data-action="edit_ThuThu">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${ThuThu.mathuthu}" data-action="delete_ThuThu">Xóa</button>`;
                        noidung_ds_ThuThu_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${ThuThu.mathuthu}</td>
                     <td>${ThuThu.hoten}</td>
                     <td>${ThuThu.ngaysinh}</td>
                     <td>${ThuThu.diachi}</td>
                     <td>${ThuThu.gioitinh}</td>
                     <td>${ThuThu.sdt}</td>
                     <td>${ThuThu.email}</td>
                     <td>${ThuThu.password}</td>

                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_ThuThu_html += "</tbody></table>";
                } else {

                    noidung_ds_ThuThu_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_ThuThu').html(noidung_ds_ThuThu_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_ThuThu') { //dùng action
                        //can xac nhan
                        delete_ThuThu(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_ThuThu') {
                        //ko can xac nhan
                        edit_ThuThu(id, json);
                    }

                });
            })
    }
   
    function edit_ThuThu(id, json) {
        var ThuThu;
        for (var item of json.data) {
            if (item.mathuthu == id) {
                ThuThu = item;

                break;
            }
        }
        var content = `
        
       Họ Tên:    <input class="w3-input" type="text" id="edit-hoten" value="${ThuThu.hoten}"><br> 
       Ngày Sinh: <input class="w3-input" type="text" id="edit-ngaysinh" value="${ThuThu.ngaysinh}"><br> 
       Địa Chỉ:   <input class="w3-input" type="text" id="edit-diachi" value="${ThuThu.diachi}"><br> 
      
        Giới Tính: <input  class="w3-radio" type="radio" id="edit-nam" name="gioitinh" value="Nam" ${ThuThu.gioitinh === 'Nam' ? 'checked' : ''}>
          <label for="edit-nam">Nam</label>
        <input class="w3-radio" type="radio" id="edit-nu" name="gioitinh" value="Nữ" ${ThuThu.gioitinh === 'Nữ' ? 'checked' : ''}>
         <label for="edit-nu">Nữ</label><br>
         <br>
       sdt:      <input class="w3-input" type="text" id="edit-sdt" value="${ThuThu.sdt}"><br> 
      
       Email:     <input class="w3-input" type="text" id="edit-email" value="${ThuThu.email}"><br> 
       Password:  <input class="w3-input" type="text" id="edit-password" value="${ThuThu.password}"><br> 
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Thủ Thư',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_ThuThu',

                            hoten: $('#edit-hoten').val(),
                            ngaysinh: $('#edit-ngaysinh').val(),
                            diachi: $('#edit-diachi').val(),
                            gioitinh: $('[name="gioitinh"]:checked').val(),
                            sdt: $('#edit-sdt').val(),
                            email: $('#edit-email').val(),
                            password: $('#edit-password').val(),
                            mathuthu: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_ThuThu();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_ThuThu(id, json) {
        var ThuThu;
        for (var item of json.data) {
            if (item.mathuthu == id) {
                ThuThu = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa Thủ Thư: ${ThuThu.mathuthu}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_ThuThu',
                            mathuthu: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_ThuThu();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function add_ThuThu() {
        var content = `
        Mã Thủ Thư:  <input class="w3-input" type="text" id="nhap-mathuthu" "><br>
         Họ Tên:  <input class="w3-input" type="text" id="nhap-hoten" "><br> 
          Ngày Sinh:  <input class="w3-input" type="text" id="nhap-ngaysinh" "><br> 
          Địa Chỉ:  <input class="w3-input" type="text" id="nhap-diachi" "><br> 
           Giới Tính: 
        <input class="w3-radio" type="radio" id="nhap-nam" name="gioitinh" value="Nam">
        <label for="nhap-nam">Nam</label>
        <input class="w3-radio" type="radio" id="nhap-nu" name="gioitinh" value="Nữ">
        <label for="nhap-nu">Nữ</label><br>
        <br>
             SDT:  <input class="w3-input" type="text" id="nhap-sdt" "><br> 
              Email:  <input class="w3-input" type="text" id="nhap-email" "><br> 
              Password:  <input class="w3-input" type="text" id="nhap-password" "><br> 
    `;

        var dialog_add = $.confirm({
            title: 'Thêm Thủ Thư',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var gioitinh = $('[name="gioitinh"]:checked').val();
                        if (!gioitinh) {
                            alert('Vui lòng chọn giới tính.');
                            return false; // Ngăn chặn đóng dialog nếu giới tính không hợp lệ
                        }
                        

                        var data_gui_di = {
                            action: 'add_ThuThu',

                            mathuthu: $('#nhap-mathuthu').val(),
                            hoten: $('#nhap-hoten').val(),
                            ngaysinh: $('#nhap-ngaysinh').val(),
                            diachi: $('#nhap-diachi').val(),
                            gioitinh:gioitinh,
                            sdt: $('#nhap-sdt').val(),
                            email: $('#nhap-email').val(),
                            password:$('#nhap-password').val(),

                        };


                        console.log(data_gui_di);
                        
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_ThuThu();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function list_ThuThu() {
        var dialog_list_ThuThu = $.confirm({
            title: "Danh Sách Thủ Thư",
            content: `<div id="ds_ThuThu">loading...</div>`,
            columnClass: 'large',
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm Thủ Thư',
                    action: function () {
                        add_ThuThu();
                        return false; // ko đóng dialog_list_company
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                //alert('dialog show ok')
                //hoi api: ds cong ty la json nao?
                cap_nhat_ThuThu(); //fill html vào thêm dialog tại div#ds_thuthu
            }
        });
    }


    $('#thuthu').click(function () {
        
        list_ThuThu();

    });
    /* --end thủ thư--*/

    /* -----nhà cung cấp -----*/
    function cap_nhat_NCC() {
        $.post(api,
            {
                action: 'list_NCC'
            },
            function (data) {
               
                var json = JSON.parse(data); //txt trong data -> obj json
                console.log(json)
                var noidung_ds_NCC_html = "";

                if (json.ok) {
                    noidung_ds_NCC_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Nhà Cung Cấp</th>
                     <th>Tên Nhà Cung Cấp</th>
                     <th>Địa Chỉ</th>
                     <th>SDT</th>
                     
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var NCC of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${NCC.mancc}" data-action="edit_NCC">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${NCC.mancc}" data-action="delete_NCC">Xóa</button>`;
                        noidung_ds_NCC_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${NCC.mancc}</td>
                     <td>${NCC.tenncc}</td>
                     <td>${NCC.diachi}</td>
                     <td>${NCC.sdt}</td>
                     
                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_NCC_html += "</tbody></table>";
                } else {

                    noidung_ds_NCC_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_NCC').html(noidung_ds_NCC_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_NCC') { //dùng action
                        //can xac nhan
                        delete_NCC(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_NCC') {
                        //ko can xac nhan
                        edit_NCC(id, json);
                    }

                });
            })
    }
    function add_NCC() {
        var content = `
        Mã Nhà Cung Cấp:  <input class="w3-input" type="text" id="nhap-mancc" "><br>
        Tên Nhà Cung Cấp:  <input class="w3-input" type="text" id="nhap-tenncc" "><br> 
          Địa Chỉ:  <input class="w3-input" type="text" id="nhap-diachi" "><br> 
           SDT:  <input class="w3-input" type="text" id="nhap-sdt" "><br>
                      `;
        var dialog_add = $.confirm({
            title: 'Thêm Nhà Cung Cấp',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {

                        var data_gui_di = {
                            action: 'add_NCC',

                            mancc: $('#nhap-mancc').val(),
                            tenncc: $('#nhap-tenncc').val(),  
                            diachi: $('#nhap-diachi').val(),

                            sdt: $('#nhap-sdt').val(),

                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_NCC();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function edit_NCC(id, json) {
        var ncc;
        for (var item of json.data) {
            if (item.mancc == id) {
                ncc = item;

                break;
            }
        }
        var content = `
        
      Tên Nhà Cung Cấp:    <input class="w3-input" type="text" id="edit-tenncc" value="${ncc.tenncc}"><br> 

       Địa Chỉ:   <input class="w3-input" type="text" id="edit-diachi" value="${ncc.diachi}"><br> 

       sdt:      <input class="w3-input" type="text" id="edit-sdt" value="${ncc.sdt}"><br> 
     
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Nhà cung cấp',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_NCC',
                            tenncc: $('#edit-tenncc').val(),
                            diachi: $('#edit-diachi').val(),
                            sdt: $('#edit-sdt').val(),
                            mancc: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_NCC();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_NCC(id, json) {
        var ncc;
        for (var item of json.data) {
            if (item.mancc == id) {
                ncc = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa Thủ Thư: ${ncc.mancc}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_NCC',
                            mancc: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_NCC();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function list_NCC() {
        var dialog_list_NCC = $.confirm({
            title: "Danh Sách Nhà Cung Cấp",
            content: `<div id="ds_NCC">loading...</div>`,
            columnClass: 'large',
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm Nhà cung cấp',
                    action: function () {
                        add_NCC();
                        return false; // ko đóng dialog_list_company
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                //alert('dialog show ok')
                //hoi api: ds cong ty la json nao?
                cap_nhat_NCC(); //fill html vào thêm dialog tại div#ds_thuthu
            }
        });
    }
    $('#ncc').click(function () {
        list_NCC();
        

    });
    /*----end nhà cung cấp----*/
    /*----Nhà xuất bản----*/
    function cap_nhat_NXB() {
        $.post(api,
            {
                action: 'list_nhaXB'
            },
            function (data) {

                var json = JSON.parse(data); //txt trong data -> obj json
                console.log(json)
                var noidung_ds_NXB_html = "";

                if (json.ok) {
                    noidung_ds_NXB_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Nhà Nhà Xuất Bản</th>
                     <th>Tên Nhà Xuất Bản</th>
                     <th>Địa Chỉ</th>
                     <th>SDT</th>
                     
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var NXB of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${NXB.manxb}" data-action="edit_NXB">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${NXB.manxb}" data-action="delete_NXB">Xóa</button>`;
                        noidung_ds_NXB_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${NXB.manxb}</td>
                     <td>${NXB.tennxb}</td>
                     <td>${NXB.diachi}</td>
                     <td>${NXB.sdt}</td>

                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_NXB_html += "</tbody></table>";
                } else {

                    noidung_ds_NXB_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_NXB').html(noidung_ds_NXB_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_NXB') { //dùng action
                        //can xac nhan
                        delete_NXB(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_NXB') {
                        //ko can xac nhan
                        edit_NXB(id, json);
                    }

                });
            })
    }
    function add_NXB() {
        var content = `
        Mã Nhà Xuất Bản:  <input class="w3-input" type="text" id="nhap-manxb" "><br>
        Tên Nhà Xuất Bản:  <input class="w3-input" type="text" id="nhap-tennxb" "><br> 
          Địa Chỉ:  <input class="w3-input" type="text" id="nhap-diachi" "><br> 
           SDT:  <input class="w3-input" type="text" id="nhap-sdt" "><br>
                      `;
        var dialog_add = $.confirm({
            title: 'Thêm Nhà Xuất Bản',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {

                        var data_gui_di = {
                            action: 'add_nhaXB',

                            manxb: $('#nhap-manxb').val(),
                            tennxb: $('#nhap-tennxb').val(),
                            diachi: $('#nhap-diachi').val(),
                            sdt: $('#nhap-sdt').val(),

                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_NXB();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function edit_NXB(id, json) {
        var nxb;
        for (var item of json.data) {
            if (item.manxb == id) {
                nxb = item;

                break;
            }
        }
        var content = `
        
      Tên Nhà Xuất bản:    <input class="w3-input" type="text" id="edit-tennxb" value="${nxb.tennxb}"><br> 

       Địa Chỉ:   <input class="w3-input" type="text" id="edit-diachi" value="${nxb.diachi}"><br> 

       sdt:      <input class="w3-input" type="text" id="edit-sdt" value="${nxb.sdt}"><br> 
     
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Nhà cung cấp',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_nhaXB',
                            tennxb: $('#edit-tennxb').val(),
                            diachi: $('#edit-diachi').val(),
                            sdt: $('#edit-sdt').val(),
                            manxb: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_NXB();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_NXB(id, json) {
        var nxb;
        for (var item of json.data) {
            if (item.manxb == id) {
                nxb = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa Nhà Xuất Bản: ${nxb.manxb}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_nhaXB',
                            manxb: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_NXB();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function list_NXB() {
        var dialog_list_NCC = $.confirm({
            title: "Danh Sách Nhà Xuất Bản",
            content: `<div id="ds_NXB">loading...</div>`,
            columnClass: 'large',
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm Nhà Xuất Bản',
                    action: function () {
                        add_NXB();
                        return false; // ko đóng dialog_list_company
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                //alert('dialog show ok')
                //hoi api: ds cong ty la json nao?
                cap_nhat_NXB(); //fill html vào thêm dialog tại div#ds_thuthu
            }
        });
    }
    $('#nxb').click(function () {
        list_NXB();


    });
    /*----end nhà xuất bản----*/
    /*----Tác Giả----*/
    function cap_nhat_TacGia() {
        $.post(api,
            {
                action: 'list_TacGia'
            },
            function (data) {

                var json = JSON.parse(data); //txt trong data -> obj json
                console.log(json)
                var noidung_ds_TG_html = "";

                if (json.ok) {
                    noidung_ds_TG_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Tác Giả</th>
                     <th>Tên Tác Giả</th>
                     
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var TG of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${TG.matacgia}" data-action="edit_TacGia">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${TG.matacgia}" data-action="delete_TacGia">Xóa</button>`;
                        noidung_ds_TG_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${TG.matacgia}</td>
                     <td>${TG.tentacgia}</td>
                     
                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_TG_html += "</tbody></table>";
                } else {

                    noidung_ds_TG_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_TG').html(noidung_ds_TG_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_TacGia') { //dùng action
                        //can xac nhan
                        delete_TacGia(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_TacGia') {
                        //ko can xac nhan
                        edit_TacGia(id, json);
                    }

                });
            })
    }
    function add_TacGia() {
        var content = `
        Mã Tác Giả:  <input class="w3-input" type="text" id="nhap-matacgia" "><br>
        Tên Tác Giả:  <input class="w3-input" type="text" id="nhap-tentacgia" "><br> 
          
                      `;
        var dialog_add = $.confirm({
            title: 'Thêm Tác Giả',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {

                        var data_gui_di = {
                            action: 'add_TacGia',

                            matacgia: $('#nhap-matacgia').val(),
                            tentacgia: $('#nhap-tentacgia').val(),
                           

                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_TacGia();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function edit_TacGia(id, json) {
        var TG;
        for (var item of json.data) {
            if (item.matacgia == id) {
                TG = item;

                break;
            }
        }
        var content = `
        
      Tên Nhà Xuất bản:    <input class="w3-input" type="text" id="edit-tentacgia" value="${TG.tentacgia}"><br> 
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Tác Giả',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_TacGia',
                            tentacgia: $('#edit-tentacgia').val(),
                           
                            matacgia: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_TacGia();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_TacGia(id, json) {
        var TG;
        for (var item of json.data) {
            if (item.matacgia == id) {
                TG = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa Tác Giả: ${TG.matacgia}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_TacGia',
                            matacgia: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_TacGia();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function list_TacGia() {
        var dialog_list_NCC = $.confirm({
            title: "Danh Sách Tác Giả",
            content: `<div id="ds_TG">loading...</div>`,
            columnClass: 'large',
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm tác Giả',
                    action: function () {
                        add_TacGia();
                        return false; // ko đóng dialog_list_company
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                //alert('dialog show ok')
                //hoi api: ds cong ty la json nao?
                cap_nhat_TacGia(); //fill html vào thêm dialog tại div#ds_thuthu
            }
        });
    }
    $('#tacgia').click(function () {
        list_TacGia();

    });
    /*----end Tác Giả---*/
    /*----Mượn Sách----*/
    function cap_nhat_MuonSach() {
        $.post(api,
            {
                action: 'list_MuonSach'
            },
            function (data) {
                alert(data)
                var json = JSON.parse(data); //txt trong data -> obj json
                console.log(json)
                var noidung_ds_MuonSach_html = "";

                if (json.ok) {
                    noidung_ds_MuonSach_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Sách</th>
                     <th>Mã Sinh Viên</th>
                     <th>Ngày Mượn</th>
                     <th>Ngày Trả</th>
                     <th>Mã Thủ Thư</th>
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var MuonSach of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${MuonSach.masach}"  data-action="edit_MuonSach">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${MuonSach.masach}" data-action="delete_MuonSach">Xóa</button>`;
                        noidung_ds_MuonSach_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${MuonSach.masach}</td>
                     <td>${MuonSach.masv}</td>
                      <td>${MuonSach.ngaymuon}</td>
                       <td>${MuonSach.ngaytra}</td>
                        <td>${MuonSach.mathuthu}</td>
                     
                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_MuonSach_html += "</tbody></table>";
                } else {

                    noidung_ds_MuonSach_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_MuonSach').html(noidung_ds_MuonSach_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_MuonSach') { //dùng action
                        //can xac nhan
                        delete_MuonSach(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_MuonSach') {
                        //ko can xac nhan
                        edit_MuonSach(id, json);
                    }

                });
            })
    }
    function add_MuonSach() {
        var content = `
        Mã Sách:  <input class="w3-input" type="text" id="nhap-masach" "><br>
        Mã Sinh Viên:  <input class="w3-input" type="text" id="nhap-masv" "><br> 
        ngày Mượn:  <input class="w3-input" type="text" id="nhap-ngaymuon" "><br>
          
           Mã Thủ Thư:  <input class="w3-input" type="text" id="nhap-mathuthu" "><br>
          
                      `;
        var dialog_add = $.confirm({
            title: 'Thêm Mượn Sách',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {

                        var data_gui_di = {
                            action: 'add_MuonSach',

                            masach: $('#nhap-masach').val(),
                            masv: $('#nhap-masv').val(),
                            ngaymuon: $('#nhap-ngaymuon').val(),
                            /*ngaytra: $('#nhap-ngaytra').val(),*/
                            mathuthu: $('#nhap-mathuthu').val(),


                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_MuonSach();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function edit_MuonSach(id, json) {
        var MuonSach;
        for (var item of json.data) {
            if (item.masach == id) {
                MuonSach= item;

                break;
            }
        }
        var content = `
        
      Mã Sinh Viên:    <input class="w3-input" type="text" id="edit-masv" value="${MuonSach.masv}"><br> 
      Ngày Mượn :    <input class="w3-input" type="text" id="edit-ngaymuon" value="${MuonSach.ngaymuon}"><br> 
      Ngày Trả:    <input class="w3-input" type="text" id="edit-ngaytra" value="${MuonSach.ngaytra}"><br> 
      Mã Thủ Thư:    <input class="w3-input" type="text" id="edit-mathuthu" value="${MuonSach.mathuthu}"><br> 
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Mượn Sách',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_MuonSach',
                            masv: $('#edit-masv').val(),
                            ngaymuon: $('#edit-ngaymuon').val(),
                            ngaytra: $('#edit-ngaytra').val(),
                            mathuthu: $('#edit-mathuthu').val(),


                            masach: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_MuonSach();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_MuonSach(id, json) {
        var MuonSach;
        for (var item of json.data) {
            if (item.masach == id) {
                MuonSach = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xóa Sách: ${MuonSach.masach}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_MuonSach',
                            masach: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_MuonSach();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function list_MuonSach() {
        var dialog_list_NCC = $.confirm({
            title: "Danh Sách mượn sách",
            content: `<div id="ds_MuonSach">loading...</div>`,
            columnClass: 'large',
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm Mượn Sách',
                    action: function () {
                        add_MuonSach();
                        return false; // ko đóng dialog
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                
                //hoi api: ds cong ty la json nao?
                cap_nhat_MuonSach(); //fill html vào thêm dialog tại div#ds_thuthu
            }
        });
    }
    $('#muonsach').click(function () {
        list_MuonSach();

    });
    /*---- END Mượn Sách----*/
    /*  ----Phiếu Nhập----*/
    function cap_nhat_PhieuNhap() {
        $.post(api,
            {
                action: 'list_PhieuNhap'
            },
            function (data) {
                alert(data)
                var json = JSON.parse(data); //txt trong data -> obj json
                console.log(json)
                var noidung_ds_PhieuNhap_html = "";

                if (json.ok) {
                    noidung_ds_PhieuNhap_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Phiếu Nhập</th>
                     <th>Nhà Cung Cấp</th>
                    <th>Ngày Tháng</th>
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var PhieuNhap of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${PhieuNhap.maphieunhap}"  data-action="edit_PhieuNhap">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${PhieuNhap.maphieunhap}" data-action="delete_PhieuNhap">Xóa</button>`;
                       
                        noidung_ds_PhieuNhap_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${PhieuNhap.maphieunhap}</td>
                     <td>${PhieuNhap.mancc}</td>
                      <td>${PhieuNhap.ngaynhap}</td>
 
                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_PhieuNhap_html += "</tbody></table>";
                } else {

                    noidung_ds_PhieuNhap_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_phieunhap').html(noidung_ds_PhieuNhap_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_PhieuNhap') { //dùng action
                        //can xac nhan
                        delete_PhieuNhap(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_PhieuNhap') {
                        //ko can xac nhan
                        edit_PhieuNhap(id, json);
                    }
                    else if (action == 'more_PhieuNhap') {
                        //ko can xac nhan
                        list_CTPhieuNhap(id,json);
                    }

                });
            })
    }
    function add_PhieuNhap() {
        var content = `
        Mã Phiếu Nhập:  <input class="w3-input" type="text" id="nhap-maphieunhap" "><br>
        Mã Nhà Cung cấp:  <input class="w3-input" type="text" id="nhap-mancc" "><br> 
         Ngày Nhập:  <input class="w3-input" type="text" id="nhap-ngaynhap" "><br>
     
                      `;
        var dialog_add = $.confirm({
            title: 'Thêm Phiếu Nhập',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {

                        var data_gui_di = {
                            action: 'add_PhieuNhap',

                            maphieunhap: $('#nhap-maphieunhap').val(),
                            mancc: $('#nhap-mancc').val(),
                            ngaynhap: $('#nhap-ngaynhap').val(),
                           


                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_PhieuNhap();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function edit_PhieuNhap(id, json) {
        var PhieuNhap;
        for (var item of json.data) {
            if (item.maphieunhap == id) {
                PhieuNhap = item;

                break;
            }
        }
        var content = `
        
      Mã Phiếu Nhập:    <input class="w3-input" type="text" id="edit-maphieunhap" value="${PhieuNhap.maphieunhap}"><br> 
      Mã Nhà Cung Cấp :    <input class="w3-input" type="text" id="edit-mancc" value="${PhieuNhap.mancc}"><br> 
      Ngày Nhập:    <input class="w3-input" type="text" id="edit-ngaynhap" value="${PhieuNhap.ngaynhap}"><br> 
      
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Phiếu Nhập',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_PhieuNhap',
                            mancc: $('#edit-mancc').val(),
                            ngaynhap: $('#edit-ngaynhap').val(),
                            maphieunhap: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_PhieuNhap(id,json);
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_PhieuNhap(id, json) {
        var PhieuNhap;
        for (var item of json.data) {
            if (item.maphieunhap == id) {
                PhieuNhap = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa phiếu nhập: ${PhieuNhap.maphieunhap}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_PhieuNhap',
                            maphieunhap: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_PhieuNhap();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function list_PhieuNhap() {
        var dialog_list_NCC = $.confirm({
            title: "Danh Sách Phiếu Nhập",
            content: `<div id="ds_phieunhap">loading...</div>`,
            columnClass: 'large',
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm Phiếu Nhập',
                    action: function () {
                        add_PhieuNhap();
                        return false; // ko đóng dialog
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                //alert('dialog show ok')
                //hoi api: ds cong ty la json nao?
                cap_nhat_PhieuNhap(); //fill html vào thêm dialog tại 
            }
        });
    }
    $('#phieunhap').click(function () {
        list_PhieuNhap();

    });
    /* ----end Phiếu Nhập----*/
    /*----Chi tiết phiếu nhập----*/

    function cap_nhat_ChiTietPhieuNhap() {
        $.post(api,
            {
                action: 'list_ChiTietNhap'
            },
            function (data) {
                alert(data)
                var json = JSON.parse(data); //txt trong data -> obj json
                console.log(json)
                var noidung_ds_ChiTietNhap_html = "";

                if (json.ok) {
                    noidung_ds_ChiTietNhap_html += `<table class="w3-table-all w3-hoverable">
                   <thead>
                   <tr>
                     <th>STT</th>
                     <th>Mã Phiếu Nhập</th>
                     <th>Mã Đầu Sách</th>
                     <th>Tên Sách</th>
                     <th>Số Lượng</th>
                     <th>Đơn Giá</th
                    
                     <th>Sửa/xóa</th>
                   </tr>
                   </thead><tbody>`;
                    //duyet json -> noidung_ds_cty_html xịn
                    var stt = 0;

                    for (var CTPhieuNhap of json.data) {
                        //sua_xoa là 2 nút: mỗi nút kèm theo data để sau này phân loại: là data-cid  và data-action
                        var sua_xoa = `<button class="w3-button w3-round nut-sua-xoa" data-cid="${CTPhieuNhap.maphieunhap}"  data-action="edit_ChiTietNhap">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${CTPhieuNhap.maphieunhap}" data-action="delete_ChiTietNhap">Xóa</button>`;
                        
                        noidung_ds_ChiTietNhap_html += `
                     <tr>
                     <td>${++stt}</td>
                  
                     <td>${CTPhieuNhap.maphieunhap}</td>
                     <td>${CTPhieuNhap.madausach}</td>
                      <td>${CTPhieuNhap.tensach}</td>
                      <td>${CTPhieuNhap.soluong}</td>
                      <td>${CTPhieuNhap.dongia}</td>
 
                     <td>${sua_xoa}</td>
                   </tr>`;
                    }

                    noidung_ds_ChiTietNhap_html += "</tbody></table>";
                } else {

                    noidung_ds_ChiTietNhap_html = "không có dữ liệu";
                }
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('#ds_chitietphieunhap').html(noidung_ds_ChiTietNhap_html); //gán html vào thân dialog

                //trong html vừa đua vào có nhiều nút sửa và xóa, đều có class nut-sua-xoa
                //selector này tóm đc mọi nút
                $('.nut-sua-xoa').click(function () {
                    //phân biệt các nút bằng data kèm theo
                    var action = $(this).data('action')  //lấy action kèm theo
                    var id = $(this).data('cid')  //lấy cid kèm theo
                    if (action == 'delete_ChiTietNhap') { //dùng action
                        //can xac nhan
                        delete_ChiTietPhieuNhap(id, json); //dùng id vào đây để hàm này xử, cho khỏi rối code
                    } else if (action == 'edit_ChiTietNhap') {
                        //ko can xac nhan
                        edit_ChiTietPhieuNhap(id, json);
                    }
                    

                });
            })
    }
    function add_ChiTietPhieuNhap() {
        var content = `
        Mã Phiếu Nhập:  <input class="w3-input" type="text" id="nhap-maphieunhap" "><br>
        Mã Đầu Sách:  <input class="w3-input" type="text" id="nhap-madausach" "><br> 
        Tên Sách:  <input class="w3-input" type="text" id="nhap-tensach" "><br>
        Số Lượng:  <input class="w3-input" type="text" id="nhap-soluong" "><br>
        Đơn Giá:  <input class="w3-input" type="text" id="nhap-dongia" "><br>
     
                      `;
        var dialog_add = $.confirm({
            title: 'Thêm Sách Vào Phiếu',
            content: content,
            columnClass: 'large',
            boxWidth: '50%',
            useBootstrap: false,

            type: 'green',
            buttons: {
                save: {
                    btnClass: 'btn-green',
                    action: function () {

                        var data_gui_di = {
                            action: 'add_ChiTietNhap',

                            maphieunhap: $('#nhap-maphieunhap').val(),
                            madausach: $('#nhap-madausach').val(),
                            tensach: $('#nhap-tensach').val(),
                            soluong: $('#nhap-soluong').val(), 
                            dongia: $('#nhap-dongia').val(), 

                        };


                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_ChiTietPhieuNhap();
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function edit_ChiTietPhieuNhap(id, json) {
        var CTPhieuNhap;
        for (var item of json.data) {
            if (item.maphieunhap == id) {
                CTPhieuNhap = item;

                break;
            }
        }
        var content = `
        
      Mã Phiếu Nhập:    <input class="w3-input" type="text" id="edit-maphieunhap" value="${CTPhieuNhap.maphieunhap}"><br> 
      Mã Đầu Sách :    <input class="w3-input" type="text" id="edit-madausach" value="${CTPhieuNhap.madausach}"><br> 
      Tên Sách :    <input class="w3-input" type="text" id="edit-tensach" value="${CTPhieuNhap.tensach}"><br> 
      Số Lượng :    <input class="w3-input" type="text" id="edit-soluong" value="${CTPhieuNhap.soluong}"><br>
      Đơn Giá :    <input class="w3-input" type="text" id="edit-dongia" value="${CTPhieuNhap.dongia}"><br>
      
    `;

        var dialog_edit = $.confirm({
            title: 'Edit  Chi Tiết Phiếu Nhập',
            content: content,
            /* columnClass: 'large',*/
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',

            buttons: {

                save: {
                    btnClass: 'btn-green',
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_ChiTietNhap',
                            madausach: $('#edit-madausach').val(),
                            tensach: $('#edit-tensach').val(), 
                            soluong: $('#edit-soluong').val(),
                            dongia: $('#edit-dongia').val(),
                            maphieunhap: id,
                        };

                        console.log(data_gui_di);

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                cap_nhat_ChiTietPhieuNhap(id, json);
                            } else {
                                alert(json.msg);
                            }
                        });
                    }
                },
                close: function () {
                }
            }
        });
    }
    function delete_ChiTietPhieuNhap(id, json) {
        var CTPhieuNhap;
        for (var item of json.data) {
            if (item.maphieunhap == id) {
                CTPhieuNhap = item;
                break;
            }
        }
        //xác nhận trước khi xóa
        var dialog_xoa = $.confirm({
            title: `Xác nhận xóa Chi Tiết phiếu nhập: ${CTPhieuNhap.maphieunhap}`,
            content: `Xác nhận xóa?`,
            boxWidth: '50%',
            useBootstrap: false,
            type: 'red',
            buttons: {

                YES: {
                    btnClass: 'btn-red',
                    action: function () {
                        var data_gui_di = {
                            action: 'delete_ChiTietNhap',
                            maphieunhap: id, //gửi đi id của sách xóa: api, sp sẽ làm phần còn lại
                        }
                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoa.close();
                                alert('Xóa thành công!')
                                cap_nhat_ChiTietNhap();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    }
    function list_ChiTietPhieuNhap() {
        var dialog_list_CTN = $.confirm({
            title: "Danh Sách Chi Tiết Phiếu Nhập",
            content: `<div id="ds_chitietphieunhap">loading...</div>`,
            columnClass: 'large',
            buttons: {
                add: {
                    btnClass: 'btn-green',
                    text: 'Thêm Chi Tiết Phiếu Nhập',
                    action: function () {
                        add_ChiTietPhieuNhap();
                        return false; // ko đóng dialog
                    }
                },
                close: {

                }
            },
            onContentReady: function () {
                //alert('dialog show ok')
                //hoi api: ds cong ty la json nao?
                cap_nhat_ChiTietPhieuNhap(); //fill html vào thêm dialog tại 
            }
        });
    }
    $('#ctphieunhap').click(function () {
        //phân biệt các nút bằng data kèm theo
        list_ChiTietPhieuNhap();
        


    });
    /*----end CHi tiết phiếu nhập----*/
    $('#dangxuat').click(function () {
        //phân biệt các nút bằng data kèm theo
        alert('iem chưa làm được phần đăng nhập ạ huhu :(');



    });

})



// gà
function giao_dien_animation() {
    //chuyenTabCon();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = $$(".tab-item");
    const panes = $$(".tab-pane");
    const panes_list = $$(".list-pane");
    /*const items = $$(".list-item");*/
    

    tabs.forEach((tab, index) => {
        const pane = panes[index];
        const list_pane = panes_list[index];
        /*const list_item = items[index];*/

        tab.onclick = function () {
            $(".tab-item.active").classList.remove("active");
            $(".tab-pane.active").classList.remove("active");
            $(".list-pane.active").classList.remove("active");
           /* $(".list-item.active").classList.remove("active");*/

            this.classList.add("active");
            pane.classList.add("active");
            list_pane.classList.add("active");
           /* list_item.classList.add("active");*/

        };
    });

}
//function chuyenTabCon() {
//       const $ = document.querySelector.bind(document);
//    const $$ = document.querySelectorAll.bind(document);

//    const items = $$(".list-item");
//    const panes = $$(".content-tab");

//    items.forEach((item, index) => {
//        item.onclick= function () {
//            // Xóa class "active" khỏi tất cả các phần tử
//            items.forEach((item) => {
//                item.classList.remove("active");
//            });

//            panes.forEach((pane) => {
//                pane.classList.remove("active");
//            });
//            const pane = panes[index];
//            // Thêm class "active" cho phần tử được click
//            this.classList.add("active");
//            pane.classList.add("active");
//        }
//    });
//}


//function chuyenTabCon() {
//    const $ = document.querySelector.bind(document);
//    const $$ = document.querySelectorAll.bind(document);

//    const items = $$(".list-item");
//    const panes = $$(".content-tab");

//    items.forEach((item, index) => {
//        const list_item = items[index];
//        const pane = panes[index];

//        if (list_item && pane) {
//            item.onclick = function () {
//                const activeListItem = $(".list-item.active");
//                const activePane = $(".content-tab.active");

//                if (activeListItem) {
//                    activeListItem.classList.remove("active");
//                }

//                if (activePane) {
//                    activePane.classList.remove("active");
//                }

//                list_item.classList.add("active");
//                pane.classList.add("active");
//            };
//        }
//    });
//}

// main.js
//CHẠY SLIDE
$(document).ready(function () {
    var myIndex = 0;
    carousel();

    function carousel() {
        var x = $(".mySlides");
        x.hide();

        myIndex++;
        if (myIndex > x.length) {
            myIndex = 1;
        }
        x.eq(myIndex - 1).show();
        setTimeout(carousel, 2000); // Change image every 2 seconds
    }
});


// Gọi hàm khi trang web được tải

