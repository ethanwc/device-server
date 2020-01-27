"use strict";

var express = require("express");
var router = express.Router();
var path = require("path");
var spawn = require("child_process").spawn;
/* GET temperature listing. */

router.post("/", function(req, res, next) {
  var hex = req.body.devicestate.color;
  function hexToR(h) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }
  function hexToG(h) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }
  function hexToB(h) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }

  var r = hexToR(hex) / 2.55;
  var g = hexToR(hex) / 2.55;
  var b = hexToR(hex) / 2.55;

  function runScript() {
    return spawn("python", [
      "-u",
      path.join(__dirname, ["../led.py", r, g, b])
    ]);
  }

  var subprocess = runScript(); // print output of script

  subprocess.stdout.on("data", function(data) {
    if (!res.headersSent) res.send("okay");
  });
  subprocess.stderr.on("data", function(data) {
    console.log("error:".concat(data));
  });
  subprocess.stderr.on("close", function() {
    console.log("Closed");
  });
});
module.exports = router;
