var mqtt =require('mqtt');
var settings = {
    mqttServerUrl : "192.168.137.105",
    topic : "AAA",

    home : "home01",
    room : "room02",
    nhiet_do : "26",
    do_am : "62"
}

var client = mqtt.connect('mqtt://' + settings.mqttServerUrl);
client.on('connect', function(){
    setInterval(function(){
        // var message = "Hello mqtt 1";
        var message = settings.home + '/' + settings.room + ':' + settings.nhiet_do + ':' +settings.do_am;
        client.publish(settings.topic, message);
        console.log('Sent ' + message + " to " + settings.topic);
    }, 1000)
});