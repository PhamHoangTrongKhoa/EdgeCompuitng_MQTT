var Room = new Object();
// Room.constructor === Object;
Room  = {
    home : 0,
    room : 0,
    nhiet_do : 0,
    do_am : 0,
    time : 0,
    addRoom : function(arr){},
    print : function(){}
}

Room.addRoom = function(arr) {
    this.home = arr[0].replace('home', ''),
    this.room = arr[1].replace('room', ''),
    this.nhiet_do = arr[2],
    this.do_am = arr[3]
}

Room.print = function(){
    console.log(Room);
}

module.exports=Room;
// exports.room.addRoom = function(arr){
//     return this.addRoom(arr);
// }
// exports.room.print = function(){
//     return this.print();
// }