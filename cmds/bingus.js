const discord = require('discord.js');

const info = {
	name: 'bingus',
	version: '1.0',
	usage: 'bingus',
	description: 'Bingus.'
};

function exec(args, vars) {
	vars.msg.channel.send('bingus');
}

exports.info = info;
exports.exec = exec;
