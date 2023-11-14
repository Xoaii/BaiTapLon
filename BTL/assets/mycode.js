$(document).ready(function () {
    //code js here mẫu của jquery
    giao_dien_animation()
    
    const api = '/api.aspx';
    list_Sach();
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
    $('.tab-item').click(function () {
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
                        else {

                            alert('Thêm Thành Công');
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
                $('.ndsach').html(noidung_ds_Sach_html); //gán html vào thân dialog

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
                        sua_xoa += ` <button class="w3-button w3-round nut-sua-xoa" data-cid="${DauSach.soluong}" data-action="delete_DauSach">Xóa</button>`;
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
                $('.nddausach').html(noidung_ds_DauSach_html); //gán html vào thân dialog

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
    function list_DauSach() {
        cap_nhat_DauSach();
    }
    //bấm head sách
    $('.sach').click(function () {
        //phân biệt các nút bằng data kèm theo
        list_Sach();
    });
    //bấm điều hướng sách
    $('#sach').click(function () {
        //phân biệt các nút bằng data kèm theo
        list_Sach();
    });
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

            $('.ndsach').html(timsach);

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


    $('#dausach').click(function () {
        //phân biệt các nút bằng data kèm theo
      
        list_DauSach();
    });
})



// gà
function giao_dien_animation() {
    chuyenTabCon();
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
function chuyenTabCon() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const items = $$(".list-item");
    const panes = $$(".content-tab");


    //items.forEach((item, index) => {
       
    //    const pane = panes[index];

    //    item.onclick = function () {
    //        $(".list-item.active").classList.remove("active");
    //        $(".content-tab.active").classList.remove("active");

    //        this.classList.add("active");
    //        pane.classList.add("active");
    //    };
    //});
    items.forEach((item, index) => {
        const list_item = items[index];
        const pane = panes[index];
        

        if (list_item && pane) {
            item.onclick = function () {
                const activeListItem = $(".list-item.active");
                const activePane = $(".content-tab.active");

                if (activeListItem) {
                    activeListItem.classList.remove("active");
                }

                if (activePane) {
                    activePane.classList.remove("active");
                }

                list_item.classList.add("active");
                pane.classList.add("active");
            };
        }
    });

}
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

