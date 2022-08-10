const {
    Client,
    EmbedBuilder,
    UserContextMenuCommandInteraction,
    ContextMenuCommandBuilder,
    ApplicationCommandType
} = require("discord.js");
const voiceClient = require("../Events/Client/VoiceClient");
const humanizeDuration = require("humanize-duration");
const hex = require("hex-to-64int");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("VC time")
        .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {UserContextMenuCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { targetId, guild, user } = interaction;
        const Target = await guild.members.fetch(targetId).catch(() => {});
        if (!Target) {

            return interaction.reply({
                content: `<@${targetId}> doesnt exist.`,
                ephemeral: true,
            });

        } else if (Target) {

            const target = Target.user;
            const userinfo = await voiceClient.getUserData(guild, target);

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



            const duration = humanizeDuration(userinfo.Time, {
                delimiter: ", ",
                round: true
            });

            return interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("d454ff"),
                        author: {
                            name: `|  ${target.tag}`,
                            iconURL: target.displayAvatarURL({ dynamic: true }) || "",
                        },
                        fields: [
                            { name: `Rank`, value: `#${userinfo.position + 1}`, inline: true },
                            { name: `Time `, value: `${duration}`, inline: true },
                        ],
                    })
                ],
                ephemeral: true
            });

        }
    },
};