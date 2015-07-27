var NanoTimer = require('nanotimer');
var EventTarget = require('./EventTarget.js');
var Chord = require('./Chord.js');
var Note = require('./Note.js');
var Session = require('./Sequence.js');
var Track = require('./Track.js');
var fs = require('fs');

/*

------ PLAYER CLASS ------

// Copyright (c) 2013 Fabio Franchino. All rights reserved.
// MIT License
*/

var Player = function(drvr){

	'use strict'

	var time = 0;
	var interval;
	var intervalfc;

	this.tracks = []
	this.duration = 0;
	this.driver = drvr;

	this.session_name = '';

	var that = this;

	var timer = new NanoTimer();

	this.dispose = function(){

		this.pause();

		for(var i=0; i<this.tracks.length; i++){
			var track = this.tracks[i];
			this.offNotes( track );
		}
		this.tracks = [];
		this.duration = 0;

		console.log('dispose');

		this.fire({type:"changed"});
	}






	this.offNotes = function(t){
		var nts = t.getAllNotes();
		for(var n in nts){
			var nt = nts[n];
			if(nt instanceof Chord){
				for(var l = 0; l<nt.notes.length; ++l){
					var cnote = nt.notes[l];
					this.noteOff(cnote, t);
				}
			}else{
				this.noteOff(nt, t);
			}
		}
	}






	this.pause = function(){

		console.log('Player pause');

		timer.clearInterval(_tick);

		this.fire({type:"changed"});

		return this;
	}






	this.play = function(){

		this.pause();

		console.log('Player play');

		timer.setInterval(_tick, '', '10m');

		this.fire({type:"changed"});

		return this;
	}





	// why use the driver on track and not on the player?
	this.noteOn = function(note, track){
		if(!note.isoff){
			this.noteOff(note, track)
		}
		this.driver.noteOn(note)
	}





	// why use the driver on track and not on the player?
	this.noteOff = function(note, track){
		note.isoff = true;
		this.driver.noteOff(note)
	}





	this.reset = function(){
		this.tracks = [];
		this.duration = 0;
		this.fire({type:"changed"});
	}






	this.add = function(track){
		this.tracks.push(track);
		track.player = this;
		track.driver = ( !track.driver )  ?  this.driver  :  track.driver;
		this.updateDuration()
		this.fire({type:"changed"});
	}






	this.get = function(index){
		return (this.tracks.length>index) ? this.tracks[index] : null;
	}






	this.getLast = function(){
		return (this.tracks.length>0) ? this.get(this.tracks.length-1) : null;
	}





	this.remove = function(t){
		var index = this.tracks.indexOf(t);
		this.offNotes( t );
		this.tracks.splice(index, 1)
		this.changed();
	}





	this.removeLast = function(){
		var t = this.getLast();
		if(t) this.remove(t);
	}





	this.updateDuration = function(){
		this.duration = 0;
		var ptemp = 0;
		for(var i=0; i<this.tracks.length; ++i){
			var t = this.tracks[i];
			var temp = t.offset + t.duration;
			this.duration = Math.max(temp, ptemp);
			ptemp = temp;
		}
	}


	this.changed = function(){
		this.fire({type:"changed"});
	}




	var _tick = function(){

		var tempo_player = time % that.duration;

		for(var i=0; i<that.tracks.length; i++){

			var track = that.tracks[i];

			var tempo = time % track.duration;

			var tmin = track.offset;
			var tmax = tmin + track.duration;

			if(tempo >= tmin ){ //  && tempo <= tmax

				var seq_progress_duration = 0;

				for(var j=0; j<track.sequences.length; j++){

					var sequence = track.sequences[j];

					var smin = tmin + sequence.offset + seq_progress_duration;
					var smax = smin + sequence.duration;

					if(tempo >= smin ){ //  && tempo <= smax

						var note_progress_duration = 0;

						for(var k=0; k<sequence.notes.length; k++){

							var note = sequence.notes[k];

							var calc_note_tempo = smin + note_progress_duration;

							// note off routine
							var ctim = calc_note_tempo + note.offset + note.duration - 1;

							if(tempo == ctim + note.liveness){
								if(!track.mute && !sequence.mute && !note.mute){
									if(note instanceof Chord){
										for(var l = 0; l<note.notes.length; ++l){
											var cnote = note.notes[l];
											that.noteOff(cnote, track);
										}
									}else{
										that.noteOff(note, track);
									}
								}
							}

							if(tempo == ctim){
								
								if( sequence.indexOf(note) == sequence.notes.length-1 ){
									that.fire({type:"endSequence", sequence:sequence});
									sequence.updateProgress();

									if(track.sequences.indexOf(sequence) == track.sequences.length-1 ){
										that.fire({type:"endTrack", track:track});
										track.updateProgress();
									}
								}
							}

							// note on routine
							if(tempo == calc_note_tempo + note.offset + note.glitch){

								if(!track.mute && !sequence.mute && !note.mute){
									if(note instanceof Chord){
										for(var l = 0; l < note.notes.length; ++l){
											var cnote = note.notes[l];
											that.noteOn(cnote, track);
										}
									}else{
										that.noteOn(note, track);
									}
								}

								if( sequence.indexOf(note) == 0 ){
									that.fire({type:"startSequence", sequence:sequence});
								}
							}

							note_progress_duration += (note.offset + note.duration);
						}

					}

					seq_progress_duration += (sequence.offset + sequence.duration)

				}

			}
			
		}

		if(tempo_player == that.duration-1){
			that.fire({type:"endPlayer", player:that});
		}

		time += 1;

	}





	this.getJson = function(){
		var res = {player:{duration:this.duration, tracks:[]}}
		for(var i=0; i<this.tracks.length; i++){
			var track = this.tracks[i];
			res.player.tracks.push( track.getJson() );
		}
		return res;
	}






	this.save = function(_name){
		var now = new Date();
		var name = (_name) ? _name : 'player_' + now.getTime();
		if(fs.existsSync(name + '.json')) name = name + now.getTime();
		name = name + '.json';
		fs.writeFile(name, JSON.stringify(this.getJson()), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("Player saved as", name);
		    }
		});  
	}


	this.fromJson = function(tracks){
		var trks = (tracks instanceof Array) ? tracks : [tracks];
		for(var i=0; i < trks.length; i++){
			var t = trks[i];
			var nt = new Track(t.channel, t.pattern);
			nt.fromJson(t.sequences);
			this.add(nt);
		}
	}



}


Player.prototype = new EventTarget();
Player.prototype.constructor = Player;

module.exports = Player;
