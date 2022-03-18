const discord = require('discord.js');

const info = {
	name: 'le_troll',
	version: '1.0',
	usage: 'le_troll <text>',
	description: 'q'
};

async function exec(args, vars) {
	if(vars.msg.guild.id === vars.config.guild && (
    vars.msg.member.roles.cache.has(vars.config.roles.minimod) ||
    vars.msg.member.roles.cache.has(vars.config.roles.mod) ||
    vars.msg.member.roles.cache.has(vars.config.roles.admin)
  )) {
    try {
      let c = await vars.msg.guild.channels.fetch(vars.config.channels.general);
      c.send({
        content: args.join(' '),
        allowedMentions: {
          parse: ['users']
        }
      });
    } catch(err) {
      vars.msg.reply('something broke lol');
      console.error(err);
    }
  } else {
    var embed = new discord.MessageEmbed();
    embed.setTitle('Access denied');
    embed.setColor('#ff0000');
    vars.msg.reply({embeds:[embed]});
  }
}

exports.info = info;
exports.exec = exec;
