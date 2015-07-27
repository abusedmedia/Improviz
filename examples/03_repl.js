// simple run: node <name.js>
// dev run: nodemon <name.js> --watch <path folder>

/*
Repl example with accessible and already present pattern code
You can access to sketch methods in console like:

SKETCH.p.pause()

or

SKETCH.t.add( new Sequence() )
*/


var myrepl = require("repl").start({useGlobal:true});
myrepl.context = require('./../lib/Improviz.js');

// you can create many functions with different name
SKETCH = new function(){

	// you need to use the 'this' keyword to expose variables in console

	this.m = new Midi(1);
	this.p = new Player(this.m);

	this.t = new Track();
	this.p.add(this.t);

	this.s = new Sequence();
	this.t.add(this.s);

	for(var i=0; i<12; ++i){
		var n = new Note( 60+i, 10, 127);
	    this.s.add(n);
	}

	this.p.play();

}
