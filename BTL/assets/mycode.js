$(document).ready(function () {
    const api = 'api.aspx';
    


   
});
function openTabs(evt, openTabs) {
    var i, tabcontent, tablinks;

    // Ẩn tất cả các tabcontent
    $(".tabcontent").hide();

    // Loại bỏ lớp 'active' khỏi tất cả các tablinks
    $(".tablinks").removeClass("active");

    // Hiển thị tabcontent có id tương ứng
    $("#" + openTabs).show();

    // Thêm lớp 'active' vào tablink được chọn
    $(evt.currentTarget).addClass("active");
}