var sqlite3 = require('sqlite3').verbose();
var address = 'C:/sqlite/gui/test';

module.exports = {
    mySqlite_room_status(params) {
        // let db = new sqlite3.Database('E:/SV5_HK1/EdgeComputing_HealthCare/EdgeCompuitng_MQTT/database', (err) => {
        let db = new sqlite3.Database(address, (err) => {
        // let db = new sqlite3.Database('./database/database', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the test database.');
        });

        // var sql ='INSERT INTO Data (room, time, nhiet, am) VALUES (?,?,?,?)'
        var sql ='INSERT INTO room_status (room, time, nhiet, am) VALUES (?, ?, ?, ?)'
        // var params =['room01', 27, 60.2]
        params[1] = Date.now();
        db.run(sql, params, function (err, result) {
            if (err){
                console.error(err)
                    return;
            }else{
                console.log('ok')
            }
          });
    
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    },



  mySqlite_device_status(params){
    // let db = new sqlite3.Database('E:/SV5_HK1/EdgeComputing_HealthCare/EdgeCompuitng_MQTT/database', (err) => {
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
    //let db = new sqlite3.Database('ss./database/database', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    // var sql ='INSERT INTO Room_device_status (room, device_id, name, status) values( ?, ?, ?, ?)'
    params[1] = params[0] + params[2];
    var sql ='UPDATE Room_device_status SET status = ? WHERE deviceid = ?';
            // params.push(Date.now());
            db.run(sql, [params[3], params[1]], function (err, result) {
                if (err){
                    console.error(err)
                    return;
                }
                else{
                    console.log('update ' + params[1] + ' : ' + params[3]);
                }
            });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  },

//////////////////////////////////////////////////////////////////////////////

  mySqliteRead_RoomStatus(callback){
    let results = [];
    // let db = new sqlite3.Database('E:/SV5_HK1/EdgeComputing_HealthCare/EdgeCompuitng_MQTT/database', (err) => {
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    var sql ='SELECT * FROM room_status ORDER BY TIME DESC LIMIT 6'
    // var params =['room01', 27, 60.2]
            db.each(sql,  function (err, result) {// chay dong thoi voi (1)
                if (err){
                    console.error(err)
                    return;
                }
                else{
                  results.push(result);
                }
                // console.log(results);
            });
            // console.log("======================================================================"); // this is (1)
            // console.log(results);
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
      // console.log(results);
      // callback(results);
      callback(err, results);
    });
    // console.log("chan may qua'");
    // console.log(results);
    // return results;
    // return callback(results);
    // console.log(results);
    // return results;
  },

/////////////////////////////////////////////////////////////////////////////

  mySqliteRead_DeviceStatus(params, callback){
    // let db = new sqlite3.Database('E:/SV5_HK1/EdgeComputing_HealthCare/EdgeCompuitng_MQTT/database', (err) => {
    // let db = new sqlite3.Database('./database/database', (err) => {
    let results = [];
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    var sql ='SELECT deviceid, status FROM Room_device_status WHERE room = ?'
    // var params =['room01', 27, 60.2]
            db.each(sql,params ,function (err, result) {
                if (err){
                    console.error(err)
                    return;
                }
                else{
                    // console.log(result)
                    results.push(result);
                    // console.log(result);
                }
            });
    
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
      // console.log();
      callback(err, results);
    });
  }
}
