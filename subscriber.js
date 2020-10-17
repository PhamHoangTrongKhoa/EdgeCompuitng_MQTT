var mqtt = require('mqtt');
var settings = {
    mqttServerUrl : "192.168.137.105",
    port : 18833,
    topic : "AAA"
}

var p = require('./process');


var client = mqtt.connect('mqtt://' + settings.mqttServerUrl);

client.on('connect', function(){
    client.subscribe(settings.topic)
    console.log("Subscribed topic " + settings.topic);
})

client.on('message', function(topic, message){
    console.log(message.toString());
    console.log(p.disassemble(message));
})
