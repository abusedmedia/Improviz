// simple run: node <name.js>
// dev run: nodemon <name.js> --watch <path folder>

/*
Simplest example
Import the lib, then write the pattern code straight after
*/

require('./../lib/Browserified.js');

// create the player and
// we are going to use all the available interfaces
var p = new Player();
p.addInterface(new Console())
p.play();

var t = new Track(0);
p.add(t);

var s = new Sequence();
t.add(s);

var n = new Note( 60, 100, 127);
s.add(n);


