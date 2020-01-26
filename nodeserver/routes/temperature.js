var express = require("express");

var router = express.Router();

var path = require("path");

var spawn = require("child_process").spawn;
/* GET temperature listing. */

router.get("/", function(req, res, next) {
  function runScript() {
    return spawn("python", ["-u", path.join(__dirname, "hello.py")]);
  }

  var subprocess = runScript(); // print output of script

  subprocess.stdout.on("data", function(data) {
    res.send(data);
  });
});
module.exports = router;
