let mqtt = require('mqtt');
var sqlite3 = require('sqlite3').verbose()

let process_file = require('./process_file');
let database = require('./database');
let settings = {
    mqttServerUrl : "192.168.137.200",
    topic : "home01"
}

let time = 0;

let flag_checkdevice = true;
let timeline_update = 0;
let time_now = 0;
let scheduled_deviceStatus = {
    room : "",
    idDevice : "",
    status : ""
} 
let schedule_arr = []
let threshold = {
    maximum_heat : 28,
    minimum_heat : 25,
    maximum_humidity : 65,
    minimum_humidity : 60
}


let client = mqtt.connect('mqtt://' + settings.mqttServerUrl);

client.on('connect', function(){
    client.subscribe(settings.topic);
    // client.publish(settings.topic, '1');
    console.log("Subscribed topic " + settings.topic);
})


client.on('message', function(topic, message){
    // console.log(message.toString());
    sharedArray = process_file.disassemble(message);
    if (process_file.checkmessage(sharedArray) == 1){//save room status to database
        
        console.log(sharedArray);
        database.mySqlite_room_status(sharedArray);
    } else if (process_file.checkmessage(sharedArray) == 2){// save status devices of room to database
        console.log(sharedArray);
        database.mySqlite_device_status(sharedArray);
        // [ send status device changed to server ]
        flag_checkdevice = true
    } else if (process_file.checkmessage(sharedArray) == 3){
        time_now = sharedArray[2];
    }
})


setInterval( function(){
    console.log("15s")
    ///////////////////////////////////////////////////////////////
    //
    // Check status all rooms in house
    //
    ///////////////////////////////////////////////////////////////
    let now = Date.now();
    let flag = {
        msg : [],
        control_msg : [],
        flag1 : false,
        flag2 : false
    };
    database.mySqliteRead_table_room_status_on_server(function(err, room_status_on_serer){
        console.log("done reading room_status_on_serer");
        for (let i = 0; i < room_status_on_serer.length; i++){
            console.log("mySqliteRead_RoomStatus");
            database.mySqliteRead_RoomStatus(room_status_on_serer[i].room, function(err, room_status){
                console.log("mySqliteRead_RoomStatus");
                let nhiet_arr = []
                for (let j = 0; j < room_status_on_serer[i].length; j++){
                    nhiet_arr.push(room_status_on_serer[i][j].nhiet);
                }
                nhiet_arr = nhiet_arr.reverse();
                flag.msg.push(process_file.check_changes('nhiet',nhiet_arr, room_status_on_serer[i].nhiet))
                /*let str = process_file.check_changes('nhiet',nhiet_arr, room_status_on_serer[i].nhiet)
                if (str != 'nhietNochanged'){
                    flag.msg.push(str)
                }*/
                
                let am_arr = []
                for (let j = 0; j < room_status_on_serer[i].length; j++){
                    am_arr.push(room_status_on_serer[i][j].am);
                }
                am_arr = am_arr.reverse();
                flag.msg.push(process_file.check_changes('am', am_arr, room_status_on_serer[i].am))

                let smoke_arr = []
                for (let j = 0; j < room_status_on_serer[i].length; j++){
                    smoke_arr.push(room_status_on_serer[i][j].smoke);
                }
                smoke_arr = smoke_arr.reverse();
                flag.msg.push(process_file.check_changes('smoke',smoke_arr, room_status_on_serer[i].smoke))

                // state ?
                let state = 'normal'
                if ((room_status_on_serer[i].nhiet >= 70)||
                (room_status_on_serer[i].nhiet < 10)||
                (room_status_on_serer[i].am >= 90)||
                (room_status_on_serer[i].am < 30)||
                (room_status_on_serer[i].smoke >= 1000)){
                    state = 'danger'
                }else if ((room_status_on_serer[i].nhiet >= 50)||
                (room_status_on_serer[i].nhiet < 18)||
                (room_status_on_serer[i].am >= 80)||
                (room_status_on_serer[i].am < 50)||
                (room_status_on_serer[i].smoke >= 700)){
                    state = 'warming'
                }

                if(flag.msg.length != 0){
                    switch (state) {
                        case 'danger': 
                            let message = 'room:' + devices_status[i].room + '|Id:' + 
                            device_status[i].deviceid + '|status:OFF';
                            client.publish(settings.topic, message);
                        case 'warming':
                            // send to 'warming' to server
                        case 'normal':
                            let nhiet, am, smoke, nochanged = 0;
                            for(let j = 0; j < flag.msg.length; j++){
                                switch (flag.msg[j]) {
                                    case 'nhietIncreased':
                                    case 'nhietDecreased':
                                        let avg = 0
                                        for (let k = 0; k < arr.length; k++){
                                            avg += arr[k]
                                        }
                                        avg = avg / arr.length
                                        nhiet = avg
                                        break
                                    case 'nhietIncreasing':
                                        nhiet = nhiet_arr[nhiet_arr.length - 1]
                                        break
                                    case 'nhietDecreasing':
                                        nhiet = nhiet_arr[0]
                                        break
                                    case 'nhietNochanged':
                                        nhiet = room_status_on_serer[i].nhiet
                                        nochanged++
                                        break
                                    default:
                                        console.log('swtich nhiet have err: ' + flag.msg[j]);
                                }
                                switch (flag.msg[j]) {
                                    case 'amIncreased':
                                    case 'amDecreased':
                                        let avg = 0
                                        for (let k = 0; k < arr.length; k++){
                                            avg += arr[k]
                                        }
                                        avg = avg / arr.length
                                        am = avg
                                        break
                                    case 'amIncreasing':
                                        am = am_arr[am_arr.length - 1]
                                        break
                                    case 'amDecreasing':
                                        am = am_arr[0]
                                        break
                                    case 'amNochanged':
                                        am = room_status_on_serer[i].am
                                        nochanged++
                                        break
                                    default:
                                        console.log('swtich am have err: ' + flag.msg[j]);
                                }
                                switch (flag.msg[j]) {
                                    case 'smokeIncreased':
                                    case 'smokeDecreased':
                                        let avg = 0
                                        for (let k = 0; k < arr.length; k++){
                                            avg += arr[k]
                                        }
                                        avg = avg / arr.length
                                        smoke = avg
                                        break
                                    case 'smokeIncreasing':
                                        smoke = smoke_arr[smoke_arr.length - 1]
                                        break
                                    case 'smokeDecreasing':
                                        smoke = smoke_arr[0]
                                        break
                                    case 'smokeNochanged':
                                        smoke = room_status_on_serer[i].smoke
                                        nochanged++
                                        break
                                    default:
                                        console.log('swtich smoke have err: ' + flag.msg[j]);
                                }
                            }
                            if (nochanged < 3){
                                /*
                                Send 3 bien
                                nhiet, am, smoke 
                                len server

                                luu ddatabase du lieu va 
                                thoi gian gui 
                                database.mySqlite_table_room_status_on_server(nhiet, am, smoke, time)
                                */
                            }else if (now > room_status_on_serer[i].time){
                                /*
                                Send 3 bien
                                nhiet, am, smoke 
                                len server

                                luu ddatabase du lieu va 
                                thoi gian gui 
                                database.mySqlite_table_room_status_on_server(nhiet, am, smoke, time)
                                */
                            }
                            break
                        default:
                            console.log('switch state have err: ' + state)
                    }
                }
            })
        }
    })
    
    ///////////////////////////////////////////////////////////////
    //
    // Control devices in rooms with schedule on server
    //
    ///////////////////////////////////////////////////////////////
    if (flag_checkdevice){
        if (time_now >= timeline_update){///xem lai cho nay 
            schedule_arr = []
            let min = timeline_update - time_now
            database.mySqliteRead_schedule_device(function(err, schedule_device){
                for (let j = 0; j < schedule_device.length; j++){
                    scheduled_deviceStatus.room = schedule_device[j].room;
                    scheduled_deviceStatus.idDevice = schedule_device[j].idDevice;
                    scheduled_deviceStatus.status = "ON"
                    if ((schedule_device[j].start < time_now ) && 
                    (schedule_device[j].end) > time_now){
                        schedule_arr.push(scheduled_deviceStatus)
                        if (schedule_device[j].end < timeline_update){
                            timeline_update = schedule_device[j].end
                        }
                    }else if ((schedule_device[j].start > time_now) && 
                    (schedule_device[j].start < timeline_update)){
                        timeline_update = schedule_device[j].start
                    }
                }
                flag_checkdevice = true;
            })
        }
        database.mySqliteRead_DeviceStatus('all', function(err, devices_status){
            let f = true;
            for (let i = 0; i < devices_status.length; i++){
                let ff = false
                for (let j = 0; j < schedule_arr.length; j++){
                    if (devices_status[i].deviceid == schedule_arr[j].idDevice){
                        ff = true
                    }
                }
                if (ff == flase){
                    let message = 'room:' + devices_status[i].room + '|Id:' + 
                    device_status[i].deviceid + '|status:OFF';
                    client.publish(settings.topic, message);
                    // nhan tin device thay doi tu esp se luu vao database
                }
            }
            if (f == flase){
                flag_checkdevice = false
            }
        })
    }
}, 2000)

