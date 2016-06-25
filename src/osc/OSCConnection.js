'use strict';

var OSCConnection = {
	start: function(){
		var socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: true});
		  socket.on('connect', function() {
		// sends to socket.io server the host/port of oscServer
		// and oscClient
		socket.emit('config',
		    {
		        server: {
		            port: 7400,
		            host: '127.0.0.1'
		        },
		        client: {
		            port: 7400,
		            host: '127.0.0.1'
		        }
		        // server: {
		        //     port: 3333,
		        //     host: '127.0.0.1'
		        // },
		        // client: {
		        //     port: 3333,
		        //     host: '127.0.0.1'
		        // }
		    }
		);
		});

		var isOnce = true;
		var isOnce2 = true;
			var parser = new OSCMessageParser()
		socket.on('message', function(obj) {
			if(isOnce2){
				parser.setup();
				isOnce2 = false;
			}
			parser.parse(obj)
			if(isOnce){
				window.echoingEgo.initializeOnFrame();	
				isOnce = false;
			}
		});
    }
}