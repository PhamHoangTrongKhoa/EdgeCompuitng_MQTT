var mqtt = require('mqtt');
var settings = {
    mqttServerUrl : "192.168.137.105",
    topic : "AAA"
}

var process_file = require('./process_file');
// var process = require('./process');
// var sharedArray = process.sharedArray;
var sharedArray;

var client = mqtt.connect('mqtt://' + settings.mqttServerUrl);

client.on('connect', function(){
    client.subscribe(settings.topic)
    console.log("Subscribed topic " + settings.topic);
})
console.log('aaaaaaaaaaa');
client.on('message', function(topic, message){
    console.log(message.toString());
    sharedArray = process_file.disassemble(message);
    console.log(sharedArray);
})
console.log('hhhhhhhhhhhhhhhh');


