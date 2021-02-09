var express = require('express');
var router = express.Router();
var cors = require('cors');
var dataFormat = require('../model/dataFormat')

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

router.post('/receive_device',cors(corsOptions),async function(req, res) {
  console.log(req.body)
  dataFormat.disassembleDeviceServer(req.body);
  res.json({msg: 'OK'})

});


module.exports = router;
