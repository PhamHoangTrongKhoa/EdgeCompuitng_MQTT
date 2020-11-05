// const database = require("./database/database");

// let database = require('./database');

module.exports = {
    checkmessage(arr){
        if (arr.length == 4){
            if (arr[1] > 0 && arr[1] < 3){
                return arr[1];
            } return 0;
        }else return 0;
    },

    disassemble(message){
        let results = [];
        let arr = String(message).split('|');
        arr.forEach (element => results.push( (String(element).split(':'))[1]));
        let x = parseFloat(results[2]).toFixed(2);
        results[2] = x.toString();
        x = parseFloat(results[3]).toFixed(2);
        results[3] = x.toString();
        // console.log(results);
        return results;
    },

    checkdata(room_status, devices_status, flag) {
        // console.log(devices_status);
        // [get nhiet, am da gui len server tu database]
        let server = {
            nhiet : 27,
            am : 65
        }
        let threshold = {
            maximum_heat : 28,
            minimum_heat : 25,
            maximum_humidity : 65,
            minimum_humidity : 60
        }
        // console.log(devices_status);
        let nhiet = [];
        let am = [];
        for (i = 0; i < room_status.length; i++){
            nhiet.push(room_status[i].nhiet);
            am.push(room_status[i].am);
        }

        nhiet = this.smooth(nhiet, 2);
        am = this.smooth(am, 2);

        console.log(devices_status);
        console.log(room_status);
        
        // check heat and humidity whith threshold of room
        if (Math.max(nhiet) > threshold.maximum_heat){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('pan')){
                    let control_msg = devices_status[element].deviceid + '|ON';//control_msg = 02pan01|ON
                    flag.control_msg.push(control_msg);
                }
            }
        }else if (Math.min(nhiet) > threshold.minimum_heat){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('pan')){
                    let control_msg = devices_status[element].deviceid + '|OFF';//control_msg = 02pan01|OFF
                    flag.control_msg.push(control_msg);
                }
            }
        }

        if (Math.max(am) > threshold.maximum_humidity){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('pan')){
                    let control_msg = devices_status[element].deviceid + '|ON';//control_msg = 02pan01|ON
                    flag.control_msg.push(control_msg);
                }
                flag.msg = 'maxheat';
            }
        }else if (Math.min(am) > threshold.minimum_humidity){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('pan')){
                    let control_msg = devices_status[element].deviceid + '|OFF';//control_msg = 02pan01|OFF
                    flag.control_msg.push(control_msg);
                }
                flag.msg = 'minheat';
            }
        }

        // if room status is in threshold, check changes of status in room
        if (flag.msg.length == 0){
            if ((Math.max(nhiet) - server.nhiet > 0.5)){
                //////////////// mau :var message = 'room:01|Id:01led01|status:ON';
                flag.msg += 'maxheat';
            }else if (server.nhiet - Math.min(nhiet) > 0.5){
                if (flag.msg.length > 0){
                        flag.msg += '|';
                }
                flag.msg += 'minheat'; 
            }
        
            if (Math.max(am) - server.am > 5){
                if (flag.msg.length > 0){
                    flag.msg += '|';
                }
                flag.msg += 'minhumidity'; 
            }else if (server.am - Math.min(am) > 5){
                if (flag.msg.length > 0){
                    flag.msg += '|';
                }
                flag.msg += 'minhumidity'; 
            }
        }
        
        // if have flag msg, flag.flag1 = true
        // if ((flag.msg.length > 0)||(flag.control_msg.length > 0)){
        if (flag.msg.length > 0){
            flag.flag1 = true;
            console.log('print flag.msg : ' + flag.msg  );
        }
        
    },

    smooth(arr, windowSize, getter = (value) => value, setter) {
        const get = getter
        const result = []
      
        for (let i = 0; i < arr.length; i += 1) {
          const leftOffset = i - windowSize
          const from = leftOffset >= 0 ? leftOffset : 0
          const to = i + windowSize + 1
      
          let count = 0
          let sum = 0
          for (let j = from; j < to && j < arr.length; j += 1) {
            sum += get(arr[j])
            count += 1
          }
      
          result[i] = setter ? setter(arr[i], sum / count) : sum / count
        }
      
        return result
      }

}

// module.exports = process_file;



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

