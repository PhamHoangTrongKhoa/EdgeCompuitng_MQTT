var mqtt =require('mqtt');
var settings = {
    mqttServerUrl : "192.168.137.200",
    topic : "home01",

    home : "home01",
    room : "room01",
    nhiet_do : "27",
    do_am : "61"
}

var client = mqtt.connect('mqtt://' + settings.mqttServerUrl);
client.on('connect', function(){
    setInterval(function(){
        // var message = "Hello mqtt 1";
        var message = 'room:01|Id:01led01|status:ON';
        client.publish(settings.topic, message);
        console.log('Sent ' + message + " to " + settings.topic);
    }, 1000)
});