"use strict";

var express = require("express");
var router = express.Router();
var path = require("path");
var spawn = require("child_process").spawn;
/* GET temperature listing. */


router.get("/", function (req, res, next) {
  function runScript() {
    return spawn("python", ["-u", path.join(__dirname, "../temperature.py")]);
  }

  var subprocess = runScript(); // print output of script

  subprocess.stdout.on("data", function (data) {
    if (!res.headersSent) res.send(data);
  });
  subprocess.stderr.on("data", function (data) {
    console.log("error:".concat(data));
  });
  subprocess.stderr.on("close", function () {
    console.log("Closed");
  });
});
module.exports = router;
