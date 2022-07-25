# this is now archived, as i am remaking bingus bot at https://gitlab.com/Lolbird123-G/bingus-bot/

# Bingus Bot

## Info

This repository is for having bingus bot's source code be publicly accessible.  
  
[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=764296101427544084&permissions=8&scope=bot%20applications.commands)  
[Bingus Discord](https://discord.gg/bingus)

## Self-Hosting Instructions

**Requrements:**
- [Node JS](https://nodejs.dev/)
- NPM (Install with Node JS)

**Preparing:**

1. Clone the repository localy
2. Install the dependencies by running `npm i` in the cloned repository
3. Configure config.json.
`config.json` example:
```
{
	"prefix": "b!",
	"intents": ["GUILDS", "GUILD_MESSAGES"],
	"guild": "",
	"channels": {
		"log": "766902515543179286"
	},
	"roles": {
		"lvl5": "763934710774104104",
                "citizen": "763934522068303902"
	}
	"invite": "https://discord.com/api/oauth2/authorize?client_id=764296101427544084&permissions=8&scope=bot%20applications.commands",
	"owner": "546768454427082785",
	"token": "BOT TOKEN HERE",
}
```

**Running:**

Use either the included shell script to ensure the process automatically restarts if it crashes for any reason, or use `node .` while in the directory to run it manually.
