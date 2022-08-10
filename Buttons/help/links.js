const { Client, MessageEmbed, ButtonInteraction } = require("discord.js");

module.exports = {
    id: "c",
    /**
     * 
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        try {

            interaction.message.edit({
                embeds: [
                    new MessageEmbed({
                        color: "#d454ff",
                        author: {
                            name: "Links Section",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        },
                        description: `**Check These Below For Help!**\n\n[Our Support Server](https://discord.gg/fwVaVUeJv7)\n[Discord Support](https://support.discord.com/hc/en-us)`,
                    }),
                ],
            }).catch(async () => {
                return interaction.followUp({
                    content: `I dont have permission to see/send/edit messages!\nCheck the permissions set for <@${client.user.id}> and/or the @everyone role!`,
                    ephemeral: true
                });
            });

            return interaction.deferUpdate();

            

        } catch (error) {
            console.log(error);
        };

    },
};