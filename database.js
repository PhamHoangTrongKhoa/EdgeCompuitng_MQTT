var sqlite3 = require('sqlite3').verbose()

module.exports={
    mySqlite(params){
    let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the test database.');
    });

    var sql ='INSERT INTO Data (room, time, nhiet, am) VALUES (?,?,?,?)'
    // var params =['room01', 27, 60.2]
            db.run(sql, params, function (err, result) {
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
  },

  mySqliteRead(params){
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
    
  }
}

// exports.save = function(){
//   mySqlite(params){
//     let db = new sqlite3.Database('C:/sqlite/gui/test', (err) => {
//       if (err) {
//         console.error(err.message);
//       }
//       console.log('Connected to the test database.');
//     });

//     var sql ='INSERT INTO Data (room, time, nhiet, am) VALUES (?,?,?,?)'
//     // var params =['room01', 27, 60.2]
//             db.run(sql, params, function (err, result) {
//                 if (err){
//                     console.error(err)
//                     return;
//                 }
//                 else{
//                     console.log(result)
//                 }
//             });


  
//     db.close((err) => {
//       if (err) {
//         console.error(err.message);
//       }
//       console.log('Close the database connection.');
//     });
//   }
// }
