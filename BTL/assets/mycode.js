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
            title: `Xác nhận xóa công ty ${SinhVien.masv}`,
            content: `Xác nhận xóa nhé????`,
            buttons: {
                YES: {
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
        
        Họ Tên: <input type="text" id="edit-hoten" value="${SinhVien.hoten}"><br> 
        Giới Tính: <input type="text" id="edit-gioitinh" value="${SinhVien.gioitinh}"><br>
        Địa Chỉ: <input type="text" id="edit-diachi" value="${SinhVien.diachi}"><br> 
        Ngày Sinh: <input type="text" id="edit-ngaysinh" value="${SinhVien.ngaysinh}"><br> 
        Khoa: <input type="text" id="edit-khoa" value="${SinhVien.khoa}"><br> 
        Lớp: <input type="text" id="edit-lop" value="${SinhVien.lop}"><br> 
        Email: <input type="text" id="edit-email" value="${SinhVien.email}"><br> 
        Password: <input type="text" id="edit-password" value="${SinhVien.password}"><br> 
    `;

        var dialog_edit = $.confirm({
            title: 'Edit Sinh viên',
            content: content,
            columnClass: 'large',
            buttons: {
                save: {
                    action: function () {
                        var data_gui_di = {
                            action: 'edit_SinhVien',

                            hoten: $('#edit-hoten').val(),
                            gioitinh: $('#edit-gioitinh').val(),
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
                cancel: {
                    text: 'Hủy bỏ'
                }
            }
        });
    }


    //function search_SinhVien() {
    //    var SinhVien;
    //    for (var item of json.data) {
    //        if (item.masv == id) {
    //            SinhVien = item;
    //            break;
    //        }
    //    }
    //    // Assume you have a target element with the id "target-element"
    //    var targetElement = $('#thanhtimkiem');

    //    // Your HTML content with the pre-created input
    //    var content = `
    //Mã sinh viên: <input type="text" id="edit-hoten" value="${SinhVien.masv}"><br> `;

    //    // Set the HTML content of the target element
    //    targetElement.html(content);

    //    // Now the target element contains the pre-created inpu
    //    $.confirm({
    //        action: function () {
    //            var data_gui_di = {
    //                action: 'search_SinhVien',
    //                masv: id, //gửi đi id của sinh viên cần xóa: api, sp sẽ làm phần còn lại
    //            };
    //            console.log(data_gui_di);
    //            $.post(api, data_gui_di, function (data) {
    //                //đợi data là json string text gửi về
    //                var json = JSON.parse(data); //json string text => obj
    //                if (json.ok) { //dùng obj

    //                    cap_nhat_SinhVien();  //vẽ lại kq mới
    //                } else {
    //                    alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
    //                }
    //            });
    //        }

    //    });
    // }


    
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

    function add_SinhVien() {
        //show 1 dialog, các truongf để trông để user nhập
        //sau đó thu nhận các value đã input, có thể check đk trước khi gửi
        //gửi api, thu về json, ok=1 =>cap_nhat_SinhVien
        var content = `html form cho input các trường của 1 cty mới:..<hr>
    Name: <input id="nhap-name"><br>
    Address: <input id="nhap-address">
    `
        var dialog_add = $.confirm({
            title: 'THêm mới 1 Sinh Viên',
            content: content,
            buttons: {
                save: {
                    text: 'Thêm Sinh Vieen vào db',
                    action: function () {
                        //sau đó thu nhận các value đã input, có thể check đk trước khi gửi
                        //gửi api, thu về json, ok=1 =>cap_nhat_SinhVien
                        var data_gui_di = {
                            action: 'add_SinhVien',
                            //name: $('#nhap-name').val(),
                            //address: $('#nhap-address').val(),
                            //lat: 0,
                            //lng: 1,
                            //phone: '555',
                            //zalo: 'ttttttttzzz'
                        }
                        //console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_add.close();
                                cap_nhat_SinhVien();
                            } else {
                                alert(json.msg)
                            }
                        });
                    }//het save
                },
                xxx: {}
            }//button
        });
    }
    function list_SinhVien() {
        
        cap_nhat_SinhVien();
    }
    $('.tab-item').click(function () {
        list_SinhVien();
    });
    $('.fa-search').click(function () {
        search_SinhVien();
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

