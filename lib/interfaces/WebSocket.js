var express = require('express');



var WebSocket = function(){

	'use strict'

	var connClb
	var disconnClb
	var muteClb
	var removeTrackClb

	var app = express();
	var http = require('http').Server(app);
	var io = require('socket.io').listen(http);

	var connected = false;

	io.on('connection', function(socket){

	  	connected = true;
	  	console.log('a user connected');
	  	if(connClb) connClb()

	    socket.on('disconnect', function(){

		  	connected = false;
		    console.log('user disconnected');
		    if(disconnClb) disconnClb()

	    });

		socket.on('mute', function(index){
			if(muteClb) muteClb(index)
		})

		socket.on('removeTrack', function(index){
			if(removeTrackClb) removeTrackClb(index)
		})
	});





	app.use(express.static(process.env.PWD + '/'));

	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});



	this.noteOn = function(note){
		if(connected){
			io.emit('noteOn', note);
		}
	}


	this.noteOff = function(note){
		if(connected){
			io.emit('noteOff', note);
		}
	}

	this.emit = function(data){
		if(connected){
			io.emit('updated', data);
		}
	}

	this.connect = function(clb){
		connClb = clb
	}

	this.disconnect = function(clb){
		disconnClb = clb
	}

	this.mute = function(clb){
		muteClb = clb
	}

	this.removeTrack = function(clb){
		removeTrackClb = clb
	}


}


module.exports = WebSocket;