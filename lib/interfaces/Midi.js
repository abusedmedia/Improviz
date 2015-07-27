var midi = require('midi');


var Midi = function(port){

	'use strict'

	var inited = false;
	this.currentPort;
	this.output = new midi.output();

	var numports = this.output.getPortCount();
	for(var i=0; i<numports; ++i){
		console.log('port available: ', this.output.getPortName(i));
	}

	this.setMidiOut = function(num){
		if(num>numports-1){
			console.error('setMidiOut: ', num, "exceeded");
			return
		}
		if(this.currentPort) this.output.closePort(this.currentPort);
		this.output.openPort(num);
		this.currentPort = num;
		console.log('MidiPortOut: ', this.output.getPortName(num));

	}

	this.setMidiOut(port);

	this.setInstrument = function(instrument, channel){
		var ch = 0xC0 + channel;
	}


	this.getMidiPorts = function(){
		return this.output.getPortCount();
	}



	this.sanitize = function(v, mn, mx){
		if(v>=mn && v<=mx){
			return v;
		}else{
			return 0;
		}
	}


	this.noteOn = function(note){
		var nt  =  this.sanitize( note.note, 0, 127 );
		var ch  =  this.sanitize( note.channel-1, 0, 15 );
		var vl  =  this.sanitize( note.velocity, 0, 127 );
		this.output.sendMessage([0x90+ch,nt,vl]);
	}


	this.noteOff = function(note){
		var nt  =  this.sanitize( note.note, 0, 127 );
		var ch  =  this.sanitize( note.channel-1, 0, 15 );
		var vl  =  this.sanitize( note.velocity, 0, 127 );
		this.output.sendMessage([0x80+ch, nt, vl]);
	}

	this.offAllNotes = function(){
	}
}



module.exports = Midi;