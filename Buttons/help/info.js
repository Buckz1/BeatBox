const { Client, MessageEmbed, ButtonInteraction } = require("discord.js");

module.exports = {
    id: "b",
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
                            name: "Info About BeatBox", 
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
                    },
                        description: `BeatBox is a simple bot that was created with the purpose of a better voice channel time tracking system! This counting is passive and all you have to do is join a voice channel!\n\nContact us [here](https://discord.gg/fwVaVUeJv7) for any bugs or questions.\n\nProfile Picture:\n<:reply:972971941357031524> [Made by u/Kurooneko28 on the r/Ruiner Reddit](https://www.reddit.com/r/Ruiner/comments/8x4525/made_some_edits_for_a_pfp_on_steam_hope_you_guys/)
                        `}),
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