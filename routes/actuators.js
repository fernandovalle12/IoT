var express = require('express');
var router = express.Router();
// var uploader = require('../../middlewares/uploaderMiddleware');

var switchService = require('../services/switchService');

router.get('/:id', function(req, res, next) {
  var actuator = switchService.getEstadoLed(req.params.id);

  newStatus = actuator.status;
  if(newStatus == 0){
    newStatus = 1;
  } else {
    newStatus = 0;
  }

  switchService.saveNewActuator(newStatus);
  res.render('/index');
});

module.exports = router;