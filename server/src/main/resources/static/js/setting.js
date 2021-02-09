var id = $("#rs_id").text();
$(document).ready(function () {
    getSD(id);
});

$("#send").on('click', function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:8400/room/setting/change",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            id : $("#rs_id").text(),
            t : $("#rs_t").val(),
            h : $("#rs_h").val(),
            l : $("#rs_l").val(),
            s : $("#rs_s").val()
        }),
        success: function () {
            $("#success-modal").modal('toggle');
        },
        error: function (err) {
            console.log(err);
        }
    });
});

function getSD(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8400/room/sd?id="+id,
        success: function (data) {
            var res = JSON.parse(data);
            $("#rs_t").val(res.temp);
            $("#rs_h").val(res.humi);
            $("#rs_s").val(res.smoke);
            $("#rs_l").val(res.light);
        },
        error: function (err) {
            console.log(err);
        }
    })
}