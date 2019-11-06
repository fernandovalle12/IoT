var fs = require('fs');

var switchesFilePath = 'db/switch.json';

var loadFileSwitches = function() {
  var fileData = fs.readFileSync(switchesFilePath, 'utf8');
  var switches = JSON.parse(fileData);

  return switches;
}

var saveFileSwitch = function(switches) {
  var data = JSON.stringify(switches);
  fs.writeFileSync(switchesFilePath, data, 'utf8');
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

module.exports = {
    getSwitches: getSwitches,
    saveSwitch: saveSwitch
}