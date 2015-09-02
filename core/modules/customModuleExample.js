var config = require('config').modules.customExample;
var app, io;

console.log(config.message);

function setupApp(_app){
	console.log('setupApp');
	app = _app;
}

function setupSocketIO(_io){
	console.log('setupSocketIO');
	io = _io;
}

module.exports = {
	setupApp:setupApp,
	setupSocketIO:setupSocketIO
}