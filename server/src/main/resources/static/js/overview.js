var ov1 = $("#overview1");
var ov2 = $("#overview2");
var house_id = $("#house_id").text();
var m = 20;
var n = 20;
var chart1 = new Chart(ov1,{
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Temperature",
            borderColor: "#ff0000",
            borderWidth: 2,
            fill: false,
            data: [],
            yAxisID: 'y-1'
        },{
            label: "Humidity",
            borderColor: "#0000ff",
            borderWidth: 2,
            fill: false,
            data: [],
            yAxisID: 'y-2'
        }]
    },
    options: {
        responsive: true,
        legend: {
            display: false
        },
        stacked: false,
        scales: {
            yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-1',
                ticks: {
                    suggestedMin: 20,
                    suggestedMax: 50
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature'
                }
            },{
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-2',
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Humidity'
                }
            }]
        }
    }
});

var chart2 = new Chart(ov2,{
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Smoke Density",
            borderColor: "#000000",
            borderWidth: 2,
            fill: false,
            data: [],
            yAxisID: 'y-1'
        },{
            label: "Light",
            borderColor: "#ffff00",
            borderWidth: 2,
            fill: false,
            data: [],
            yAxisID: 'y-2'
        }]
    },
    options: {
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                id: 'y-1',
                display: true,
                position: 'left',
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 300
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Smoke Density'
                }
            },{
                id: 'y-2',
                display: true,
                position: 'right',
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1000
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Light Intensity'
                }
            }]
        }
    }
});

$(document).ready(function () {
    getDHT();
    getMisc();
    setInterval(updateW, 10000);
    setInterval(updateM, 10000);
});

function getDHT() {
    $.ajax({
        type: "GET",
        url: "/data/list/"+house_id+"/dht",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            res.reverse();
            jQuery(res).each(function (i, val) {
                addData(chart1, i+1, val.temp, val.humid);
                $("#tv").text(val.temp);
                $("#hv").text(val.humid);
            });
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function getMisc() {
    $.ajax({
        type: "GET",
        url: "/data/list/"+house_id+"/msc",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            res.reverse();
            jQuery(res).each(function (i, val) {
                addData(chart2, i+1, val.smoke, val.light);
                $("#lv").text(val.light);
                $("#sv").text(val.smoke);
            })
        },
        error: function (e) {
            console.log(e);
        }
    });
}


function updateW() {
    $.ajax({
        type: "GET",
        url: "/data/top/"+house_id+"/dht",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            $("#tv").text(res.temp);
            $("#hv").text(res.humid);
            addData(chart1, ++m, res.temp, res.humid);
            removeData(chart1, 0);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function updateM() {
    $.ajax({
        type: "GET",
        url: "/data/top/"+house_id+"/msc",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            $("#lv").text(res.light);
            $("#sv").text(res.smoke);
            addData(chart2, ++n, res.smoke, res.light);
            removeData(chart2, 0);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function addData(chart, label, d1, d2) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(d1);
    chart.data.datasets[1].data.push(d2);
    chart.update();
}

function clearData(chart){
    chart.data.labels.pop();
    chart.data.datasets.forEach(function (dataset) {
        dataset.data.pop();
    });
    chart.update();
}

function removeData(chart, index) {
    chart.data.labels.splice(index, 1);
    chart.data.datasets.forEach(function (dataset) {
        dataset.data.splice(index, 1);
    });
    chart.update();
}