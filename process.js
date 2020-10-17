function disassemble (message) {
    console.log(message);
    var arr = String(message).split(':');
    var arr_where = arr[0].split('/');
    arr.splice(0,1,arr_where[0]);// xoa phan tu 0 va chen vao vi tri 0
    arr.splice(1,0,arr_where[1]);// chen vao vi tri 1 va day ptu sau xuong'
    return arr;
}

exports.disassemble = function(message){
    return disassemble(message);
}

// test module function disassemble
function test_disassemble(){
    var message = "home01/room01:27:69";
    var arr = disassemble(message);
    console.log(arr);
}
test_disassemble();