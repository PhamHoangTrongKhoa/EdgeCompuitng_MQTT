const fs = require('fs');

const process_file = require('../process_file');
const Room= require('../room_object');

var arr = process_file.disassemble("home01/room01:27:69");
var room1 = new Room().update_data(arr);


var data = JSON.stringify(room1);
fs.writeFileSync('../data_room/room01.json', data);

// var express = require('express');
// console.log(express);