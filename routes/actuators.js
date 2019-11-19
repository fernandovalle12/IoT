var express = require('express');
var switchesService = require('../services/switchService');
var router = express.Router();
// var uploader = require('../../middlewares/uploaderMiddleware');

var switchService = require('../services/switchService');

router.get('/:id', function (req, res, next) {
  let actuators = switchService.loadFileActuatorStatus();
  let actuator = actuators.find((element) => element.id == req.params.id);

  if(actuator.status == 1) actuator.status = 0
  else actuator.status = 1

  var data = JSON.stringify(actuators);
  switchService.saveFileNewStatus(data);
  var switches = switchesService.getSwitches();
  res.render('', {title: "Switch", switches});
});

module.exports = router;