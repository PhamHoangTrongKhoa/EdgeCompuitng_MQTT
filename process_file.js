function disassemble (message) {
    // console.log(message);
    var arr = String(message).split('|');
    // var arr_where = arr[0].split('/');
    // arr.splice(0,1,arr_where[0]);// xoa phan tu 0 va chen vao vi tri 0
    // arr.splice(1,0,arr_where[1]);// chen vao vi tri 1 va day ptu sau xuong'
    arr[0] = arr[0].replace('room', '');
    return arr;
}

function check(arr, flag){
    let nhiet = 25;
    let am = 60;
    //doc database
    // console.log(arr[2]);
    console.log(nhiet - parseFloat(arr[2]));
    if ((nhiet - 1 > parseFloat(arr[2])) || (nhiet + 1 < parseFloat(arr[2]))){
        flag.flag1 = true;
    }
    if ((am - 1 > parseFloat(arr[3])) || (am + 1 <  parseFloat(arr[3]))){
        flag.flag2 = true;
    }
    console.log(flag.flag1);
}

exports.disassemble = function(message){
    return disassemble(message);
}

exports.check = function(arr, flag) {
    return check(arr,flag);
}

// test module function disassemble
function test_disassemble(){
    var message = "home01/room01:27:69";
    var arr = disassemble(message);
    console.log(arr);
}

{
    var flag ={
        flag1 : false,
        flag2 : false 
    }
    let arr = ['01', '333', '27', '60'];
    check(arr,flag);
    console.log(flag.flag1);
    console.log(flag.flag2);
}
// test_disassemble();

