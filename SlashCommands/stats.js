const { 
    ChatInputCommandInteraction, 
    Client, 
    EmbedBuilder, 
    version,
    SlashCommandBuilder,
 } = require("discord.js");
const { connection } = require("mongoose");
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Displays basic info about BeatBox."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { users, ws, guilds, user, readyTimestamp } = client;
        
        try {

            return interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("d454ff"),
                        fields: [
                            { name: "Bot Stats", value: `Users: \`${users.cache.size} cached users\` \nServers: \`${guilds.cache.size} cached servers\` \nCommands: \`${client.slashcommands.size} total commands\``, inline: true },
                            { name: "Internal Client", value: `API: \`${ws.ping} ms\` \nDatabase: \`${switchTo(connection.readyState)}\` \nRAM: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%\``, inline: true },
                            { name: "User Stats", value: `Library: [discord.js ${version}](https://discord.js.org/) \nUptime: <t:${parseInt(readyTimestamp / 1000)}:R> \nCreated: <t:${parseInt(user.createdTimestamp / 1000)}:f>`, inline: false },
                        ],
                    }).setThumbnail(user.displayAvatarURL({ dynamic: true }) || "")
                ],
            });

        } catch (error) {

            console.log(error);
            
        };
    },
};

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0: status = `Disconnected`
            break;
        case 1: status = `Connected`
            break;
        case 2: status = `Connecting...`
            break;
        case 3: status = `Disconnecting ?!`
            break;

    }
    return status;
}