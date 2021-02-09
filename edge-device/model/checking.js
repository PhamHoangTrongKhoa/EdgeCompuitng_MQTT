var sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./dataBase/test');
var calculate = require('./calculate')
var mqttRouter = require('./mqtt');
var compare = require('./compare');
var sending = require('./aSend')
var Data = require('./object')
// let fetch = require('node-fetch');


function insertDB(data, callback) {
  let sql1 = 'INSERT INTO dataSendServer (room, temp, humi, light, smoke, time) VALUES (?,?,?,?,?,?)';
  let params1 = [
    data.room,
    data.temp.temp,
    data.humi.humi,
    data.light.light,
    data.smoke.smoke,
    data.time
  ]
  //sqlite3 khong ho tro async nen chi dung callback
  db.run(sql1, params1, function (err1) {
    if (err1) {
      callback(err1);
    }
    else {
      callback("Ok");
    }
  });
}

module.exports = {
  async checkData(room, number, callback) {
    var sql = 'select * from rawData where room = ? order by time desc limit ?'
    var params = [room, number]
    db.all(sql, params, async function (err, resultRaw) {
      if (err) {
        console.log(err);
      }
      else if (resultRaw == '') {
        console.log(null);
      }
      else {
        let average = await calculate.average(resultRaw);
        let max = await calculate.max(resultRaw);
        let min = await calculate.min(resultRaw);
        // let increase = await calculate.increase(resultRaw);
        // let reduction = await calculate.reduction(resultRaw)
        compare.compareDataSendServer(average, min, max, function (result) {
          let message = "";
          let data = new Data.DataSendAsync()
          data.room = result.room;
          //value
          data.temp.temp = average.temp;
          data.humi.humi = average.humi;
          data.light.light = average.light;
          data.smoke.smoke = average.smoke;

          if (result == null) {
            console.log('data empty!')
          } else {
            data.temp.y = result.temp.flag
            data.humi.y = result.humi.flag
            data.light.y = result.light.flag
            data.smoke.y = result.smoke.flag
          }
          //////////////////////////////////----------------------//////////////////////////////
          compare.compareDataStandard(average, min, max, async function (resultStandard) {
            if (resultStandard == null) {
              console.log('data empty!')
            }
            else {
              data.temp.x = resultStandard.temp.flag
              data.humi.x = resultStandard.humi.flag
              data.light.x = resultStandard.light.flag
              data.smoke.x = resultStandard.smoke.flag
            }
            //////////////////////////////////----------------------//////////////////////////////
            // console.log(data);
            let flagSend = false;
            if (data.temp.y === true || data.temp.x === true) {
              flagSend = true;
              if (data.temp.y === true) {
                if (result.temp.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led01|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led01|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }
              if (data.temp.x === true) {
                if (resultStandard.temp.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led01|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led01|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }
            }

            if (data.light.y === true || data.light.x === true) {
              flagSend = true;
              if (data.light.y === true) {
                console.log(result.light.deviation.ave)
                if (result.light.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led02|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led02|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }

              if (data.light.x === true) {
                if (resultStandard.light.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led02|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led02|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }

            }
            if (data.smoke.y === true || data.smoke.x === true) {
              flagSend = true;
              if (data.smoke.x === true) {
                message = 'warning from pi' + '|room:0' + result.room
                mqttRouter.sendEsp(message)
              }
              message = "";
            }
            if (flagSend === true) {
              // console.log(data)
              data.time = new Date();
              sending.sendSenSor(data);
              // insertDB(data, function (re) {
              //   callback("Ok")
              // });
              callback("ok")
              //ko lưu bất đồng b              
            }
          })
        });///
      }
    });

  },


  async checkDataOneMin(room, number, callback) {
    var sql = 'select * from rawData where room = ? order by time desc limit ?'
    var params = [room, number]
    db.all(sql, params, async function (err, resultRaw) {
      if (err) {
        console.error(err)
        return;
      }
      else {
        let average = await calculate.average(resultRaw);
        let max = await calculate.max(resultRaw);
        let min = await calculate.min(resultRaw);
        // let increase = await calculate.increase(resultRaw);
        // let reduction = await calculate.reduction(resultRaw)

        compare.compareDataSendServer(average, min, max, function (result) {
          let message = "";
          let data = new Data.DataSendAsync()
          data.room = result.room;
          //value
          data.temp.temp = average.temp
          data.humi.humi = average.humi
          data.light.light = average.light
          data.smoke.smoke = average.smoke

          if (result == null) {
            console.log('data empty!')
          } else {
            data.temp.y = result.temp.flag
            data.humi.y = result.humi.flag
            data.light.y = result.light.flag
            data.smoke.y = result.smoke.flag
          }

          //////////////////////////////////----------------------//////////////////////////////
          compare.compareDataStandard(average, min, max, async function (resultStandard) {
            // console.log(resultStandard)
            if (resultStandard == null) {
              console.log('data empty!')
            }
            else {
              data.temp.x = resultStandard.temp.flag
              data.humi.x = resultStandard.humi.flag
              data.light.x = resultStandard.light.flag
              data.smoke.x = resultStandard.smoke.flag
            }
            // console.log(data)
            //////////////////////////////////----------------------//////////////////////////////
            if (data.temp.y === true || data.temp.x === true) {
              if (data.temp.y === true) {
                if (result.temp.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led01|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led01|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }

              if (data.temp.x === true) {
                if (resultStandard.temp.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led01|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led01|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }
            }

            if (data.light.y === true || data.light.x === true) {
              if (data.light.y === true) {
                if (result.light.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led02|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led02|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }

              if (data.light.x === true) {
                if (resultStandard.light.deviation.ave > 0) {
                  message = message + 'room:0' + result.room + '|Id:led02|status:OFF'
                  mqttRouter.sendEsp(message)
                } else {
                  message = message + 'room:0' + result.room + '|Id:led02|status:ON'
                  mqttRouter.sendEsp(message)
                }
                message = "";
              }
            }
            if (data.smoke.y === true || data.smoke.x === true) {
              if (data.smoke.x === true) {
                message = 'warning from pi' + '|room:0' + resultStandard.room
                mqttRouter.sendEsp(message)
              }
              message = "";
            }
            let date = new Date();
            data.time = date
            // console.log(data)
            sending.sendSenSorOneMin(data);
            insertDB(data, function (re) {
              callback("Ok")
            });
          })
        });///
      }
    });
  },
}

