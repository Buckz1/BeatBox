const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
} = require("discord.js");
const wait = require('util').promisify(setTimeout);
const hex = require("hex-to-64int");
const voiceClient = require("../Events/Client/VoiceClient");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("resetserver")
        .setDescription("Reset your server's voice channel records."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        const { guild, user } = interaction;

        interaction.deferReply({ ephemeral: true, fetchReply: true });
        await wait(1200);

        try {

            if (user.id != guild.ownerId) {

                interaction.editReply({
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("ff4e4e"), //RED
                            author: {
                                name: `${user.tag}`,
                                iconURL: user.displayAvatarURL({ dynamic: true }),
                            },
                            description: `You can't use this command because you aren't the owner of this server!\n>>> Ask <@${guild.ownerId}>`,
                        })
                    ]
                });


            } else if (user.id = guild.ownerId) {

                const msg = await interaction.editReply({
                    embeds: [
                        new EmbedBuilder({
                            color: hex.convert("12638f"), // NAVY
                            author: {
                                name: `${user.tag}, are you sure?`,
                                iconURL: user.displayAvatarURL({ dynamic: true }),
                            }
                        })
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder({
                                    label: `Confirm`,
                                    customId: `confirm`,
                                    emoji: `✅`,
                                    style: ButtonStyle.Success,
                                }),
                                new ButtonBuilder({
                                    label: `Cancel`,
                                    customId: `cancel`,
                                    emoji: `❌`,
                                    style: ButtonStyle.Danger,
                                })
                            )
                        ],
                });
                const collector = msg.createMessageComponentCollector();
                collector.on('collect', async (i) => {
    
                    if (i.customId === "confirm") {
    
                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder({
                                    color: hex.convert("71e877"), //GREEN
                                    author: {
                                        name: `The request was completed.`,
                                        iconURL: user.displayAvatarURL({ dynamic: true })
                                    },
                                    description: `
                                \n**${guild.name}**'s Leaderboard was successfully reset by <@${guild.ownerId}>.
                                `
                                })
                            ],
                            components: [],
                        });
                        await voiceClient.reset(guild);
                        i.deferUpdate();
    
                    } else if (i.customId === "cancel") {
    
                        interaction.editReply({
                            ephemeral: true,
                            embeds: [
                                new EmbedBuilder({
                                    color: hex.convert("ff4e4e"), // RED
                                    author: {
                                        name: `The request was canceled.`,
                                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                                    },
                                }),
                            ],
                            components: [],
                        });
                        i.deferUpdate();
    
                    };
                });


            };

        } catch (error) {

            console.log(error);

        };
    },
};