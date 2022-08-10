const { 
	Client, 
	Collection, 
	GatewayIntentBits,
	Partials,
	ActivityType,
} = require('discord.js');

const { 
	Guilds,
	GuildMembers,
	GuildMessages,
	MessageContent,
	DirectMessages,
	GuildMessageReactions,
	GuildVoiceStates,
	GuildWebhooks,
	GuildIntegrations,
	GuildPresences,
} = GatewayIntentBits;

const { 
	User,
	Reaction,
	Message,
	Channel,
	GuildMember,
	ThreadMember,
} = Partials;

const client = new Client({
	intents: [
		Guilds,
		GuildMembers,
		GuildMessages,
		MessageContent,
		DirectMessages,
		GuildMessageReactions,
		GuildVoiceStates,
		GuildWebhooks,
		GuildIntegrations,
		GuildPresences,
	],
	restTimeOffset: 0,
	restGlobalRateLimit: 50,
	allowedMentions: {
		repliedUser: false,
		parse: ["users", "roles"],
	},
	partials: [
		User,
		Reaction,
		Message,
		Channel,
		GuildMember,
		ThreadMember,
	],
	presence: {
		activities: [{
			type: ActivityType.Listening,
			name: "/time",
		}]
	},
	ws: {
		properties: {
			browser: 'Discord iOS'
		},
	},
});

module.exports = client;

client.slashcommands = new Collection();
client.buttons = new Collection();

const Ascii = require("ascii-table");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const fs = require('node:fs');
require('dotenv').config();

["Buttons", "Commands", "Events"].forEach(handler => {
	require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(process.env.Token).then(() => {
	console.log(`[Client] Logging in as ${client.user.tag}...`)
}).catch((error) => {
	console.log(error);
});

client.on("error", async (error) => {
	console.log("Internal Error!", error);
});