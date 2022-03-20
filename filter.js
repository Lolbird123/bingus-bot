const discord = require('discord.js');

//man the old version really was a cluster fuck huh

function exec(vars) {
  var comps = vars.msg.content.toLowerCase();

  if((comps.includes('nitro') || comps.includes('@everyone') || comps.includes('@here')) && vars.msg.guild.id === vars.config.guild.id && !vars.msg.member.roles.cache.has(vars.config.roles.lvl5)) {
    vars.msg.channel.send(`<@!${vars.msg.author.id}> dumbass`);
    vars.msg.delete();
  } else if(comps === 'bingus') {
    vars.msg.react('<:bingus:764103384046239754>');
  }
}

module.exports = exec;
