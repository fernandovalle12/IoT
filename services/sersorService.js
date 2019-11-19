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

var update = function(data) {
  sensores.find()
  saveFileSensores(sensores);
}

var addMedicoes = function(id, props) {
  var sensores = loadFileSensores();
  var sensor = sensores.find((sensor) => sensor.id == id);
  sensor.med.push(props);
  console.log(sensor);
  saveFileSensores(sensores);
}

module.exports = {
  getSensores: getSensores,
  saveSensor: saveSensor,
  addMedicoes: addMedicoes
}