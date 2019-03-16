var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Page_2', { title: 'Express' });
});

router.get('/start/:start/end/:end', function(req, res, next) {
  console.log(req.path);
  console.log(req.params);
});
module.exports = router;