/*
    database.mySqliteRead_RoomStatus(function(err, room_status){    
        database.mySqliteRead_DeviceStatus(room_status[0].room ,function(err, devices_status){
            database.mySqliteRead_table_room_status_on_server(room_status[0].room, function(err, room_status_on_serer){
                process_file.checkdata(room_status, devices_status, flag);
            })
            // console.log(devices_status);
            process_file.checkdata(room_status, devices_status, flag);
            console.log('conplete checkdata');
            if (flag.flag1 == true){// [control]
                // [send solution from msg receviced]
                console.log(flag.msg);
                // let msg = process_file.disassemble(flag.msg);
                
                // send data
                if (flag.msg.length > 0){
                    console.log('have flag.msg');
                    // mau :var message = 'room:01|Id:01led01|status:ON';
                    for (const index in flag.msg){
                        //send to server
                    }
                    
                }
                
                // send message to esp to control devices in the room
                if (flag.control_msg.length > 0){
                    console.log('have flag.control_msg');
                    for (const index in flag.control_msg){
                        let arr = process_file.disassemble(flag.control_msg[index]);
                        let message = 'room:' + room_status[0].room + '|Id:' + arr[0] + '|status:' + arr[1];
                        client.publish(settings.topic, message);
                    }
                }
                
                
                // [save status device changed to database]
                // [send status device changed to server]
                // [save status room changed and time send to database] == time reset
                // [send status room changed to server]
            }else if (now - time){
                time = Date.now();
                // console.log("");
            }
            if((flag.flag1 == true)||(flag.flag2 == true)){
                // [send status room to server]
                // [save status room sent to server into database]
            }
        });    
    });

*/