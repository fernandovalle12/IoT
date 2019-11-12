var fs = require('fs');

var sensorFilePath = 'db/sensor.json';

var loadFileSensores = function() {
  var fileData = fs.readFileSync(sensorFilePath, 'utf8');
  var sensores = JSON.parse(fileData);

  return sensores;
}

var saveFileSensores = function(sensores) {
  var data = JSON.stringify(sensores);
  fs.writeFileSync(sensorFilePath, data, 'utf8');
}

var getSensores = function() {
  var sensores = loadFileSensores();
  return sensores;
}

var saveSensor = function(newSensor) {
  var sensores = loadFileSensores();
  sensores.push(newSensor);
  saveFileSensores(sensores);
}

module.exports = {
  getSensores: getSensores,
  saveSensor: saveSensor
}