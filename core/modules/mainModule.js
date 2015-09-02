var config = require('config');
var path = require('path');
var express = require('express');
var app = express();
var io = require("socket.io")(['websocket', 'polling']);
var _ = require('lodash');

var mModules;

/**
* Execute method specified by funcName if present on all modules
* @param {Array} modules
* @return {Void}
**/
function callModules(funcName, arg) {
	console.log('callModules');

	if(mModules=="undefined")
		throw("setupModules should be called first");

	for(var i=0; i<mModules.length; i++){
        mModules[i][funcName](arg);
	}
}

function initApp(){

	app.set('port', process.env.PORT || config.application.port);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	var www = path.resolve(__dirname + '../../../public');
	app.use(express.static(www, {index:config.application.startURL}));

	app.get('/', function(req, res){
	  res.send('index.html');
	});

	var server = app.listen(process.env.PORT || app.get('port'), config.application.host, null, function () {
	    console.log('Express server listening on port '+app.get('port')+' in '+app.get('env')+' mode');

	    callModules('setupApp', app);
		callModules('setupSocketIO', io);
	});

	io.attach(server);
}

function setupModulesAndServices(_modules){
	mModules = _modules;
	initApp();	
}

module.exports = {
	setupModulesAndServices:setupModulesAndServices
}

