const discord = require('discord.js');

const info = {
	name: 'dance',
	version: '1.0',
	usage: 'dance',
	description: 'Bingus dance.'
};

function exec(args, vars) {
	vars.msg.reply({files:[{attachment:'/home/pi/Videos/binglet-dance.mp4'}]});
}

exports.info = info;
exports.exec = exec;
