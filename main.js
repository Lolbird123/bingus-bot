const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const levels = require('./levels.json');
const reminders = require('./reminders.json');

const prefix = config.prefix;
const owner = config.owner;
const server = config.server;

client.on('ready', () => {
	client.channels.fetch(config.channel).then(c => {c.join();});
	client.user.setActivity(`with bingus | ${prefix}help`);
	console.log('Bingus my beloved <3');
});

client.on('message', msg => {
	if(msg.author.bot || msg.channel.type === 'dm') return;
	if(msg.content.toLowerCase().includes('lolbird')) client.users.fetch(owner).then(u => {u.send(`https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`)});

	if(msg.content.toLowerCase().includes(prefix)) {
		var args = msg.content.slice(prefix.length).split(' ');
		var cmd = args.shift();

		switch(cmd) {
			case 'help':
				var embed = new Discord.MessageEmbed()
				.setTitle('Help')
				.setDescription(`For additional help, join https://discord.gg/bingus and mention <@!${owner}>\nSource Code: https://github.com/Lolbird123/bingus-bot\nCommands:`)
				.setColor('#efc46e')
				.addField(`${prefix}help`, 'Shows this.', true)
				.addField(`${prefix}ping`, 'Shows the bots websocket ping.', true)
				.addField(`${prefix}bingus`, 'Bingus.', true)
				.addField(`${prefix}bingusgif`, 'Shows a random bingus gif.', true)
				.addField(`${prefix}members`, 'Shows the current membercount. (Not always accurate)', true)
				.addField(`${prefix}servers`, 'Shows the bots server count.', true)
				.addField(`${prefix}binguspet`, 'Pet it.', true)
				.addField(`${prefix}praise`, 'Praise the bingus.', true)
				.addField(`${prefix}rank (user)`, 'Get a users rank by id, or your own if none given', true)
                .addField(`${prefix}remind <time in seconds> <reminder text>`, 'Creates a reminder.', true)
			    .addField(`${prefix}del-remind <reminder id>`, 'Delets a reminder.', true)
			    .addField(`${prefix}reminders`, 'Lists reminders.', true)
				.addField(`${prefix}invite`, 'Invite me to your server.', true);
				msg.channel.send({embed: embed});
			break;

			case 'ping':
				msg.channel.send(`Pong! ${client.ws.ping}ms`);
			break;

			case 'bingus':
				msg.channel.send('bingus');
			break;

			case 'bingusgif':
				var image = config.images[Math.floor(Math.random() * config.images.length)];
				msg.channel.send(image);
			break;

			case 'members':
				msg.channel.send(`${msg.guild.memberCount} members.`);
			break;

			case 'servers':
				msg.channel.send(`${client.guilds.cache.size} servers.`);
			break;

			case 'binguspet':
				msg.channel.send('<a:bingusPet:764106511398993941>');
			break;

			case 'praise':
				msg.channel.send('https://tenor.com/view/bingus-binguscord-gif-18769468');
			break;

			case 'rank':
				if(msg.guild.id !== server) return;

				var target = args.shift();

				if(target) {
					if(typeof levels[target] !== 'undefined') {
						msg.channel.send(`Level: **${levels[target].rank}**\nXP: **${levels[target].xp}**`);
					} else {
						msg.channel.send('Unknown user, or they dont have a rank. You must provide a user id.');
					}
				} else {
					if(typeof levels[msg.author.id] !== 'undefined') {
						msg.channel.send(`Level: **${levels[msg.author.id].rank}**\nXP: **${levels[msg.author.id].xp}**`);
					} else {
						msg.channel.send('You dont have one, green name.');
					}
				}
			break;

            case 'remind':
			    var time = args.shift().replace(/[^0-9]/g, '');
			    var text = args.join(' ');
			    var reminder = {
				    id: reminders.nextId,
				    owner: msg.author.id,
				    channel: msg.channel.id,
				    message: text,
				    time: time
			    };

			    if(time < 1) {
				    msg.channel.send('There is something wrong with the inputted time.');
				    return;
			    }

			    reminders.nextId++;
			    reminders.entries.push(reminder);
			    msg.react('✅');
			    writeReminders();
		    break;

		    case 'del-remind':
			    var target = args.shift();
			    var reminder = reminders.entries.find(r => r.id == target);

			    if(typeof reminder === 'object') {
				    if(reminder.owner === msg.author.id) {
					    reminders.entries = reminders.entries.filter(r => {
						    if(r.id != target) return r;
					    });
					    msg.react('✅');
					    writeReminders();
				    } else {
					    msg.channel.send('Not your reminder.');
				    }
			    } else {
				    msg.channel.send('Unknown reminder.');
			    }
		    break;

		    case 'reminds':
		    case 'reminders':
			    var reminds = reminders.entries.filter(r => {
				    if(r.owner === msg.author.id) return r;
			    });
			    var list = '';

			    if(reminds.length > 0) {
				    reminds.forEach(r => {
					    list += `${r.id} in <#${r.channel}> in ${r.time} seconds: ${r.message}\n`;
				    });
				    msg.channel.send(list);
			    } else {
				    msg.channel.send('None.');
			    }
		    break;

			case 'invite':
				msg.channel.send(config.invite);
			break;

			case 'eval':
				if(msg.author.id === owner) {
					var code = args.join(' ');

					try {
						var evaled = eval(code);
						msg.channel.send(`\`\`\`\n${evaled}\n\`\`\``);
					} catch(e) {
						msg.channel.send(`\`\`\`\n${e}\n\`\`\``);
					}
				} else {
					msg.channel.send('no');
				}
			break;

			case 'restart':
				if(msg.author.id === owner) {
					msg.channel.send('WHYYYYYYYYYYY-');
					setTimeout(() => {process.exit();}, 100);
				} else {
					msg.channel.send('no');
				}
			break;
		}
	} else if(msg.content.toLowerCase() === 'bingus') {
		msg.react('<:bingus:764103384046239754>');
	} else if(msg.guild.id === server) {
		if(typeof levels[msg.author.id] === 'undefined') {
			levels[msg.author.id] = {
				rank: 1,
				xp : 0
			};
		} else if(levels[msg.author.id].xp === levels[msg.author.id].rank*10) {
			levels[msg.author.id].rank++;
			levels[msg.author.id].xp = 0;
		} else {
			levels[msg.author.id].xp++;
		}

		fs.writeFile('./levels.json', JSON.stringify(levels), 'utf8', err => {if(err) console.log(err)});
	}
});

function writeReminders() {
	var data = JSON.stringify(reminders);
	fs.writeFile('./reminders.json', data, 'utf8', err => {
		if(err) console.log(err);
	});
}

client.login(config.token);

setInterval(() => {
	reminders.entries.forEach(r => {
		if(r.time <= 0) {
			client.channels.fetch(r.channel).then(c => {
				c.send(`<@!${r.owner}> you are being reminded to: ${r.message}`);
			});
			reminders.entries = reminders.entries.filter(rt => {
				if(rt.id != r.id) return rt;
			});
			writeReminders();
		} else {
			r.time--;
			writeReminders();
		}
	});
}, 1000);