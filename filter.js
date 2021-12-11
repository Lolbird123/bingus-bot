const discord = require('discord.js');

function exec(vars) {
	var comps = vars.msg.content.toLowerCase();
	
	if(vars.msg.content.toLowerCase() === 'ñ' && vars.msg.guild.id === vars.config.guild && !vars.msg.member.roles.cache.has(vars.config.roles.lvl5)) {
		vars.msg.channel.send(`<@!${vars.msg.author.id}> dumbass`);
		vars.msg.delete();
	}
	if((comps.has('nitro') || comps.has('steam')) && vars.msg.guild.id === vars.config.guild && !vars.msg.member.roles.cache.has(vars.config.roles.lvl5)) {
		vars.msg.channel.send(`<@!${vars.msg.author.id}> dumbass`);
                vars.msg.delete();
	}
	if(vars.msg.content.toLowerCase() === 'bingus') vars.msg.react('<:bingus:764103384046239754>');
}

module.exports = exec;
