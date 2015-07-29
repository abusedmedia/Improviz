Midi = require('./interfaces/Midi.js');
Console = require('./interfaces/Console.js');
WebSocket = require('./interfaces/WebSocket.js');

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

