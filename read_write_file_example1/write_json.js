var fs = require('fs');

var process_file = require('../process_file');
const { addRoom } = require('../room_object');
var arr = process_file.disassemble("home01/room01:27:69");

var room = require('../room_object.js');
room.addRoom(arr);

var data = JSON.stringify(room);

fs.writeFileSync('../data_room/room01.json', data);