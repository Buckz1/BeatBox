const {
    ChatInputCommandInteraction,
    Client,
    ModalBuilder,
    ActionRowBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");
const hex = require("hex-to-64int");
const Filter = require('bad-words');
const filter = new Filter();

filter.addWords(
    "trash",
    "shit",
    "milf",
    "dilf",
    "hooha",
    "booty",
    "bunda",
    "dumpy",
    "seggs",
    "retard",
    "rape",
    "r@pe",
    "rapist",
    "abuse",
    "abuser",
);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("Found something? Let us know!"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { user } = interaction;

        try {

            interaction.showModal(
                new ModalBuilder({
                    title: "BeatBox Reporting",
                    customId: "modal",
                }).addComponents([
                    new ActionRowBuilder()
                        .addComponents([
                            new TextInputBuilder({
                                required: true,
                                style: TextInputStyle.Paragraph,
                                customId: "input",
                                placeholder: "Write something here...",
                                minLength: 1,
                                maxLength: 4000,
                                label: "Your report?"

                            }),
                        ]),
                ]),
            );
            await interaction.awaitModalSubmit({
                filter: (interaction) => interaction.customId === 'modal',
                time: 0,
            }).then(async (modal) => {

                modal.reply({
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("d454ff"),
                            author: {
                                name: `Your report was sent ${user.username}`,
                                icon_url: user.displayAvatarURL({ dynamic: true }),
                            },
                            description: "Check our support server with /support and check if your report has been responded to!",

                        })
                    ],
                    ephemeral: true,
                });

                const channel = await client.channels.fetch("954587822256427038");

                return channel.send({
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("d454ff"),
                            author: {
                                name: `Report made by ${user.tag}`,
                                icon_url: user.displayAvatarURL({ dynamic: true })
                            },
                            description: `${filter.clean(modal.fields.getTextInputValue("input"))}`

                        }),
                    ],
                });
            });

        } catch (error) {
            console.log(error);
        }

    }
}