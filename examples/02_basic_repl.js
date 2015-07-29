//  run: node <name.js>

/*
Simple REPL example
Import the lib, then write code in the console
No needs to stop the runner
*/

var myrepl = require("repl").start({useGlobal:true});
myrepl.context = require('./../lib/Improviz.js');



/*
You can access the 'P' (since it's global) object from the console
The code below will be the starting point
You can modify during run time from the node.js console though
*/
S = new WebSocket();

P = new Player();
P.addInterface(new Midi(1))
P.addInterface(S)
P.play();

var t = new Track(0);
P.add(t);

var s = new Sequence();
t.add(s);

var n = new Note( 60, 100, 127);
s.add(n);


