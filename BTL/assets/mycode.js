$(document).ready(function () {
    //code js here mẫu của jquery
    giao_dien_animation()
    const api = '/api.aspx';
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
            columnClass: 'large',
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
                        var sua_xoa = `<button class="w3-button w3-round-xlarge nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="edit_SinhVien">Sửa</button>`;
                        sua_xoa += ` <button class="w3-button w3-round-xlarge nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="delete_SinhVien">Xóa</button>`;
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
                //đưa html vừa nối nối vào chỗ định trước: #ds_cong_ty
                $('.ky-tuc-xa').html(noidung_ds_SinhVien_html); //gán html vào thân dialog

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
    $('.fa-search').click(function () {
       

        $.post(api, {
            action: 'search_SinhVien',
            masv: $('#thanhtimkiem').val(),
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
                    var sua_xoa = `<button class="w3-button w3-round-xlarge nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="edit_SinhVien">Sửa</button>`;
                    sua_xoa += ` <button class="w3-button w3-round-xlarge nut-sua-xoa" data-cid="${SinhVien.masv}" data-action="delete_SinhVien">Xóa</button>`;
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
            $('.ky-tuc-xa').html(thongtintimkiem); //gán html vào thân dialog
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

        var dialog_edit = $.confirm({
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
    });


        
    
});



// gà
function giao_dien_animation() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = $$(".tab-item");
    const panes = $$(".tab-pane");
    const panes_list = $$(".list-pane");

    tabs.forEach((tab, index) => {
        const pane = panes[index];
        const list_pane = panes_list[index];

        tab.onclick = function () {
            $(".tab-item.active").classList.remove("active");
            $(".tab-pane.active").classList.remove("active");
            $(".list-pane.active").classList.remove("active");

            this.classList.add("active");
            pane.classList.add("active");
            list_pane.classList.add("active");
        };
    });
}

