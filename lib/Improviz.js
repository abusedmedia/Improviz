Midi = require('./Midi.js');
Player = require('./Player.js');
Track = require('./Track.js');
Sequence = require('./Sequence.js');
Chord = require('./Chord.js');
Note = require('./Note.js');
Utils = require('./Utils.js');
Equations = require('./Equations.js');

// shortcuts
rn = Utils.rnd;

RND = Utils.random;
PIK = Utils.pickRandomFromStringSet;
NTE = Utils.getMidiNoteFromNotation;
CHR = Utils.getRandomChord;
SCL = Utils.getRandomScale;
SFL = Utils.shuffle;
EQU = Equations.getDurations;
FRG = Equations.getFragments;

function ƒ(v){
	return v;
}

FRASEGGIO = function(p, num, ch, notes, dur){
	var t = new Track(ch);
	p.add(t);

	var s = new Sequence();
	t.add(s);

	for(var i=0; i<num; ++i){
		var index = RND(0, notes.length-1);
		var nt = NTE( notes[index] );
		var dur = dur;
		var n = new Note(nt, dur, RND(30, 127))
	    s.add(n);
	}
}

