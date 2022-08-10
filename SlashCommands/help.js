const { 
    ChatInputCommandInteraction, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    Client,
    SlashCommandBuilder,
    PermissionsBitField,
} = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Full Guide for BeatBox!"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client ) {
        const { user, channel } = interaction;
 
        try {
            const invite = await client.generateInvite({
                scopes: ["bot", "applications.commands"],
                permissions: [
                    PermissionsBitField.Flags.ManageGuild,
                    PermissionsBitField.Flags.ManageChannels,
                    PermissionsBitField.Flags.ManageEmojisAndStickers,
                    PermissionsBitField.Flags.ManageWebhooks,
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.SendMessagesInThreads,
                    PermissionsBitField.Flags.ManageChannels,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.ReadMessageHistory,
                    PermissionsBitField.Flags.UseExternalEmojis,
                    PermissionsBitField.Flags.UseExternalStickers,
                    PermissionsBitField.Flags.UseApplicationCommands,
                ],
            });

            const msg = await interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("d454ff"),
                        title: `Help Embed for ${user.username}`,
                    }).setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png" })),
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents([
                            new ButtonBuilder({
                                label: "Info",
                                custom_id: "info",
                                emoji: {
                                    name: "mod",
                                    id: "975855815762276422",
                                },
                                style: ButtonStyle.Secondary,
                            }),
                            new ButtonBuilder({
                                label: "Commands",
                                custom_id: "commands",
                                emoji: {
                                    name: "slash",
                                    id: "968263455746449468",
                                },
                                style: ButtonStyle.Secondary,
                            }),
                            new ButtonBuilder({
                                label: "Links",
                                custom_id: "links",
                                emoji: {
                                    name: "earlynitro",
                                    id: "975855882749480972",
                                },
                                style: ButtonStyle.Primary,
                            }), 
                            new ButtonBuilder({
                                url: `${invite}`,
                                label: "Invite BeatBox",
                                emoji: "<:Beat:922468008696377394>",
                                style: ButtonStyle.Link,
                            }),
                        ]),
                ],
                ephemeral: true,
                fetchReply: true,
            });

            const collector = msg.createMessageComponentCollector();
            collector.on('collect', async (i) => {

                if (i.customId === "info") {

                    interaction.followUp({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder({
                                color: hex.convert("d454ff"),
                                author: {
                                    name: "Info About BeatBox",
                                    iconURL: user.displayAvatarURL({ dynamic: true })
                                },
                                description: `BeatBox is a simple bot that was created with the purpose of a better voice channel time tracking system! This counting is passive and all you have to do is join a voice channel!\n\nContact us [here](https://discord.gg/fwVaVUeJv7) for any bugs or questions.\n\nProfile Picture:\n<:reply:972971941357031524> [Made by u/Kurooneko28 on the r/Ruiner Reddit](https://www.reddit.com/r/Ruiner/comments/8x4525/made_some_edits_for_a_pfp_on_steam_hope_you_guys/)
                                `})
                        ]
                    });
                    i.deferUpdate();

                } else if (i.customId === "commands") {

                    interaction.followUp({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder({
                                color: hex.convert("d454ff"),
                                author: {
                                    name: "BeatBox's Command List",
                                    iconURL: user.displayAvatarURL({ dynamic: true })
                                },
                                description: `\n/help\n/invite\n/leaderboard\n/ping\n/privacy\n/report\n/resetserver\n/resetuser\n/settime\n/stats\n/support\n/time\n+ VC Time (Context Menu)`,
                                footer: {
                                    text: "NOTE: If BeatBox commands aren't showing up and if its not registering your time either, then its probably due to missing permissions for command and channel visibility!\nIf you need help in troubleshooting use /support"
                                }
                            })
                        ]
                    });
                    i.deferUpdate();

                } else if (i.customId === "links") {

                    interaction.followUp({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder({
                                color: hex.convert("d454ff"),
                                author: {
                                    name: "Links Section",
                                    iconURL: user.displayAvatarURL({ dynamic: true })
                                },
                                description: `**Check out These Links Below!**\n\n[Invite Me](${invite})\n[Our Support Server](https://discord.gg/fwVaVUeJv7)\n[Vote for BeatBox on Top.gg](https://top.gg/bot/951245148875022417/vote)\n[Vote for BeatBox on Discord Bot List](https://discordbotlist.com/bots/beatbox-0375/upvote)\n[Discord Support](https://support.discord.com/hc/en-us)`,
                            })
                        ]
                    });
                    i.deferUpdate();

                };
            });

        } catch (error) {

            console.log(error);

        };
    },
};