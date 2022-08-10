const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} = require("discord.js");
const voiceClient = require("../Events/Client/VoiceClient");
const humanizeDuration = require("humanize-duration");
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Show the server's top voice channel users."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {

        const { guild } = interaction;

        try {
            const list = (await voiceClient.sortUsers(guild)).sort((obj1, obj2) => obj2.Time - obj1.Time);
            const leaderboard = list
                .map((person, index) =>
                    `**#${index + 1}.** <@${person.User}> - ${humanizeDuration(person.Time,
                        {
                            delimiter: ", ",
                            round: true
                        })
                    }`).slice(0, 10).join("\n") || "Seems really empty here 🧐 Join a voice channel!";

            return interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("d454ff"),
                        title: `<:Beat:968213132050837505> ${guild.name}'s Leaderboard <:Beat:968213132050837505>`,
                        description: `${leaderboard}`,
                        footer: {
                            text: "I can only show the top 10, don't see your name there? Use /time!",
                            icon_url: guild.iconURL({ dynamic: true }) || "",
                        },
                    })
                ],
            }).catch(async () =>{
                return interaction.reply({
                    content: "An error occured when loading server leaderboard. Possible Error:\nToo many characters were inputted for display in the embed (max. 4000 char.).\nPlease report this to the developers with **/report** .",
                    ephemeral: true, 
                });
            });


        } catch (error) {

            console.log(error);

        };
    },
};