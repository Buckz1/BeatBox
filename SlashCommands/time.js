const { 
    EmbedBuilder, 
    ChatInputCommandInteraction,
    SlashCommandBuilder,
 } = require("discord.js");
const voiceClient = require("../Events/Client/VoiceClient");
const humanizeDuration = require("humanize-duration");
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("time")
        .setDescription("Get yours or an user's voice channel time in your server and rank.")
        .addUserOption(option => option
            .setName("member")
            .setDescription("Mention a user to get the time from.")
            .setRequired(false)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const { options, guild, user } = interaction;

        const Target = options.getUser("member") || user;

        const userinfo = await voiceClient.getUserData(guild, Target);

        if (!userinfo) {

            return interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("ff4e4e"), //RED
                        author: {
                            name: `This user has no vc time ⛔ !`,
                            iconURL: user.displayAvatarURL({ dynamic: true })
                        },
                    })
                ],
                ephemeral: true
            });
        };

        try {
            const duration = humanizeDuration(userinfo.Time, {
                delimiter: ", ",
                round: true
            });

            return interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("d454ff"),
                        author: {
                            name: `|  ${Target.tag}`,
                            iconURL: Target.displayAvatarURL({ dynamic: true })
                        },
                        fields: [
                            { name: `Rank`, value: `#${userinfo.position + 1}`, inline: true },
                            { name: `Time`, value: `${duration}`, inline: true },
                        ]
                    })
                ]
            });


        } catch (error) {

            console.log(error);

        }
    }
}