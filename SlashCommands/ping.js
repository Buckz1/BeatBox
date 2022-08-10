const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
} = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get BeatBox's latency."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const msg = await interaction.reply({ content: "**Pinging...**", fetchReply: true, ephemeral: true });
        await wait(1000);
        return interaction.editReply({
                content: `Bot Latency: **${msg.createdTimestamp - interaction.createdTimestamp}** ms\nAPI Latency: **${client.ws.ping}** ms`
            }).catch(() => {});
    },
};