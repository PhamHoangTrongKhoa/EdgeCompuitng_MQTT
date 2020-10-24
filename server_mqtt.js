let mqtt = require('mqtt');
var sqlite3 = require('sqlite3').verbose()

let process_file = require('./process_file');
let database = require('./database');
let settings = {
    mqttServerUrl : "192.168.137.105",
    topic : "home01"
}


let client = mqtt.connect('mqtt://' + settings.mqttServerUrl);

client.on('connect', function(){
    client.subscribe(settings.topic)
    console.log("Subscribed topic " + settings.topic);
})

// var sharedArray;
client.on('message', function(topic, message){
    console.log(message.toString());
    sharedArray = process_file.disassemble(message);
    console.log(sharedArray);
    // let flag = {
    //     flag1 : false,
    //     flag2 : false
    // }
    // process_file.check(sharedArray, flag);
    // console.log(flag.flag1);
    // console.log(flag.flag2);
    database.mySqlite(sharedArray);
})


    setInterval(function(){
        let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Connected to the test database.');
          });
      
          var sql ='select * from data order by time desc  limit 5'
          // var params =['room01', 27, 60.2]
                  db.each(sql,  function (err, result) {
                      if (err){
                          console.error(err)
                          return;
                      }
                      else{
                          console.log(result)
                      }
                  });
      
      
          
          db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Close the database connection.');
          });
          
    }, 5000)



