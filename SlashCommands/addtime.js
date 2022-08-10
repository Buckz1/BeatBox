const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionsBitField,
    SlashCommandBuilder,
} = require("discord.js");
const voiceClient = require("../Events/Client/VoiceClient");
const humanizeDuration = require("humanize-duration");
const hex = require("hex-to-64int");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addtime")
        .setDescription("Add voice channel time to yours or an user's record in this server.")
        .addUserOption(option => option
            .setName("member")
            .setDescription("Mention a user to get set the time to.")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("years")
            .setDescription("Provide a number of years to set [Years are of 365 days].")
            .setRequired(false))
        .addNumberOption(option => option
            .setName("months")
            .setDescription("Provide a number of months to set [Months are of 30 days].")
            .setRequired(false))
        .addNumberOption(option => option
            .setName("weeks")
            .setDescription("Provide a number of weeks to set.")
            .setRequired(false))
        .addNumberOption(option => option
            .setName("days")
            .setDescription("Provide a number of days to set.")
            .setRequired(false))
        .addNumberOption(option => option
            .setName("hours")
            .setDescription("Provide a number of hours to set.")
            .setRequired(false))
        .addNumberOption(option => option
            .setName("minutes")
            .setDescription("Provide a number of minutes to set.")
            .setRequired(false))
        .addNumberOption(option => option
            .setName("seconds")
            .setDescription("Provide a number of seconds to set.")
            .setRequired(false))
    ,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, guild, user, member } = interaction;

        if (!member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {

            return interaction.reply({
                content: "You can't use this command. You need the \`Manage Server\` permission in one of your roles. ⛔",
                ephemeral: true
            });
        };

        const User = options.getUser("member");
        const years = options.getNumber("years");
        const months = options.getNumber("months");
        const weeks = options.getNumber("weeks");
        const days = options.getNumber("days");
        const hours = options.getNumber("hours");
        const minutes = options.getNumber("minutes");
        const seconds = options.getNumber("seconds");
        if(!years && !months && !weeks && !days && !hours && !minutes && !seconds) return interaction.reply({ content: "You need to fill atleast one option.", ephemeral: true});

        const record = [];

        if(years) record.push(years * 1000 * 60 * 60 * 24 * 365 );
        if(months) record.push(months * 1000 * 60 * 60 * 24 * 30);
        if(weeks) record.push(weeks * 1000 * 60 * 60 * 24 * 7);
        if(days) record.push(days * 1000 * 60 * 60 * 24);
        if(hours) record.push(hours * 1000 * 60 * 60);
        if(minutes) record.push(minutes * 1000 * 60);
        if(seconds) record.push(seconds * 1000);

        let sum = 0;
        for ( let i = 0; i < record.length; i++) {
            sum+= record[i];
        };
        
        const duration = humanizeDuration(sum, {
            delimiter: ", ",
            round: true
        });

        try {

            const userinfo = await voiceClient.getUserData(guild, User);

            if (!userinfo) return interaction.reply({
                embeds: [
                    new EmbedBuilder({
                        color: hex.convert("ff4e4e"),
                        author: {
                            name: `This member has either no voice channel time record to change!`,
                            iconURL: user.displayAvatarURL({ dynamic: true })
                        }
                    })
                ], ephemeral: true
            });

            voiceClient.setTime(guild, User, userinfo.Time + sum);

            return interaction.reply({
                content: `Added ${duration} to **${User.tag}.**`,
                ephemeral: true,
            });

        } catch (error) {

            console.log(error);

        };
    },
};