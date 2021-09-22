const fs = require('fs');
const discord = require('discord.js');

const info = {
	name: 'help',
	version: '1.0',
	usage: 'help [command]',
	description: 'Lists all commands, or detailed info on a specific command.'
};

function exec(args, vars) {
	if(args[0]) {
		fs.access(`./cmds/${args[0]}.js`, fs.constants.F_OK, (err) => {
			if(!err && typeof require(`./${args[0]}`).info !== 'undefined') {
				var cmd = require(`./${args[0]}.js`).info;
				var embed = new discord.MessageEmbed()
				.setTitle('Help')
				.setColor('#00ff00')
				.setDescription(`Name: ${cmd.name}\nVersion: ${cmd.version}\nUsage: ${vars.config.prefix}${cmd.usage}\nDescription: ${cmd.description}`);
				vars.msg.reply({embeds:[embed]});
			} else {
				var embed = new discord.MessageEmbed()
				.setTitle('Help')
				.setColor('#ff0000')
				.setDescription('Command not found, or has no info.');
				vars.msg.reply({embeds:[embed]});
			}
		});
	} else {
		fs.readdir('./cmds/', (err, files) => {
			if(err) {console.error(err); return;}
			var cmds = [];
			for(i=0; i<files.length; i++) cmds[i] = files[i].slice(0, -3);
			var embed = new discord.MessageEmbed()
			.setTitle('Help')
			.setColor('#00ff00')
			.setDescription(`Bingus my beloved <3\nSupport server: https://discord.gg/bingus\nDeveloper: <@!${vars.config.owner}>\nSource code: https://github.com/Lolbird123/bingus-bot\n\n**Commands:** ${cmds.join(',  ')}`);
			vars.msg.reply({embeds:[embed]});
		});
	}
}

exports.info = info;
exports.exec = exec;
