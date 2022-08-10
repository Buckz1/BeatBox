const { ButtonInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction, client) {
        const { guild, member, customId } = interaction;
        if (!interaction.isButton()) return;
        if (!guild) return;

        const Button = client.buttons.get(customId);

        if (!Button) return;

        if (Button.permission && !member.permissions.has(Button.permission)) {
            return interaction.deferUpdate();
        };

        if (Button.ownerOnly && member.id !== interaction.guild.ownerId) {
            return interaction.deferUpdate();
        };
        try {

            return Button.execute(interaction, client);

        } catch (error) {
            console.log(error);
        }

    }
}