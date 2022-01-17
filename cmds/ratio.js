const info = {
  name: 'ratio',
  version: '1.0',
  syntax: 'ratio',
  description: 'Use when replying to a message'
};

function exec(args, vars) {
  if(!vars.msg.reference) {
    vars.msg.reply('You need to reply to a message');
    return;
  }
  vars.msg.channel.messages.fetch(vars.msg.reference.messageId).then(m => {
    try {
      m.react('<:l_:932716267595522088>');
      m.react('<:l_:932716283714215936>');
      m.react('<:l_:932716296909488178>');
      m.react('<:l_:932716310549393501>');
      m.react('<:l_:932716320968044606>');
      m.react('<:l_:932716330086441002>');
      m.react('<:l_:932716341176201276>');
      m.react('<:l_:932716352806998056>');
      m.react('<:l_:932716363045285919>');
      m.react('<:l_:932716373694636082>');
      m.react('<:l_:932716411430764594>');
      m.react('<:l_:932716421618745344>');
      m.react('<:l_:932716431802527785>');
      m.react('<:l_:932716441881444363>');
      m.react('<:l_:932716452673388584>');
      m.react('<:l_:932716462873923634>');
      m.react('<:l_:932716472525029419>');
      m.react('<:l_:932716481505013830>');
      m.react('<:l_:932716490979958804>');
      m.react('<:l_:932716501990015037>');
    } catch(err) {
      console.error(err);
    }
  });
}

exports.info = info;
exports.exec = exec;
