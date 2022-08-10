const { Client, MessageEmbed, ButtonInteraction } = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
    id: "a",
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
                            name: "BeatBox's Command List", 
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
                        },
                        description: `\n/help\n/invite\n/leaderboard\n/ping\n/privacy\n/report\n/resetserver\n/resetuser\n/settime\n/stats\n/support\n/time\n+ VC Time (Context Menu)`,
                        footer: {
                            text: "NOTE: If BeatBox commands aren't showing up and if its not registering your time either, then its probably due to missing permissions for command and channel visibility!\nIf you need help in troubleshooting use /support"
                        }
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