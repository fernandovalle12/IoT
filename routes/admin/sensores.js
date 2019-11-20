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
  newSensor.med = [];

  sensorService.saveSensor(newSensor);

  res.redirect('/admin/sensores');
});

router.get('/:id/add', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  var t = req.query.temperatura;
  var h = req.query.umidade;
  console.log("teste = " + t);
  sensorService.addMedicoes(id, { temperatura: t, umidade: h});

  res.status(401).json({ d: 'dsad'});
});

module.exports = router;