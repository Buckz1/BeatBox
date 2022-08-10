const { ButtonInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    id: "d",
    /**
     * 
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        try {
            const { guild, message, user } = interaction;

            if (user.id != guild.ownerId) return interaction.deferUpdate();

            message.edit({
                embeds: [
                    new EmbedBuilder({
                        color: "RED",
                        author: {
                            name: `The request was canceled.`,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        },
                    }),
                ],
                components: []
            }).catch(async () => {});
            return interaction.deferUpdate();

        } catch (error) {
            console.log(error);
        }

    }
}