// simple run: node <name.js>
// dev run: nodemon <name.js> --watch <path folder>

/*
Simplest example
Import the lib, then write the pattern code straight after
*/

require('./../lib/Improviz.js');


var m = new Midi(1); // port number, check the correct number
var p = new Player(m);
p.play();

var t = new Track(0);
p.add(t);

var s = new Sequence();
t.add(s);

for(var i=0; i<12; ++i){
	var n = new Note( 60+i, 100, 127);
    s.add(n);
}


