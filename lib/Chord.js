var Note = require('./Note.js');
/*

------ CHORD CLASS ------

// Copyright (c) 2013 Fabio Franchino. All rights reserved.
// MIT License
*/
var Chord = function(ch, off){

	'use strict'
	
	this.notes = [];
	
	this.duration = 0;
	this.offset = (off)?off:0;
	this.mute = false;

	this.channel = (ch)?ch:0;

	

	this.add = function(n){

		n.channel = this.channel;

		this.notes.push(n);

		this.updateDuration();
		this.setChannel(this.channel);
	}




	this.setChannel = function(ch){
		this.channel = ch;
		for(var i=0;i<this.notes.length;++i){
			this.notes[i].setChannel(ch);
		}
	}
	


	this.updateDuration = function(){
		this.duration = 0;
		var ptemp = 0;
		for(var i=0;i<this.notes.length;++i){
			var n = this.notes[i];
			var temp = n.offset + n.duration;
			this.duration = Math.max(temp, ptemp);
			ptemp = temp;
		}
		if(this.sequence) this.sequence.updateDuration();
	}

	this.getJson = function(){
		var chrd = {type:'chord', duration:this.duration, offset:this.offset, channel:this.channel, notes:[]};
		for(var h=0; h<this.notes.length; h++){
			var nt = this.notes[h];
			chrd.notes.push( nt.getJson() );
		}
		return chrd;
	}

	this.fromJson = function(notes){
		for(var h=0; h < notes.length; h++){
			var cn = notes[h]
			var ncn = new Note(cn.note, cn.duration, cn.velocity, cn.channel, cn.offset);
			this.add(ncn);
		}
	}
}

module.exports = Chord;