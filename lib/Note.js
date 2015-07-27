
/*

------ NOTE CLASS ------

// Copyright (c) 2013 Fabio Franchino. All rights reserved.
// MIT License
*/
var Note = function(nt, dr, vl, ch, off, glt){

	'use strict'
	
	this.note = nt;
	this.duration = (dr)?dr:40;
	this.velocity = (vl)?vl:127;
	this.channel = (ch)?ch:1;
	this.offset = (off)?off:0;
	this.glitch = (glt)?glt:0;

	this.mute = false;
	this.liveness = 0;
	this.pan = 0;

	this.isoff = false;




	this.setPersistence = function(v){
		var ps = 227/127*v - (this.duration-2);
		this.liveness = parseInt(ps);
	}


	this.setChannel = function(ch){
		this.channel = ch;
	}



	this.clone = function(){
		var cloned = new Note(this.note, this.duration, this.velocity, this.channel, this.offset);
		cloned.mute = this.mute;
		cloned.liveness = this.liveness;
		cloned.pan = this.pan;
		return cloned;
	}

	this.getJson = function(){
		return {type:'note', duration:this.duration, offset:this.offset, velocity:this.velocity, channel:this.channel, note:this.note}
	}

}

module.exports = Note;
