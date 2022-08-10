const {
    ActionRowBuilder,
    ButtonBuilder,
    ChatInputCommandInteraction,
    PermissionsBitField,
    ButtonStyle,
    SlashCommandBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Invite BeatBox to your server!"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        try {

            const invite = await client.generateInvite({
                scopes: ["bot", "applications.commands"],
                permissions: [
                    PermissionsBitField.Flags.ManageGuild,
                    PermissionsBitField.Flags.ManageChannels,
                    PermissionsBitField.Flags.ManageEmojisAndStickers,
                    PermissionsBitField.Flags.ManageWebhooks,
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.SendMessagesInThreads,
                    PermissionsBitField.Flags.ManageChannels,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.ReadMessageHistory,
                    PermissionsBitField.Flags.UseExternalEmojis,
                    PermissionsBitField.Flags.UseExternalStickers,
                    PermissionsBitField.Flags.UseApplicationCommands,
                ],
            });

            return interaction.reply({
                    components: [
                        new ActionRowBuilder()
                            .addComponents([
                                new ButtonBuilder({
                                    url: `${invite}`,
                                    label: "Invite BeatBox",
                                    emoji: "<:Beat:922468008696377394>",
                                    style: ButtonStyle.Link,
                                }),
                            ]),
                    ],
                });

        } catch (error) {

            console.log(error);

        };
    },
};