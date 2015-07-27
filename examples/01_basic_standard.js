// simple run: node <name.js>
// dev run: nodemon <name.js> --watch <path folder>

/*
Simplest example
Import the lib, then write the pattern code straight after
*/

require('./../lib/Improviz.js');


// we are going to use as interface the console.log
var c = new Console();
var m = new Midi(1);
var s = new Socket();

var p = new Player();
p.addInterface(c)
p.addInterface(m)
p.addInterface(s)
p.play();

var t = new Track(0);
p.add(t);

var s = new Sequence();
t.add(s);

var n = new Note( 60, 100, 127);
s.add(n);


