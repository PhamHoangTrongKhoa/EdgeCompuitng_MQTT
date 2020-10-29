let mqtt = require('mqtt');
var sqlite3 = require('sqlite3').verbose()

let process_file = require('./process_file');
let database = require('./database');
let settings = {
    mqttServerUrl : "192.168.137.200",
    topic : "home01"
}


let client = mqtt.connect('mqtt://' + settings.mqttServerUrl);

client.on('connect', function(){
    client.subscribe(settings.topic);
    // client.publish(settings.topic, '1');
    console.log("Subscribed topic " + settings.topic);
})


client.on('message', function(topic, message){
    console.log(message.toString());
    sharedArray = process_file.disassemble(message);
    if (process_file.checkmessage(sharedArray) == 1){//save room status
        console.log(sharedArray);
        database.mySqlite_room_status(sharedArray);
    } else if (process_file.checkmessage(sharedArray) == 2){// save status devices of room
        console.log(sharedArray);
        database.mySqlite_device_status(sharedArray);
    }
})
const checkdata = async() =>{
    results = await database.mySqliteRead_RoomStatus(function(){
        console.log('===========');
        console.log(results);
    })    
}
checkdata();

// setInterval( checkdata = async() => {
//     // var results = [];
//     results = await database.mySqliteRead_RoomStatus();
//     console.log('===============');
//     console.log(results); // underfined is  here
//     // let arr = [];
//     // arr.push('1');
//     // console.log(arr);
//     // var results = database.mySqliteRead_RoomStatus();
//     // console.log("result = " + results[0]);
//     // var message = "1";
//     // client.publish(settings.topic, message);
//     // console.log('sent ' + message + 'to' + settings.topic);
// }, 1000)





