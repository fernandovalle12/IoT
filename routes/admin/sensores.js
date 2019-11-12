var express = require('express');
var router = express.Router();
// var uploader = require('../../middlewares/uploaderMiddleware');

var sensorService = require('../../services/sersorService');

router.get('/', function (req, res, next) {
  var sensores = sensorService.getSensores();

  res.render('admin/sensores/index', { sensores });
});

router.get('/create', function (req, res, next) {

  res.render('admin/sensores/create');
});

router.post('/create', function (req, res, next) {
  var sensores = sensorService.getSensores();

  var newId = sensores.length + 1;

  var newSensor = {};
  newSensor.id = newId;
  newSensor.name = req.body.name;
  newSensor.model = req.body.model;
  newSensor.description = req.body.description;

  sensorService.saveSensor(newSensor);

  res.redirect('/admin/sensores');
});

module.exports = router;