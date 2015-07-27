var Midi = require('./Improviz.js');


var myrepl = require("repl").start({
	useGlobal:true, 
	prompt: "improviz > ",
    input: process.stdin,
    output: process.stdout,
    terminal: 'TTY',
    ignoreUndefined: true
});


var port = (process.argv.length>2) ? +process.argv[2] : 0;
var session = (process.argv.length>3) ? process.argv[3] : '';
var midi = new Midi(port);
var player = new Player(midi);


myrepl.context['Player'] = player;
myrepl.context['Track'] = Track;
myrepl.context['Sequence'] = Sequence;
myrepl.context['Chord'] = Chord;
myrepl.context['Note'] = Note;

// shortcuts
myrepl.context['RND'] = Utils.random;
myrepl.context['PIK'] = Utils.pickRandomFromStringSet;
myrepl.context['NTE'] = Utils.getMidiNoteFromNotation;
myrepl.context['CHR'] = Utils.getRandomChord;
myrepl.context['SCL'] = Utils.getRandomScale;
myrepl.context['SFL'] = Utils.shuffle;
myrepl.context['EQU'] = Equations.getDurations;
myrepl.context['FRG'] = Equations.getFragments;

module.exports = myrepl;
