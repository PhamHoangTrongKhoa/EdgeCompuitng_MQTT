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
//     // var results = [];
    // let results = await database.mySqliteRead_RoomStatus();
    let now = Date.now();
    console.log("time = ", Math.floor((now - time) / 1000));
    let results = [
        { room: '02', time: 1603789041073, nhiet: 27.1, am: 65 },
        { room: '02', time: 1603789036143, nhiet: 27.2, am: 65 },
        { room: '02', time: 1603789030950, nhiet: 27.0, am: 65 },
        { room: '02', time: 1603789026005, nhiet: 27.3, am: 65 },
        { room: '02', time: 1603789021111, nhiet: 27.4, am: 65 },
        { room: '02', time: 1603789016183, nhiet: 27.0, am: 65 }
    ];
    // console.log(results);
    let flag = {
        flag1 : false,
        flag2 : false,
        msg : null
    };
    process_file.checkdata(results, flag);
    if (Math.floor((now - time) / 10000) > 0){
        flag.flag2 = true;
    }
    // console.log("flag = ", flag);
    // if (flag.flag2 == true){
    //     if (flag.flag1 == true){
    //         //control
    //         var msg = "";
    //         client.publish(settings.topic, msg);

    //     }
    //     //send gia tri TB to server
    //     // luu gia tri tren server vao database
    //     time = Date.now();
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // }else if (flag.flag1 == true){
    //     // control
    //     // send gia tri to server
    //     // luu gia tri tren server vao database
    // }
    if (flag.flag1 == true){
        // control
        // [decise solution from results and msg receviced]
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
        console.log("aaaaaaaaaaaaaaaaaaa");
    }
    if((flag.flag1 == true)||(flag.flag2 == true)){
        // [send status room to server]
        // [save status room sent to server into database]
    }
}, 1000)






