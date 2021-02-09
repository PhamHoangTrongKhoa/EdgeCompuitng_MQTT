var json = {
    room: 1,
    temp: {
        temp: 36,
        x: false,
        y: false
    },
    humi: {
        humi: 80,
        x: false,
        y: false
    },
    smoke: {
        smoke: 300,
        x: false,
        y: false
    },
    light: {
        light: 500,
        x: false,
        y: false
    },
    time: new Date()
};

var d = {
    id : "01led01",
    room : 1,
    status : "ON"
};


$("#btn").on('click', function () {
    $.ajax({
        type: "POST",
        url: "/data/add",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(json),
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
});