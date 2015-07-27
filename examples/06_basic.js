// simple run: node <name.js>
// dev run: nodemon <name.js> --watch <path folder>

/*
Example about load external fragment (06ba.js) for modularization purposes
*/

require('./../lib/Improviz.js');

var m = new Midi(1); // port number, check the correct number

// ake the 'p' variable as global since you are going to use in required file below
p = new Player(m);
p.play();

require('./06ba.js');