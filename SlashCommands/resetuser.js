const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionsBitField,
    SlashCommandBuilder,
} = require("discord.js");
const voiceClient = require("../Events/Client/VoiceClient");
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resetuser")
        .setDescription("Reset someones time!")
        .addUserOption(option => option
            .setName("member")
            .setDescription("Mention a user to get reset the time.")
            .setRequired(true)),
    /**
    * 
    * @param {ChatInputCommandInteraction} interaction
    */
    async execute(interaction) {
        const { options, guild, user, member } = interaction;
        const User = options.getUser("member");

        if (!member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {

            return interaction
                .reply({
                    content: "You can't use this command. You need the \`Manage Server\` permission in one of your roles. ⛔",
                    ephemeral: true
                });
        };

        try {

            const userinfo = await voiceClient.getUserData(guild, User);

            if (!userinfo) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("ff4e4e"), // RED
                            author: {
                                name: `This member has either no voice channel time record to change!`,
                                iconURL: user.displayAvatarURL({ dynamic: true })
                            },
                        }),
                    ],
                    ephemeral: true,
                });
            };

            voiceClient.setTime(guild, User, 0);

            return interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("d454ff"),
                        author: {
                            name: `Reseted time for a member`,
                            icon_url: user.displayAvatarURL({ dynamic: true }) || "",
                        },
                        description: `>>> Time was reset:\n\nFor <@${User.id}>\n\nBy <@${user.id}>`
                    })
                ]
            });

        } catch (error) {

            console.log(error);

        };
    },
};