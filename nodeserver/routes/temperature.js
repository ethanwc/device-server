var express = require("express");
var router = express.Router();
const path = require("path");
var spawn = require("child_process").spawn;

/* GET temperature listing. */
router.get("/", function(req, res, next) {
  function runScript() {
    return spawn("python", ["-u", path.join(__dirname, "hello.py")]);
  }
  const subprocess = runScript();
  // print output of script
  subprocess.stdout.on("data", data => {
    console.log(`data:${data}`);
    res.send(data);
  });
});

module.exports = router;
