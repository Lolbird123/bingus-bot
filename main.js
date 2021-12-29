const fs = require('fs');
const config = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({intents:config.intents});

client.on('ready', () => {
	console.log(`Online as ${client.user.tag} with an id of ${client.user.id}`);
	client.user.setActivity(`${config.prefix}help`);
});

client.on('messageCreate', (msg) => {
	if(msg.channel.type === 'dm' || msg.author.bot) return;
	if(msg.content.startsWith(config.prefix)) {
		var args = msg.content.slice(config.prefix.length).split(' ');
		var cmd = args.shift();
		fs.access(`./cmds/${cmd}.js`, fs.constants.F_OK, (err) => {
			if(!err) {
				try {
					require(`./cmds/${cmd}.js`).exec(args, {msg: msg, client: client, config: config});
				} catch(e) {
					console.error(e);
				}
			}
		});
	} else {
		try {
			require('./filter.js')({msg: msg, client: client, config: config});
		} catch(err) {
			console.error(err);
		}
	}
});

client.on('messageDelete', msg => {
  if(msg.guild.id === config.guild && msg.attachments.size > 0) {
    try {
      client.channels.fetch(config.channels.log).then(c => {
        var embed = new discord.MessageEmbed();
        var files = [];

        msg.attachments.forEach(a => {
          files.push(`https://cdn.discordapp.com/attachments/${msg.channel.id}/${a.id}/${a.name}`);
        });
        embed.setTitle(`Deleted message (${msg.id}) from ${msg.author.tag} (${msg.author.id}) attachments:`);
        embed.setColor('#ff0000');
        embed.setDescription(`\`\`\`\n${files.join('\n')}\n\`\`\``);
        c.send({embeds: [embed]});
      });
    } catch(err) {
      console.error(err);
    }
  }
})

client.login(config.token);
