const { 
    ChatInputCommandInteraction, 
    Client, 
    EmbedBuilder, 
    ButtonBuilder, 
    ActionRowBuilder,
    ButtonStyle,
    SlashCommandBuilder,
} = require("discord.js");
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("privacy")
        .setDescription("See BeatBox's serverwide Privacy Policy."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        try {
            
            return interaction.reply({
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("2f3136"),
                            author: {
                                name: `Privacy Policy`,
                                iconURL: client.user.displayAvatarURL({ dynamic: true }),
                            },
                            description: `
                        >>> __**Passive Collection of Information**__\n\n• **What does this mean?**\nAfter you invited BeatBox to this server you allow it to passively collect and save every member's voice channel time record. This meaning, you allow for BeatBox to save every user's time usage of voice channels within this server \`and this server only\`. This data \`isn't and never will be\` shared and it is only visible to the members of this server when using the respective commands to see their time record.\nThis information is yet changeable as members within each server with the \`Manage Server\` permission in one of their roles have access to the \`/settime\` command, through which they can change an individual member time record. This kind of data \`isn't and will never be\` changed by BeatBox, only through human action.\nThe only extra data apart from a member's time record that is saved within BeatBox's databases is each member's user id and the id of the respective server which voice channels they joined. None of those id's is sensitive info because everyone that shares a server with this user and is within that server can access to both id's.\nIf the bot is ever removed from the server, **every** member within that server will have their time record automatically deleted.
                        `,
                        }),
                        new EmbedBuilder({
                            color: hex.convert("2f3136"),
                            description: `
                        >>> __**Feedback and Support**__\n\n•**Yes, and?**\nIf after BeatBox joined your server you experience any kind of bug that may worsen your usage and time record with the bot \`let us know\`.\nOur \`support server\` will be linked [here](https://discord.gg/fwVaVUeJv7) and \`in the button below\`.\nWe wish to be able to provide a perfect service when it comes to registering member's time record as we know that it's an highly wished feature within discord's service so, for as long as we provide it \`we want to perfect\` it to its best, help us out with your \`suggestions, ideas and opinions\`.\nIf you have any kind of \`complaint, bug report or even feedback\` contact us too.
                        `,
                        }),
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
                                }))
                    ],
                    ephemeral: true,
                });

        } catch (error) {

            console.log(error);
            
        };
    },
};