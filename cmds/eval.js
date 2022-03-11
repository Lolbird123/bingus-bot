const Discord = require('discord.js');

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

      if(typeof evaled === 'object' && evaled instanceof Promise) {
        msg.react('🕔');
        evaled.then((data) => {
          var embed = new Discord.MessageEmbed();
          embed.setTitle('Success (Promise Result)');
          embed.setColor('#00ff00');
          if(typeof data === 'object') {
            embed.setDescription(`\`\`\`\n${JSON.stringify(data)}\n\`\`\``);
          } else {
            embed.setDescription(`\`\`\`\n${data}\n\`\`\``);
          }
          msg.reply({embeds:[embed]});
        });
      } else {
        var embed = new Discord.MessageEmbed();
        embed.setTitle('Success');
        embed.setColor('#00ff00');
        if(typeof evaled === 'object') {
          embed.setDescription(`\`\`\`\n${JSON.stringify(evaled)}\n\`\`\``);
        } else {
          embed.setDescription(`\`\`\`\n${evaled}\n\`\`\``);
        }
        msg.reply({embeds:[embed]});
      }
    } catch(err) {
      var embed = new Discord.MessageEmbed();
      embed.setTitle('Error');
      embed.setColor('#ff0000');
      if(typeof evaled === 'object') {
        embed.setDescription(`\`\`\`\n${err.toString()}\n\`\`\``);
      } else {
        embed.setDescription(`\`\`\`\n${err}\n\`\`\``);
      }
      msg.reply({embeds:[embed]});
    }
	} else {
		var embed = new Discord.MessageEmbed();
		embed.setTitle('Access Denied');
		embed.setColor('#ff0000');
		msg.reply({embeds:[embed]});
	}
}

exports.info = info;
exports.exec = exec;
