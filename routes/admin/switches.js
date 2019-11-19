var express = require('express');
var router = express.Router();
// var uploader = require('../../middlewares/uploaderMiddleware');

var switchService = require('../../services/switchService');

router.get('/', function (req, res, next) {
  var switches = switchService.getSwitches();

  res.render('admin/switches/index', {switches});
});

router.get('/create', function (req, res, next) {

  res.render('admin/switches/create');
});

router.post('/create', function (req, res, next) {
  var switches = switchService.getSwitches();

  var newId = switches.length + 1;

  var newSwitch = {};
  newSwitch.id = newId;
  newSwitch.image = req.body.image;
  newSwitch.title = req.body.title;
  newSwitch.description = req.body.description;

  switchService.saveSwitch(newSwitch);

  res.redirect('/admin/switches');
});

router.post('/:id', function(req, res, next) {
  var estadoAtual = switchService.getEstadoLed(req.params.id);

  newStatus.status = req.body.status;
  console.log(estadoAtual)
  if(estadoAtual == 0){
    newStatus.status = 1
  } else {
    newStatus.status = 0
  }

  switchService.saveSwitch(newStatus)
});

module.exports = router;