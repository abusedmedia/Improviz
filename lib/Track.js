var Sequence = require('./Sequence.js');
/*

------ TRACK CLASS ------

// Copyright (c) 2013 Fabio Franchino. All rights reserved.
// MIT License
*/
var Track = function(ch, pt){

	'use strict'
	
	this.sequences = [];
	
	this.channel = (ch) ? ch : 1;
	this.duration = 0;
	this.offset = 0;
	this.pattern = (pt) ? pt : [false];
	this.progressLoop = 0;

	this.mute = this.pattern[0];
	this.muted = false;

	this.player;



	this.add = function(sequence){
		this.sequences.push(sequence);
		sequence.updateChannel()
		sequence.track = this;
		this.updateDuration();
		this.setChannel(this.channel);

		this.changed();
	}

	this.get = function(index){
		return (this.sequences.length>index) ? this.sequences[index] : null;
	}





	this.getLast = function(){
		return (this.sequences.length>0) ? this.get(this.sequences.length-1) : null;
	}



	this.updateProgress = function(){

		this.progressLoop++;

		if( this.progressLoop >= this.pattern.length ){
			this.progressLoop = 0;
		}

		this.mute = (this.muted) ? this.muted : this.pattern[this.progressLoop];

	}





	this.updateDuration = function(){
		this.duration = 0;
		for(var i=0; i<this.sequences.length; ++i){
			var s = this.sequences[i];
			this.duration += s.offset + s.duration;
		}
		if(this.player) this.player.updateDuration();
	}





	this.reset = function(){
		this.sequences = [];
		this.duration = 0;
		this.changed();
	}



	this.remove = function(s){
		var index = this.sequences.indexOf(s);
		//this.offNotes( s );
		this.sequences.splice(index, 1)
		this.changed();
	}




	this.removeLast = function(){
		var s = this.getLast();
		if(s) this.remove(s);
	}




	this.setChannel = function(ch){
		this.channel = ch;
		for(var i=0; i<this.sequences.length; ++i){
			var s = this.sequences[i];
			s.setChannel(ch);
		}
	}





	this.indexOf = function(sq){
		return this.sequences.indexOf(sq);
	}





	this.getAllNotes = function(){
		var res = [];
		for(var i=0; i<this.sequences.length; ++i){
			var s = this.sequences[i];
			res = res.concat(s.getAllNotes())
		}
		return res;
	}


	this.changed = function(){
		if(this.player) this.player.changed();
	}

	this.getJson = function(){
		var t = {duration:this.duration, offset:this.offset, channel:this.channel, pattern:this.pattern, sequences:[]};
		for(var j=0; j<this.sequences.length; j++){
			var sequence = this.sequences[j];
			t.sequences.push( sequence.getJson() )
		}
		return t;
	}

	this.fromJson = function(sequences){
		var sqcs = (sequences instanceof Array) ? sequences : [sequences];
		for(var i=0; i < sqcs.length; i++){
			var s = sqcs[i];
			var ns = new Sequence(s.channel, s.pattern);
			ns.fromJson(s.notes);
			this.add(ns);
		}
	}

	this.save = function(_name){
		var now = new Date();
		var name = (_name) ? _name : 'track_' + now.getTime();
		if(fs.existsSync(name + '.json')) name = name + now.getTime();
		name = name + '.json';
		fs.writeFile(name, JSON.stringify(this.getJson()), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("Track saved as", name);
		    }
		}); 
	}

}

module.exports = Track;

