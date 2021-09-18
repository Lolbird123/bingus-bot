const discord = require('discord.js');

const info = {
	name: 'eval',
	version: '1.0',
	usage: 'eval <code>',
	description: 'Evaluates JavaScript.'
};

function exec(args, vars) {
	var msg = vars.msg;
	if(msg.author.id === vars.config.owner) {
		try {
			var code = args.join(' ');
			var evaled = eval(code);
			var embed = new discord.MessageEmbed()
			.setTitle('Success')
			.setColor('#00ff00')
			.setDescription(`\`\`\`\n${evaled}\n\`\`\``);
			msg.reply({embeds:[embed]});
		} catch(err) {
			var embed = new discord.MessageEmbed()
			.setTitle('Error')
			.setColor('#ff0000')
			.setDescription(`\`\`\`\n${err}\n\`\`\``);
			msg.reply({embeds:[embed]});
		}
	} else {
		var embed = new discord.MessageEmbed()
		.setTitle('Access Denied')
		.setColor('#ff0000');
		msg.reply({embeds:[embed]});
	}
}

exports.info = info;
exports.exec = exec;
