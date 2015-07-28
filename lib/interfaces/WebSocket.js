var express = require('express');



var WebSocket = function(){

	'use strict'

	var app = express();
	var http = require('http').Server(app);
	var io = require('socket.io').listen(http);

	var connected = false;

	io.on('connection', function(socket){
	  console.log('a user connected');
	  connected = true;
	  socket.on('disconnect', function(){
	  	connected = false;
	    console.log('user disconnected');
	  });
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


}


module.exports = WebSocket;