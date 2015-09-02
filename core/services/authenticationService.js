var io, app;

function setupApp(_app){

}

function setupSocketIO(_io){
	console.log('authenticationService::setupSocketIO')
	var io = _io;

	io.use(function(socket, next){
	  	if (socket.request.headers.cookie) return next();
	  	next(new Error('Authentication error'));
	});

	io.on('connection', function(socket){	
	console.log('Got new connection.', socket.id);

	socket.auth = false;
	socket.on('disconnect', function(){
		console.log('socket disconnected');
	});

	socket.on('authenticate', function(data){
	    //check the auth data sent by the client
	    checkAuthToken(data['uid'], data['token'], function(err, success){
		    	if (!err && success){
		        	console.log("Authenticated socket id:"+ socket.id);
		        	socket['auth'] 	= true;

		        	socket['token'] = data['token'];
		        	socket['uid'] 	= data['uid'];
		        	//listener.emit('newSocketAuthenticated', socket);
		      	}else if(err && !success){
					console.log("Unauthenticated socket disconnecting socket id:"+socket.id);
		      		socket.disconnect(err);
		      	}
	    	});
  		});
  	});
}

function checkAuthToken(id, token, callback){
	// Need to be fixed check id too 
	console.log('checkAuthToken id:'+id+', token:'+token);

	if(token=='EA934441-90A8-4DEA-BFA1-4E16607ECACF')
		callback(null, true);
	else
		callback('Token or UID Invalid.', false);
}

module.exports = {
	setupApp:setupApp,
	setupSocketIO:setupSocketIO
}