var express = require('express');
var switchesService = require('../services/switchService');
var router = express.Router();
// var uploader = require('../../middlewares/uploaderMiddleware');

var switchService = require('../services/switchService');
var sensoresService = require('../services/sersorService');

router.get('/change/:id', function (req, res, next) {
  let actuators = switchService.loadFileSwitches();
  let actuator = actuators.find((element) => element.id == req.params.id);

  if (actuator.status == 1) {
    actuator.status = 0
  } else {
      actuator.status = 1
  }

  var data = JSON.stringify(actuators);
  switchService.saveFileNewStatus(data);
  var switches = switchesService.getSwitches();
  
  var switches = switchesService.getSwitches();
  var sensores = sensoresService.getSensores();

  res.render('index', { title: 'Switches', switches: switches, sensores});
});

router.get('/:id', function (req, res, next) {
  let actuators = switchService.loadFileSwitches();
  let actuator = actuators.find((element) => element.id == req.params.id);

  res.json({id: actuator.id, name: actuator.title, status: actuator.status});
});

module.exports = router;