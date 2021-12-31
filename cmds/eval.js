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
			var embed = new discord.MessageEmbed();
			embed.setTitle('Success');
			embed.setColor('#00ff00');
			if(typeof evaled === 'object') {
        embed.setDescription(`\`\`\`\n${JSON.stringify(evaled)}\n\`\`\``);
      } else {
        embed.setDescription(`\`\`\`\n${evaled}\n\`\`\``);
      }
      msg.reply({embeds:[embed]});
		} catch(err) {
			var embed = new discord.MessageEmbed();
			embed.setTitle('Error');
			embed.setColor('#ff0000');
			if(typeof err === 'object') {
        embed.setDescription(`\`\`\`\n${JSON.stringify(err)}\n\`\`\``);
      } else {
        embed.setDescription(`\`\`\`\n${err}\n\`\`\``);
      }
			msg.reply({embeds:[embed]});
		}
	} else {
		var embed = new discord.MessageEmbed();
		embed.setTitle('Access Denied');
		embed.setColor('#ff0000');
		msg.reply({embeds:[embed]});
	}
}

exports.info = info;
exports.exec = exec;
