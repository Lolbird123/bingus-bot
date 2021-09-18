const discord = require('discord.js');

const info = {
	name: 'ping',
	version: '1.0',
	usage: 'ping',
	description: 'Responds with the bot\`s websocket ping.'
};

function exec(args, vars) {
	var embed = new discord.MessageEmbed()
	.setTitle('Pong!')
	.setColor('#00ff00')
	.setDescription(`Websocket ping: **${vars.client.ws.ping}ms**`);
	vars.msg.reply({embeds:[embed]});
}

exports.info = info;
exports.exec = exec;
