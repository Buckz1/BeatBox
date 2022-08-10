const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");
const hex = require("hex-to-64int");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand || interaction.isContextMenuCommand) {
            const { user, guild, commandName } = interaction;
            const command = client.slashcommands.get(commandName);
         
            if (!command) return;
            if (!guild) return;

            try {

                return command.execute(interaction, client);

            } catch (error) {

                console.error(error);

                return interaction.reply({
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("ff4e4e"),
                            author: {
                                name: `An error occurred when using that slash command ${user.username} ⛔`,
                                iconURL: user.displayAvatarURL({ dynamic: true }) || "",
                            }
                        })
                    ],
                    ephemeral: true,
                }) && client.slashcommands.delete(commandName);
            };
        };
    },
};
