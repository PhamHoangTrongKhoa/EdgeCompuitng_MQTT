let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./dataBase/test');
let check = require('./checking');
let send = require('./aSend')
const fetch = require('node-fetch');
module.exports = {
  myProcess() {
    check.checkData('01', 4, function(a){
      check.checkData('02', 4, function(b){
        check.checkData('03', 4, function(c){

        });
      });
    });  
  },

 oneMin(){
    check.checkDataOneMin('01', 15, function(a){
      check.checkDataOneMin('02', 15, function(b){
        check.checkDataOneMin('03', 15, function(c){
        });
      });
    });
  },
  
}

