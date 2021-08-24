const fs = require('fs');
const exec = require('child_process').exec;
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
	client.user.setActivity(`with bingus | ${prefix}help | PFP Made By Sock#6370`);
	console.log('Bingus my beloved <3');
});

client.on('message', msg => {
	if(msg.author.bot || msg.channel.type === 'dm') return;

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
				.addField(`${prefix}dance`, 'Binglet dance.', true)
				.addField(`${prefix}praise`, 'Praise the bingus.', true)
				.addField(`${prefix}rank (user)`, 'Get a users rank by id, or your own if none given', true)
                		.addField(`${prefix}remind <time> <reminder text>`, 'Creates a reminder.', true)
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

			case 'dance':
				msg.channel.send({files: [{attachment: '/home/pi/Videos/binglet-dance.mp4'}]});
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
			    var timeIn = args.shift();
			    var text = args.join(' ');
			    var timeChar = timeIn.split('').pop();
			    var time = timeIn.replace(/[^0-9]/g, '');

			    switch(timeChar) {
			 	case 's': break;
				case 'm': time=time*60; break;
				case 'h': time=time*60*60; break;
				case 'd': time=time*60*60*24; break;
				case 'w': time=time*60*60*24*7; break;
				case 'y': time=time*60*60*24*30*12; break;
				default:
					msg.channel.send('Time format examples: 5s 10m 1d');
					return;
				break;
			    }

			    if(text > 1500) {
				    msg.channel.send('Max reminder text length is 1500 characters.');
				    return;
			    }

			    reminders.entries.push({
				id: reminders.nextId,
				owner: msg.author.id,
				message: text,
				channel: msg.channel.id,
				time: time
			    });
			    reminders.nextId++;
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
				    if(msg.channel.permissionsFor(msg.member.id).has('EMBED_LINKS')) {
					msg.channel.send(list, {allowedMentions: {users: [msg.author.id]}});
				    } else {
					msg.channel.send(list, {allowedMentions: {users: [msg.author.id]}}).then(m => {m.suppressEmbeds()});
				    }
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

			case 'bash':
				if(msg.author.id === owner) {
					var code = args.join(' ');

					exec(code, (err, stdout, stderr) => {
						if(err) msg.channel.send(`\`\`\`\n${err}\n\`\`\``);
						if(stdout) {
							msg.channel.send(`\`\`\`\n${stdout}\n\`\`\``);
						} else if (!err){
							msg.react('✅');
						}
					});
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

client.on('messageDelete', (msg) => {
	if(msg.channel.type !== 'dm' && !msg.author.bot) {
		if(msg.guild.id === server) {
			client.channels.fetch(config.messageLogChannel).then(c => {
				c.send(`Message from ${msg.author.tag} (${msg.author.id}) deleted in <#${msg.channel.id}> (${msg.channel.id}) with an id of ${msg.id}:\n\`\`\`\n${msg.content}\n\`\`\``);
			});
		}
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
				if(c.permissionsFor(r.owner).has('EMBED_LINKS')) {
					c.send(`<@!${r.owner}> you are being reminded to: ${r.message}`, {allowedMentions: {users: [r.owner]}});
				} else {
					c.send(`<@!${r.owner}> you are being reminded to: ${r.message}`, {allowedMentions: {users: [r.owner]}}).then(m => {m.suppressEmbeds()});
				}
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
