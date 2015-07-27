# What is that?
**Improviz** is a general purpose Node.js library to construct algorithmic, time-based, events structure compositions.
It is an almost direct porting of my previous library for Processing, [UPlayLib](https://github.com/abusedmedia/UPlayLib), which is now discontinued.

# Status

**Improviz** is in a very early stage. It needs more tests and usage case as well as the whole documentation.

# Installation

- Clone this repository
- Run `npm install` (prepend `sudo` if you're under MacOsX)


# Requirements

Right now there's only the MIDI interface so in order to use the library you need at least one MIDI interface available on your computer


# Basic tutorial

Here a basic example in order to generate a simple structure

	// the path is relative to your file
	require('./../lib/Improviz.js');

	// define the MIDI port number
	var m = new Midi(1);

	// define the main player
	var p = new Player(m);
	p.play();

	// add a Track
	var t = new Track(0);
	p.add(t);

	// add a Sequence
	var s = new Sequence();
	t.add(s);

	// add a bounch of Note
	for(var i=0; i<12; ++i){
		// a Note is defined with the MIDI timbre (0-127), the duration (in milliseconds) and a Velocity value (0-127)
		var n = new Note( 60+i, 100, 127);
	    s.add(n);
	}

The playhead is already running due the command `p.play();`
Your MIDI device should receive MIDI notes