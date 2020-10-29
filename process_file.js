exports.checkmessage = function(arr){
    if (arr.length == 4){
        if (arr[1] > 0 && arr[1] < 3){
            return arr[1];
        } return 0;
    }else return 0;
}

exports.disassemble = function(message){
    var arr = String(message).split('|');
    arr[0] = arr[0].replace('room', '');
    return arr;
}

exports.check = function(arr, flag) {
    let nhiet = 25;
    let am = 60;
    console.log(nhiet - parseFloat(arr[2]));
    if ((nhiet - 1 > parseFloat(arr[2])) || (nhiet + 1 < parseFloat(arr[2]))){
        flag.flag1 = true;
    }
    if ((am - 1 > parseFloat(arr[3])) || (am + 1 <  parseFloat(arr[3]))){
        flag.flag2 = true;
    }
    console.log(flag.flag1);
}



// test module function disassemble
function test_disassemble(){
    var message = "home01/room01:27:69";
    var arr = disassemble(message);
    console.log(arr);
}

function test_checkfunction(){
    var flag ={
        flag1 : false,
        flag2 : false 
    }
    let arr = ['01', '333', '27', '60'];
    check(arr,flag);
    console.log(flag.flag1);
    console.log(flag.flag2);
}

////////////on the orther node file:
    // let flag = {
    //     flag1 : false,
    //     flag2 : false
    // }
    // process_file.check(sharedArray, flag);
    // console.log(flag.flag1);
    // console.log(flag.flag2);
// test_disassemble();

