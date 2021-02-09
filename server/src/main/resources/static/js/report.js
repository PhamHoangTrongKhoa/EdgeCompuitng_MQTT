var bs = $("#basic_report").DataTable();
var ex = $("#extra_report").DataTable();
var ext = $("#extra_table").DataTable();
var ex_h = [];
var ex_t=[];
var ex_s=[];
var ex_l=[];
$("#startDate").datepicker({
    autoclose:true,
    format: 'mm/dd/yyyy'
});
var from = new Date().getTime();
var to = new Date(from+86400000).getTime();
$("#startDate").datepicker("update", new Date());
$("#endDate").datepicker({
    autoclose:true,
    format: 'mm/dd/yyyy'
});
$("#endDate").datepicker("update", new Date(to));

$(document).ready(function () {
    basic(from, to);
    extra(from, to);
});

function basic(from, to){
    bs.clear().draw(false);
    $.ajax({
        type: 'GET',
        url: './report/basic?from='+from+'&to='+to,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            $.each(res.list,function (i,item) {
                var row = [item.des, item.data, new Date(item.time).toISOString()];
                bs.row.add(row).draw(false);
            });
        },
        error: function (e) {
            console.log(e);
        }
    })
}

function extra(from, to){
    ex.clear().draw(false);
    $.ajax({
        type: 'GET',
        url: './report/extra?from='+from+'&to='+to,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            $.each(res.list,function (i,item) {
                switch (item.tag) {
                    case 'h':
                        ex_h = item.data;
                        break;
                    case 't':
                        ex_t = item.data;
                        break;
                    case 's':
                        ex_s = item.data;
                        break;
                    case 'l':
                        ex_l = item.data;
                        break;
                }
                var btn = '<button class="btn btn-primary extra" id=\"extra_'+item.tag+'\"><i class="fas fa-plus"></i></button>';
                var row = [item.des, item.data.length, btn];
                ex.row.add(row).draw(false);
            });
        },
        error: function (e) {
            console.log(e);
        }
    })
}

$("#export-btn").on('click', function () {
    window.location = './excel';
});

$("#filter").on('click', function () {
    from = new Date($("#startDate").val()).getTime();
    to = new Date($("#endDate").val()).getTime();
    basic(from, to);
    extra(from, to);
});


$("tbody[id=extra_data]").on('click', '.extra[id^=extra]',function () {
    var tag = $(this).attr('id').split("_")[1];
    switch (tag) {
        case 'h':
            show_table(ex_h);
            break;
        case 't':
            show_table(ex_t);
            break;
        case 'l':
            show_table(ex_l);
            break;
        case 's':
            show_table(ex_s);
            break;
    }
    $("#extra_modal").modal('toggle');
});

function show_table(list) {
    ext.clear();
    var i;
    for(i = 0;i<list.length;i++){
        var row = [list[i].data, new Date(list[i].time).toISOString()];
        ext.row.add(row).draw(false);
    }
}

