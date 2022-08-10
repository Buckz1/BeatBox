const { Guild, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildCreate",
    /**
     * @param {Guild} guild
     * @param {Client} client
     */
    async execute(guild, client) {
        try {
            const ownerId = (await client.application.fetch()).owner.id;
            const channel = await client.channels.fetch("977958304171053077");
            channel.send({
                content: `<@${ownerId}>`,
                embeds: [
                    new EmbedBuilder({
                        color: `#d454ff`,
                        author: {
                            name: `New Server Joined!`,
                            iconURL: client.user.displayAvatarURL({ dynamic: true }),
                        },
                        description: `BeatBox just joined **${guild.name}**\n\nAt: <t:${parseInt(guild.joinedTimestamp / 1000)}:f>.`,
                        fields: [
                            { name: `Members`, value: `\`\`\`${guild.memberCount}\`\`\``, inline: true },
                            { name: `Id`, value: `\`\`\`${guild.id}\`\`\``, inline: false },
                        ],
                    }).setThumbnail(guild.iconURL({ dynamic: true }))
                ]
            });


        } catch (error) {
            console.log(error);
        }
    },
};