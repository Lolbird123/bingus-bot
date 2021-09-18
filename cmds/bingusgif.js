const discord = require('discord.js');

const info = {
	name: 'bingusgif',
	version: '1.0',
	usage: 'bingusgif',
	description: 'Posts a binus gif from a saved selection.'
};

function exec(args, vars) {
	var images = require('../store/images.json').images;
	var gif = images[Math.round(Math.random() * images.length)];
	vars.msg.reply(gif);
}

exports.info = info;
exports.exec = exec;
