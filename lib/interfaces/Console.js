var chalk = require('chalk');

var Console = function(){

	'use strict'

	this.noteOn = function(note){
		console.log(chalk.blue("-- ON:  " + note.note + ' ch: ' + note.channel + ' vel: ' + note.velocity ))
	}


	this.noteOff = function(note){
		console.log(chalk.magenta("-- OFF: " + note.note + ' ch: ' + note.channel + ' vel: ' + note.velocity ))
	}

}


module.exports = Console;