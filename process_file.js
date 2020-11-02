const database = require("./database");

let database = require('./database');

class process_file {
    checkmessage = function(arr){
        if (arr.length == 4){
            if (arr[1] > 0 && arr[1] < 3){
                return arr[1];
            } return 0;
        }else return 0;
    }

    disassemble = function(message){
        var arr = String(message).split('|');
        arr[0] = arr[0].replace('room', '');
        return arr;
    }

    checkdata = function(arr, flag) {
        var i;
        // [get nhiet, am da gui len server tu database]
        let server = {
            nhiet : 27,
            am : 65
        }
        let nhiet = [];
        let am = [];
        for (i = 0; i < arr.length; i++){
            nhiet.push(arr[i].nhiet);
            am.push(arr[i].am);
        }
        // console.log(nhiet);
        // console.log(am);
        // console.log(nhiet - parseFloat(arr[2]));
        let results = [];
        // [ results = database.mySqliteRead_DeviceStatus();]
        let results = [
            { room: '02', id: 'led01', name: 'may_suoi', status: 0, time: 1603789041073 },
            { room: '02', id: 'led02', name: 'may_lanh', status: 0, time: 1603789041073 },
            { room: '02', id: 'led03', name: 'den1', status: 0, time: 1603789041073 },
            { room: '02', id: 'led04', name: 'den2', status: 0, time: 1603789041073 }
        ];
        if ((Math.max(nhiet) - server.nhiet > 0.5)){
            if (){
                
            }
            flag.msg = 'room' + arr[0].room + '|led02|1';
        }
        if (server.nhiet - Math.min(nhiet) > 0.5){
            flag.msg = 'room' + arr[0].room + '|led01|1';
        }
        if (Math.max(am) - server.am > 5){
            flag.msg = 'room' + arr[0].room + '|led02|1';
        }
        if (server.am - Math.min(am) > 5){
            flag.msg = 'room' + arr[0].room + '|led02|1';
        }
        if (msg.length > 0) {
            flag.flag1 = true;
        }  
    }

}

module.exports = process_file;



// exports.checkmessage = function(arr){
//     if (arr.length == 4){
//         if (arr[1] > 0 && arr[1] < 3){
//             return arr[1];
//         } return 0;
//     }else return 0;
// }

// exports.disassemble = function(message){
//     var arr = String(message).split('|');
//     arr[0] = arr[0].replace('room', '');
//     return arr;
// }

// exports.checkdata = function(arr, flag) {
//     var i;
//     // [get nhiet, am da gui len server tu database]
//     let server = {
//         nhiet : 27,
//         am : 65
//     }
//     let nhiet = [];
//     let am = [];
//     for (i = 0; i < arr.length; i++){
//         nhiet.push(arr[i].nhiet);
//         am.push(arr[i].am);
//     }
//     // console.log(nhiet);
//     // console.log(am);
//     // console.log(nhiet - parseFloat(arr[2]));
//     if ((Math.max(nhiet) - server.nhiet > 0.5)){
//         if (){

//         }
//         flag.msg = 'room' + arr[0].room + '|led02|1';
//     }
//     if (server.nhiet - Math.min(nhiet) > 0.5){
//         flag.msg = 'room' + arr[0].room + '|led01|1';
//     }
//     if (Math.max(am) - server.am > 5){
//         flag.msg = 'room' + arr[0].room + '|led02|1';
//     }
//     if (server.am - Math.min(am) > 5){
//         flag.msg = 'room' + arr[0].room + '|led02|1';
//     }
//     if (msg.length > 0) {
//         flag.flag1 = true;
//     }  
// }



// // test module function disassemble
// function test_disassemble(){
//     var message = "home01/room01:27:69";
//     var arr = disassemble(message);
//     console.log(arr);
// }

// function test_checkfunction(){
//     var flag ={
//         flag1 : false,
//         flag2 : false 
//     }
//     let arr = ['01', '333', '27', '60'];
//     check(arr,flag);
//     console.log(flag.flag1);
//     console.log(flag.flag2);
// }

// ////////////on the orther node file:
//     // let flag = {
//     //     flag1 : false,
//     //     flag2 : false
//     // }
//     // process_file.check(sharedArray, flag);
//     // console.log(flag.flag1);
//     // console.log(flag.flag2);
// // test_disassemble();

