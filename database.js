var sqlite3 = require('sqlite3').verbose()

module.exports={
    mySqlite_room_status(params){
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    // var sql ='INSERT INTO Data (room, time, nhiet, am) VALUES (?,?,?,?)'
    var sql ='INSERT INTO Data_room_status (room, time, nhiet, am) VALUES (?, ?, ?, ?)'
    // var params =['room01', 27, 60.2]
    params[1] = Date.now();
            db.run(sql, params, function (err, result) {
                if (err){
                    console.error(err)
                    return;
                }
                else{
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
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    var sql ='INSERT INTO Room_device_status (room, device_id, name, status, time) values( ?, ?, ?, ?, ?)'
    // var params =['room01', 27, 60.2]
            params[4] = Date.now();
            db.run(sql, params, function (err, result) {
                if (err){
                    console.error(err)
                    return;
                }
                else{
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



  mySqliteRead_RoomStatus(){
    let results = [];
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    var sql ='SELECT * FROM Data_room_status ORDER BY TIME DESC LIMIT 6'
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
      console.log(results);
      // callback(results);
      return results;
    });
    // return callback(results);
    // console.log(results);
    // return results;
  },



  mySqliteRead_DeviceStatus(params){
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    var sql ='SELECT * FROM Room_device_status ORDER BY TIME DESC LIMIT 6'
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
    
  }
}
