let fetch = require('node-fetch');
let dataFormat = require('./dataFormat')
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./dataBase/test');
module.exports = {
    sendSenSorOneMin(obj) {
        fetch("http://localhost:8400/data/add", {    
            method:"post",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        .then(res=> res.json())
        .then(data=>{
            // console.log(data)
            // dataFormat.disassembleStandardServer(data)
            var time = new Date();
            var sql = 'update standard set temp = ?, humi = ?, light = ?, smoke = ?, time = ? where room = ?'
            var params = [data.temp, data.humi, data.light, data.smoke, time, data.id]
            db.run(sql, params, function (errr) {
                if (errr)
                    console.log(errr);
            })
       }).catch(err=>{
        console.log(err)
        })
    },
    
    reSendData(data){
        fetch("http://localhost:8400/data/resend", {
          method:"post",
          headers:{
              "content-Type":"application/json"
          },
          body:JSON.stringify(data)
        }).then(res=>res.text())
        .then(data1=>{
            // console.log(data1)
            if(data1.error){
                console.log("error!!!")
            }
            else{
              console.log("reSend ok!!!")
            }
        }).catch(err=>(
            console.log(err)
        ))
      },

    senddevice(data){
        fetch("http://localhost:8400/room/device", {
            method:"post",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>res.text())
        .then(data1=>{
            console.log(data1)
            if(data1.error){
                console.log("error!!!")
            }
            else{
                console.log("Send device!!!")
            }
        }).catch(err=>(
            console.log(err)
        ))
    },

    sendSenSor(obj) {
        // console.log('sendsensor')
        // console.log(obj)
        fetch("http://localhost:8400/data/add2", {
        method:"post",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(obj)
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log("error!!!")
            }
            else{
                console.log("Send sensor OK!!!")
            }
        }).catch(err=>(
            console.log(err)
        ))
    },
}