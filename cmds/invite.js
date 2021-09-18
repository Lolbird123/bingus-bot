const discord = require('discord.js');

const info = {
	name: 'invite',
	version: '1.0',
	usage: 'invite',
	description: 'Invite me to your server!'
};

function exec(args, vars) {
	var embed = new discord.MessageEmbed()
	.setTitle('Invite')
	.setColor('#00ff00')
	.setDescription(vars.config.invite);
	vars.msg.reply({embeds:[embed]});
}

exports.info = info;
exports.exec = exec;
