const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
} = require("discord.js");
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("support")
        .setDescription("Having trouble? We're here for you!"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        try {

            return interaction.reply({
                    content: `>>> You can report bugs, give us feedback and get support for your problems here.`,
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("d454ff"),
                            author: {
                                name: "BeatBox Support",
                                iconURL: client.user.displayAvatarURL({ dynamic: true }),
                            },
                            description: `Click [here](https://discord.gg/fwVaVUeJv7) to go to our support server.`
                        })
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder({
                                    label: "Support Server",
                                    style: ButtonStyle.Link,
                                    url: "https://discord.gg/fwVaVUeJv7",
                                    emoji: {
                                        id: "922468008696377394",
                                        name: "Beat",
                                    }
                                }),
                            )
                    ],
                });

        } catch (error) {

            console.log(error);

        };
    },
};