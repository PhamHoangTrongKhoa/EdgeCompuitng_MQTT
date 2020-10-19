var sharedArray = [];
module.exports = sharedArray;

var fs = require('fs');


var room1 = require('./room_object');
var room2 = require('./room_object');
// console.log(room);
// var r1 = new room();
var arr = ['home01', 'room01', '27', '68'];
var arr2 = ['home01', 'room02', '27', '68'];
room1.addRoom(arr);
room2.addRoom(arr2);
room1.print();
room2.print();