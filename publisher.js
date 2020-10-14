var mqtt =require('mqtt');
var settings = {
    mqttServerUrl : "192.168.137.105",
    port : 18833,
    topic : "AAA"
}

var client = mqtt.connect('mqtt://' + settings.mqttServerUrl);
client.on('connect', function(){
    setInterval(function(){
        var message = "Hello mqtt";
        client.publish(settings.topic, message);
        console.log('Sent ' + message + " to " + settings.topic);
    }, 1000)
});