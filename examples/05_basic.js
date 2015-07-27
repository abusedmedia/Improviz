// simple run: node <name.js> <port num>
// dev run: nodemon <name.js> <port num> --watch <path folder>

/*
Example showing how to use a dumped track
Type in REPL console:
S.p.play() to start the player
*/


var myrepl = require("repl").start({useGlobal:true});
myrepl.context = require('./../lib/Improviz.js');


SKETCH = new function(){

	var m = new Midi(1);
	this.p = new Player(m);

	this.p.fromJson( require('./dumps/track_1404670955513.json') );
	this.p.tracks[0].setChannel(5); // marimba
	this.p.tracks[0].muted=false;
}



// p.fromJson( require('./dumps/1.json') );
// p.tracks[1].setChannel(2); // guitar 12chrds
// p.tracks[1].muted=true;

// p.fromJson( require('./dumps/piano1.json') );
// p.tracks[2].setChannel(1); // piano
// p.tracks[2].muted=true;
