var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Sup Bitch");
 // res.render('index', { title: 'Express' });
});

module.exports = router;
