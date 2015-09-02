var main 	= require('./core/modules/mainModule.js');
var modules = [
		require('./core/modules/customModuleExample.js'),
		require('./core/services/authenticationService.js')
	]
	
main.setupModulesAndServices(modules);


	