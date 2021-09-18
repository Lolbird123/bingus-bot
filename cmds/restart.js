const discord = require('discord.js');

const info = {
	name: 'restart',
	version: '1.0',
	usage: 'restart',
	description: 'Restarts the bot.'
};

function exec(args, vars) {
	if(vars.msg.author.id === vars.config.owner) {
		var embed = new discord.MessageEmbed()
		.setTitle('Restarting...')
		.setColor('#ffff00');
		vars.msg.reply({embeds:[embed]});
		setTimeout(() => {
			process.exit(0);
		}, 250);
	} else {
		var embed = new discord.MessageEmbed()
		.setTitle('Access Denied')
		.setColor('#ff0000');
		vars.msg.reply({embeds:[embed]});
	}
}

exports.info = info;
exports.exec = exec;
