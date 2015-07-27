// simple run: node <name.js>
// dev run: nodemon <name.js> --watch <path folder>

/*
Simple REPL example
Import the lib, then write code in the console
No needs to stop the runner
*/

var myrepl = require("repl").start({useGlobal:true});
myrepl.context = require('./../lib/Improviz.js');

/*
// REPL example, write this in console, line by line
var m = new Midi(1);
var p = new Player(m);

var t = new Track();
p.add(t);

var s = new Sequence();
t.add(s);

s.add( new Note(60, 100, 127))

p.play()
*/

