var express = require("express");
var router = express.Router();
const path = require("path");
const { spawn } = require("child_process");

/* GET temperature listing. */
router.get("/", function(req, res, next) {
  function runScript() {
    return spawn("python", [
      "-u",
      path.join(__dirname, "temperature.py"),
      "--foo",
      "some value for foo"
    ]);
  }
  const subprocess = runScript();
  // print output of script
  subprocess.stdout.on("data", data => {
    console.log(`data:${data}`);
    res.send(data);
  });
  subprocess.stderr.on("data", data => {
    console.log(`error:${data}`);
    res.send(data);
  });
  subprocess.stderr.on("close", () => {
    console.log("Closed");
  });
});

module.exports = router;
