var mosca = require('mosca');
// console.log(mosca);
var settings = {
        port : 18833
}

var server = new mosca.Server(settings);

server.on('clientConnected', function(client){
    console.log('Client connected', client.id)
});
server.on('published', function(packet, client){
    console.log('Message Received ', packet.payload);
});

server.on('ready', setup);

function setup(){
    console.log('Mosca MQTT server is up and runing at ' + settings.port);
}