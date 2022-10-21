const { Guild, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildCreate",
    /**
     * @param {Guild} guild
     * @param {Client} client
     */
    async execute(guild, client) {
        try {
            //this is to send a msg so you know what servers your bot joins and when it joins one
        } catch (error) {
            console.log(error);
        }
    },
};
