# Bingus Bot

## Info

This repository is for having bingus bot's source code be publicly accessible.  
  
[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=764296101427544084&permissions=8&scope=bot%20applications.commands)  
[Bingus Discord](https://discord.gg/bingus)

## Self-Hosting Instructions

**Note:**
At the moment, the bot does not yet function with discord.js version 13 or higher due to major changes made that are not yet accounted for.

**Requrements:**
- [Node JS](https://nodejs.dev/)
- NPM (Install with Node JS)

**Preparing:**

1. Clone the repository localy
2. Install the dependencies by running `npm i` in the cloned repository
3. Configure config.json.
Config.json example:
```
{
	"prefix": "b!",
	"server": "763915967952191538",
	"channel": "800240312454479893",
	"invite": "https://discord.com/api/oauth2/authorize?client_id=764296101427544084&permissions=8&scope=bot%20applications.commands",
	"owner": "546768454427082785",
	"token": "BOT TOKEN HERE",
	"images": [
		"https://tenor.com/view/funny-weird-cute-xyze-cat-gif-17440040"
	]
}
```

**Running:**

Use either the included shell script to ensure the process automatically restarts if it crashes for any reason, or use `node .` while in the directory to run it manually.
