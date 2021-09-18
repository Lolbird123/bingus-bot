const discord = require('discord.js');

const info = {
	name: 'binguspet',
	version: '1.0',
	usage: 'binguspet',
	description: 'Pet the bingus.'
};

function exec(args, vars) {
	vars.msg.channel.send('<a:bingusPet:764106511398993941>');
}

exports.info = info;
exports.exec = exec;
