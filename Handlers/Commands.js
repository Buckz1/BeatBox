const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const { Routes } = require('discord-api-types/v10');
require('dotenv').config();
const rest = new REST({ version: "10" }).setToken(process.env.Token);

module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Commands Pushed");
	Table.setHeading("Deploy", "Status");
	Table.addRow("Successful", "🔵 Pushed");


	const commands = [];
	const commandFiles = fs.readdirSync('./SlashCommands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../SlashCommands/${file}`);
		commands.push(command.data.toJSON());
		client.slashcommands.set(command.data.name, command);
	};

	rest.put(Routes.applicationCommands(
		process.env.clientId),
		{ body: commands }
	).then(async () => {
		console.log(Table.toString())
	}).catch(async (error) => {
		console.log(error);
		Table.addRow("🔴 ERROR", "🔴 ERROR");
	});
};