var express = require('express');
var router = express.Router();
// var uploader = require('../../middlewares/uploaderMiddleware');

var sensorService = require('../../services/sersorService');

router.get('/', function (req, res, next) {
  var sensores = sensorService.getSensores();

  res.render('admin/sensores/index', { sensores });
});

router.get('/create/:id', function (req, res, next) {

  res.render('admin/sensores/create');
});

router.get('/medicoes/:id', function (req, res, next) {
  var sensores = sensorService.getSensores();
  var sensor = sensores.find((sensor) => sensor.id == req.params.id);

  res.render('medicoes', { title: sensor.name, meds: sensor.med });
});

router.get('/grafic', function (req, res, next) {
  res.render('grafic');
});

router.post('/create', function (req, res, next) {
  var sensores = sensorService.getSensores();

  var newId = sensores.length + 1;

  var newSensor = {};
  newSensor.id = newId;
  newSensor.name = req.body.name;
  newSensor.model = req.body.model;
  newSensor.description = req.body.description;
  newSensor.med = [];

  sensorService.saveSensor(newSensor);

  res.redirect('/admin/sensores');
});

router.post('/:id/add', function (req, res, next) {
  var id = req.params.id;
  var t = req.body.temperature;
  var h = req.body.humidity;
  var hr = new Date();
  sensorService.addMedicoes(id, { temperatura: t, umidade: h, hora: hr});
  
  var sensores = sensorService.loadFileSensores();
  var sensor = sensores.find((sensor) => sensor.id == id);

  var temperatura = sensor.med[sensor.med.length - 1].temperatura;
  var umidade = sensor.med[sensor.med.length - 1].umidade;

  res.status(200).json({temperature: temperatura, humidity: umidade});
});

module.exports = router;