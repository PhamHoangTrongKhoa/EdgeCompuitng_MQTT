var mqtt = require('mqtt');
var format = require('./dataFormat')
var sqlite3 = require('sqlite3').verbose()
var Data = require('./object')
let db = new sqlite3.Database('./dataBase/test');
var settings = {
    mqttServerUrl : "192.168.137.200",
    port : 18833,
    topic : "HOME01"
}
var client = mqtt.connect('mqtt://' + settings.mqttServerUrl);
var send = require('./aSend')
module.exports={
    async connect(){
        console.log('Connect Mqtt')
        client.on('connect', function(){
            // if(err){
            //     console.error("err: "+err);
            // }          
            client.subscribe(settings.topic, function(err){
                if (!err) {
                    console.log("Subscribed topic " + settings.topic);
                }
                else 
                    console.error(err);
            })       
        });
        
        client.on('message',async function(topic, message){
            console.log("Message: " + message.toString());
        let arrSaveDB =[] ;
        let arrCheck=[];
        let arr = []
        arr = String(message).split('|');
        // console.log(arr)
        arr.forEach(function(value){
            let arrT = String(value).split(':') 
            arrCheck.push(arrT[0])
            arrSaveDB.push(arrT[1])
        })       

        let date = new Date();
        if(Number(arrSaveDB[0])===1 && arrCheck[0]== "flag"){
            let sql ='INSERT INTO rawData (room, temp, humi, light, smoke, time) VALUES (?,?,?,?,?,?)'
            let params = [  
                arrSaveDB[1],
                parseFloat(parseFloat(arrSaveDB[2]).toFixed(2)),
                parseFloat(parseFloat(arrSaveDB[3]).toFixed(2)),
                parseFloat(parseFloat(arrSaveDB[4]).toFixed(2)),
                parseFloat(parseFloat(arrSaveDB[5]).toFixed(2)),
                date
            ]
            //sqlite3 khong ho tro async nen chi dung callback
            db.run(sql, params, function(err){
                if(err)
                    console.log(err);
            });
        }
        if (Number(arrSaveDB[0])===2 && arrCheck[0]== "flag"){
            let data = new Data.DataDevice();
            data.room = Number(arrSaveDB[1]);
            data.id = arrSaveDB[2];
            data.status = arrSaveDB[3];

            let sql ="select * from devices where id = ?"
            let params = [arrSaveDB[2]]
            db.get(sql, params, function(err, result){
                if(err)
                    console.log(err);
                else if(result==null){
                    sql ="insert into devices (id, room, status) values (?,?,?)"
                    params = [arrSaveDB[2], arrSaveDB[1], arrSaveDB[3]]
                    db.run(sql, params, function(errr){
                        if(err)
                            console.log(errr);
                    })
                }else{
                    sql ="update devices set status = ? where id = ?"
                    params = [arrSaveDB[3], arrSaveDB[2]]
                    db.run(sql, params, function(errr){
                        if(errr)
                            console.log(err);
                    })
                    send.senddevice(data);
                    console.log(data)
                }
            })
            
        }             
        })       
    },
    sendEsp(message){
        client.publish(settings.topic, message);
        console.log("send esp: " + message)
    }
}