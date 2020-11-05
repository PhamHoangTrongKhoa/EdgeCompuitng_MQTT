let mqtt = require('mqtt');
var sqlite3 = require('sqlite3').verbose()

let process_file = require('./process_file');
let database = require('./database');
let settings = {
    mqttServerUrl : "192.168.137.200",
    topic : "home01"
}

let time = 0;


let client = mqtt.connect('mqtt://' + settings.mqttServerUrl);

client.on('connect', function(){
    client.subscribe(settings.topic);
    // client.publish(settings.topic, '1');
    console.log("Subscribed topic " + settings.topic);
})


client.on('message', function(topic, message){
    console.log(message.toString());
    sharedArray = process_file.disassemble(message);
    if (process_file.checkmessage(sharedArray) == 1){//save room status to database
        
        console.log(sharedArray);
        database.mySqlite_room_status(sharedArray);
    } else if (process_file.checkmessage(sharedArray) == 2){// save status devices of room to database
        console.log(sharedArray);
        database.mySqlite_device_status(sharedArray);
        // [ send status device changed to server ]

    }
})


setInterval( function(){
    database.mySqliteRead_RoomStatus(function(err, room_status){
        let now = Date.now();
        let flag = {
            flag1 : false,
            flag2 : false,
            msg : '',
            control_msg : []
        };
    
        if (Math.floor((now - time) / 15000) > 0){
            flag.flag2 = true;
        }

        database.mySqliteRead_DeviceStatus(room_status[0].room ,function(err, devices_status){
            // console.log(devices_status);
            process_file.checkdata(room_status, devices_status, flag);
            // console.log(devices_status);
            if (flag.flag1 == true){// [control]
                // [send solution from msg receviced]
                console.log(flag.msg);
                let msg = process_file.disassemble(flag.msg);
                if (msg.length() == 3){
                    client.publish(settings.topic, flag.msg);
                }
                // send message to esp to control devices in the room had problem
                
                // [save status device changed to database]
                // [send status device changed to server]
                // [save status room changed to database]
                // [send status room changed to server]
            }
            if (flag.flag2 == true){
                time = Date.now();
                // console.log("");
            }
            if((flag.flag1 == true)||(flag.flag2 == true)){
                // [send status room to server]
                // [save status room sent to server into database]
            }
        });    
    });
}, 5000)