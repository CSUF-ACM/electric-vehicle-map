var express = require('express');
var url = require('url');
var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  console.log(__filename);
  next();
});
var make2, model,size;
/* GET home page. */
router.get('/', function(req, res, next) {
  var query = req.query;
  res.render('index', { title: 'Express' });
});

router.get('/pageTwo', function(req, res, next) {
  var mile = req.query.Mileage;
  res.render('Page_2', { title: 'Express2' });
  console.log("ths is mile",mile);
  

});


module.exports = router;
