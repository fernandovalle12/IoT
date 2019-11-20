var fs = require('fs');

var switchesFilePath = 'db/switch.json';
var actuartorsFilePath = 'db/actuators.json'

var loadFileSwitches = function() {
  var fileData = fs.readFileSync(switchesFilePath, 'utf8');
  var switches = JSON.parse(fileData);

  return switches;
}

// var loadFileActuatorStatus = function() {
//   var fileData = fs.readFileSync(actuartorsFilePath, 'utf8');
//   var actuator = JSON.parse(fileData);

//   return actuator;
// }

var saveFileSwitch = function(switches) {
  var data = JSON.stringify(switches);
  fs.writeFileSync(switchesFilePath, data, 'utf8');
}

var saveFileNewStatus = function(newStatus){
  fs.writeFileSync(switchesFilePath, newStatus, 'utf8');
}

var getSwitches = function() {
  var switches = loadFileSwitches();
  return switches;
}

var getSwitches = function() {
  var switches = loadFileSwitches();
  return switches;
}

var saveSwitch = function(newSwitch) {
  var switches = loadFileSwitches();
  switches.push(newSwitch);
  saveFileSwitch(switches);
}

var getEstadoLed = function(id) {
  var switches = getSwitches();
  var actuators = switches.find((actuators) => actuators.id == id);
  return actuators;
}


module.exports = {
    getSwitches: getSwitches,
    saveSwitch: saveSwitch,
    getEstadoLed: getEstadoLed,
    saveFileNewStatus: saveFileNewStatus,
    // loadFileActuatorStatus: loadFileActuatorStatus,
    loadFileSwitches: loadFileSwitches
}