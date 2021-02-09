var s = $("#smoke-chart");
var l = $("#light-chart");
var house_id = $("#house_id").text();
var sChart = new Chart(s,{
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: 'Smoke Density',
            backgroundColor: '#d3d3d3',
            borderColor: '#000000',
            borderWidth: 3,
            data: []
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 400
                },
                scaleLabel: {
                    display: true,
                    labelString: "Smoke Density"
                }
            }]
        }
    }
});

var lChart = new Chart(l,{
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Light",
            backgroundColor: "#ffff00",
            borderColor: "#000000",
            borderWidth: 3,
            data: []
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1000
                },
                scaleLabel: {
                    display: true,
                    labelString: "Light Intensity"
                }
            }]
        }
    }
});

$(document).ready(function () {
    getData();
    setInterval(update, 5000);
});

function getData() {
    $.ajax({
        type: "GET",
        url: "/data/list/"+house_id+"/msc",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            res.reverse();
            jQuery(res).each(function (i, value) {
                addData(sChart, i, value.smoke);
                addData(lChart, i, value.light);
            });
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function update() {
    $.ajax({
        type: "GET",
        url: "/data/top/"+house_id+"/msc",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            addData(sChart, Math.ceil(Math.random()*10), res.smoke);
            removeData(sChart, 0);
            addData(lChart, Math.ceil(Math.random()*10), res.light);
            removeData(lChart, 0);
        },
        error: function (e) {
            console.log(e);
        }
    })
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach(function (dataset) {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart, index) {
    chart.data.labels.splice(index, 1);
    chart.data.datasets[0].data.splice(index, 1);
    chart.update();
}

