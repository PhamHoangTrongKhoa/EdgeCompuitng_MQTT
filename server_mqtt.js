let mqtt = require('mqtt');
var sqlite3 = require('sqlite3').verbose()

let process_file = require('./process_file');
let database = require('./database');
let settings = {
    mqttServerUrl : "192.168.137.105",
    topic : "home01"
}


let client = mqtt.connect('mqtt://' + settings.mqttServerUrl);

client.on('connect', function(){
    client.subscribe(settings.topic)
    console.log("Subscribed topic " + settings.topic);
})


client.on('message', function(topic, message){
    console.log(message.toString());
    sharedArray = process_file.disassemble(message);
    console.log(sharedArray);
    database.mySqlite(sharedArray);
})


    setInterval(function(){
        database.mySqliteRead();
    }, 5000)



