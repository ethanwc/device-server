"use strict";

var express = require("express");
var router = express.Router();
var path = require("path");
var spawn = require("child_process").spawn;
/* GET temperature listing. */

router.post("/", function(req, res, next) {
  console.log(req.body.devicestate.color);
  var hex = req.body.devicestate.color;
  console.log(hex);
  var r = parseInt(hex.substring(0, 2), 16) / 2.55;
  var g = parseInt(hex.substring(2, 4), 16) / 2.55;
  var b = parseInt(hex.substring(4, 6), 16) / 2.55;
  console.log(r, g, b);
  function runScript() {
    console.log("Running led with", r, g, b);
    return spawn("python", [
      "-u",
      path.join(__dirname, ["../led.py", r, g, b])
    ]);
  }

  var subprocess = runScript(); // print output of script

  subprocess.stdout.on("data", function(data) {
    if (!res.headersSent) res.status(200).send();
  });
  subprocess.stderr.on("data", function(data) {
    console.log("error:".concat(data));
  });
  subprocess.stderr.on("close", function() {
    console.log("Closed");
  });
});
module.exports = router;
