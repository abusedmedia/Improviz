var Chord = require('./Chord.js');
var Note = require('./Note.js');
/*

------ SEQUENCE CLASS ------

// Copyright (c) 2013 Fabio Franchino. All rights reserved.
// MIT License
*/
var Sequence = function(ch, pt){

	'use strict'
	
	this.notes = [];
	
	this.channel = (ch) ? ch : 1;

	this.duration = 0;
	this.offset = 0;

	this.pattern = (pt) ? pt : [false];
	this.progressLoop = 0;

	this.mute = this.pattern[0];
	this.muted = false;





	this.add = function(n){

		n.channel = this.channel;

		this.notes.push(n);

		this.updateDuration();
		this.setChannel(this.channel);

		this.changed();
	}





	this.updateProgress = function(){

		this.progressLoop++;

		if( this.progressLoop >= this.pattern.length ){
			this.progressLoop = 0;
		}

		this.mute = (this.muted) ? this.muted : this.pattern[this.progressLoop];

	}





	this.reset = function(){
		this.notes = []
		this.duration = 0;
		this.changed();
	}





	this.indexOf = function(nt){
		return this.notes.indexOf(nt);
	}





	this.updateChannel = function(){
		if(this.channel == -1){
			this.channel = this.track.channel
		}
	}





	this.setChannel = function(ch){
		this.channel = ch;
		for(var i=0;i<this.notes.length;++i){
			this.notes[i].setChannel(ch);

		}
	}






	this.updateDuration = function(){
		this.duration = 0;
		for(var i=0;i<this.notes.length;++i){
			this.duration += this.notes[i].offset + this.notes[i].duration;
		}
		if(this.track) this.track.updateDuration();
	}





	this.getAllNotes = function(){
		return this.notes;
	}




	this.changed = function(){
		if(this.track) this.track.changed();
	}


	this.getJson = function(){
		var s = {duration:this.duration, offset:this.offset, channel:this.channel, pattern:this.pattern, notes:[]};

		for(var k=0; k<this.notes.length; k++){
			var note = this.notes[k];
			s.notes.push( note.getJson() );
		}

		return s;
	}

	this.fromJson = function(notes){
		var nts = (notes instanceof Array) ? notes : [notes];
		for(var i=0; i < nts.length; i++){
			var n = nts[i];
			if(n.type == 'chord'){
				var crd = new Chord();
				crd.fromJson(n.notes);
				this.add(crd);
			}else{
				var nn = new Note(n.note, n.duration, n.velocity, n.channel, n.offset);
				this.add(nn);
			}
		}
	}

}

module.exports = Sequence;

