// simple run: node <name.js> <port num>
// dev run: nodemon <name.js> <port num> --watch <path folder>

/*
Example showing some helper functions like random and note picker
*/

require('./../lib/Improviz.js');


var m = new Midi(1); // port number, check the correct number
var p = new Player(m);
p.play();


var notes = ["C6", "B5", "C5", "D5", "A5", "B4", "C4", "D4", "E4", "A3", "C3", "D3", "F3", "A2", "C2", "F2"];

var t = new Track();
p.add(t);

var s = new Sequence();
t.add(s);

for(var i=0; i<16; ++i){
	var index = RND(0, notes.length-1);
	var nt = NTE( notes[index] );
	var dur = 10*RND(1, 10);
	var n = new Note(nt, dur, RND(80, 127))
	s.add(n)
}


