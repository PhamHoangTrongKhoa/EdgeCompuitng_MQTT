$(".device").on('click', function () {
    var s = $(this).attr('id');
    var id = s.split("_")[1];
    var data = {
        room : $("#room_id").text(),
        id : id
    };
    $.ajax({
        type: "POST",
        url : "http://localhost:8400/room/device/change",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data : JSON.stringify(data),
        success: function (data) {
            console.log(data);
            window.location = 'http://localhost:8400/room/'+$("#room_id")+"/device";
        },
        error: function (e) {
            console.log(e);
        }
    });
});