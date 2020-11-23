// const database = require("./database/database");

// let database = require('./database');

module.exports = {
    checkmessage(arr){
        if ((arr.length == 3) || (arr.length == 4) || (arr.length == 6)){
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
        
        // nhiet = [2,3,4];
        // console.log(nhiet);
        // console.log(Math.max.apply(Math,nhiet));
        // check heat and humidity whith threshold of room
        if (Math.max.apply(Math, nhiet) > threshold.maximum_heat){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('pan')){
                    let control_msg = devices_status[element].deviceid + '|ON';//control_msg = 02pan01|ON
                    flag.control_msg.push(control_msg);
                }
            }
            flag.msg.push('maxheat');
        }else if (Math.min.apply(Math, nhiet) > threshold.minimum_heat){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('pan')){
                    let control_msg = devices_status[element].deviceid + '|OFF';//control_msg = 02pan01|OFF
                    flag.control_msg.push(control_msg);
                }
            }
            flag.msg.push('minheat');
        }

        if (Math.max.apply(Math, am) > threshold.maximum_humidity){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('led')){
                    let control_msg = devices_status[element].deviceid + '|ON';//control_msg = 02pan01|ON
                    flag.control_msg.push(control_msg);
                }
            }
            flag.msg.push('maxhumidity');
        }else if (Math.min.apply(Math, am) > threshold.minimum_humidity){
            for (const element in devices_status){
                if (devices_status[element].deviceid.includes('pan')){
                    let control_msg = devices_status[element].deviceid + '|OFF';//control_msg = 02pan01|OFF
                    flag.control_msg.push(control_msg);
                }
            }
            flag.msg,push('minhumidity');
        }


        // if room status is in threshold, check changes of status in room
        if (flag.msg.length == 0){
            if ((Math.max.apply(Math, nhiet) - server.nhiet > 0.5)){
                //////////////// mau :var message = 'room:01|Id:01led01|status:ON';
                flag.msg += 'maxheat';
            }else if (server.nhiet - Math.min.apply(Math, nhiet) > 0.5){
                if (flag.msg.length > 0){
                        flag.msg += '|';
                }
                flag.msg += 'minheat'; 
            }
        
            if (Math.max.apply(Math, am) - server.am > 5){
                if (flag.msg.length > 0){
                    flag.msg += '|';
                }
                flag.msg += 'minhumidity'; 
            }else if (server.am - Math.min.apply(Math, am) > 5){
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
            console.log('print flag.msg : ');
            console.log(flag.msg);
            if (flag.control_msg.length > 0){
                console.log('print flag.control_msg : ');
                console.log(flag.control_msg);
            }
        }
        
    },

    check_changes(str, arr, oldvalue){
        if (this.isAverageValueInscreased(arr, oldvalue) == 'Increased'){
            if (this.isValueIncreasing(arr)){
                return str + 'Increasing'
            }else return str + 'Increased'
        }else if (this.isAverageValueInscreased(arr, oldvalue) == 'Decreased'){
            if (this.isValueDecreasing(arr)){
                return str + 'Decreasing'
            }else return str + 'Decreased'
        }else if (this.isAverageValueInscreased(arr, oldvalue) == 'NoChanged'){
            return str + 'Nochanged'
        }
    },

    isAverageValueInscreased(arr, oldvalue){
    // If avg Value is Bigger than oldvalue (on server) by 0.2, Func will return "Increased"
    // Else if avg Value is smaller than oldvalue (on server) by 0.2, Func will return "Decreased"
    // Else Func return "NoChanged"
        let avg = 0;
        for (let i = 0; i < arr.length; i++){
            avg += arr[i];
        }
        avg = avg / arr.length;
        if (avg > (oldvalue + 0.2)){
            return "Increased";
        }else if (avg < (oldvalue - 0.2)){
            return "Decreased";
        }else return "NoChanged"
    },

    isValueIncreasing(arr){
    // If value is increasing, func will return true. Else func return false.
        let inc = 0
        arr = this.smooth(arr, 2);
        for (let i = 1; i < arr.lenght; i++){
            if(arr[i-1] < arr [i]){
                inc++;
            }
        }
        if (inc > (Math.floor(arr.length *2 / 3)) ){ // arr length = 5 => 3 gia tri tang dan
            return true;
        }else return false;
    },

    isValueDecreasing(arr){
    // If value is decreasing, func will return true. Else func return false.
        let inc = 0
        arr = this.smooth(arr, 2);
        for (let i = 1; i < arr.lenght; i++){
            if(arr[i-1] > arr [i]){
                inc++;
            }
        }
        if (inc > (Math.floor(arr.length *2 / 3)) ){ // arr length = 5 => 3 gia tri giam dan
            return true;
        }else return false;
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

