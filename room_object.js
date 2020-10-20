class Room{
    constructor(home, room){
        this.home = home;
        this.room = room;
        this.nhiet_do = '';
        this.do_am = '';
    }

    static setting_home(home){
        this.home = home;
    }

    static setting_room(room){
        this.room = room;
    }

    update_data = function(arr){
        this.home = arr[0].replace('home','');
        this.room = arr[1].replace('room', '');
        this.nhiet_do = arr[2];
        this.do_am = arr[3];
    }

}

// var room1 = new Room('01', '02');
// var room2 = new Room('01', '01');
// console.log(room1);
// console.log(room2);

module.exports=Room;
// exports.room.addRoom = function(arr){
//     return this.addRoom(arr);
// }
// exports.room.print = function(){
//     return this.print();
// }