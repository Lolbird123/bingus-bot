const discord = require('discord.js');

function exec(vars) {
	var comps = vars.msg.content.toLowerCase();

	if(vars.msg.content.toLowerCase() === 'ñ' && vars.msg.guild.id === vars.config.guild && !vars.msg.member.roles.cache.has(vars.config.roles.lvl5)) {
		vars.msg.channel.send(`<@!${vars.msg.author.id}> dumbass`);
		vars.msg.delete();
	}
	if((comps.includes('nitro') || comps.includes('@everyone') || comps.includes('@here')) && vars.msg.guild.id === vars.config.guild && !vars.msg.member.roles.cache.has(vars.config.roles.lvl5)) {
		vars.msg.channel.send(`<@!${vars.msg.author.id}> dumbass`);
                vars.msg.delete();
	}
	if(vars.msg.content.toLowerCase() === 'bingus') vars.msg.react('<:bingus:764103384046239754>');
  //the funny words are stored in config
  if(vars.msg.guild.id === vars.config.guild) {
    for(var i=0; i<vars.config.words.length; i++) {
      if(comps.includes(vars.config.words[i])) {
        vars.msg.channel.send(`<@!${vars.msg.author.id}> check your roles uwu`);
        vars.msg.member.roles.add(vars.config.roles.uwu);
      }
    }
  }
}

module.exports = exec;
