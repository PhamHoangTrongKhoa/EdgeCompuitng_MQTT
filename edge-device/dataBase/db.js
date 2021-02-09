var sqlite3 = require('sqlite3').verbose()
var db = undefined;

module.exports = {
  connect(dbname, callback) {
    db = new sqlite3.Database(dbname,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      function (err) {
        if (err)
          callback(err);
        else
          // console.log('connect')
          callback(err);
      });
  },

  // connect(callback) {
  //   db = new sqlite3.Database('./dataBase/test',
  //     function (err) {
        
  //     });
  // },

  disconnect() {
    db.close();
  },

  insert(sql, value, callback) {
    db.run(sql, value, function (err) {
        if (err){
          // console.log('err');
          callback(err);
        }
        else{
          // console.log('ok');
          callback();
        }
      });
  },

  update(sql, value, callback) {
    db.run(sql, value, function (err) {
        if (err)
          callback(err);
        else
          callback();
      });
  },

  read(sql,value, callback) {
    db.get(sql, value, function (err, row) {
        if (row == undefined)
          callback("Something wrong");
        else if (err)
          callback(err);
        else
          callback(null, row);
      });
  },

  delete(sql, value, callback) {
    db.run(sql, value, function (err) {
        if (err)
          callback(err);
        else
          callback(err);
      });
  },

  selectEach(sql, value, callback) {
    var titles = [];
    db.each(sql, value,
      function (err, row) {
        if (err)
          callback(err);
        else
          titles.push(row);
      },
      function (err) {
        if (err)
          callback(err);
        else
          callback(null, titles);
      });
  },

  selectAll(sql, params, callback) {
    db.all(sql, params, function (err, result) {
        if (err) {
          callback(err);
        }
        else {
          callback(err, result);
        }
    });
  },
}

