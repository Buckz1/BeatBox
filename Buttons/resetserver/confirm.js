const voiceClient = require("../../Events/Client/VoiceClient");
const { ButtonInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    id: "e",
    /**
     * 
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        try {
            const { guild, message, user } = interaction;

            if (user.id != guild.ownerId) return interaction.deferUpdate();

            await voiceClient.reset(guild);

            message.edit({
                embeds: [
                    new EmbedBuilder({
                        color: "GREEN",
                        author: {
                            name: `The request was completed.`,
                            iconURL: user.displayAvatarURL({ dynamic: true })
                        },
                        description: `
                    \n**${guild.name}**'s Leaderboard successfully reset by <@${guild.ownerId}>.
                    `
                    })
                ],
                components: []
            }).catch(async () => {});

            return interaction.deferUpdate();

        } catch (error) {
            console.log(error);
        }

    }
}