const { Guild, Client } = require("discord.js");
const voiceClient = require("../Client/VoiceClient");

module.exports = {
    name: "guildDelete",
    /**
     * @param {Guild} guild
     * @param {Client} client
     */
    async execute(guild, client) {
        try {

            await voiceClient.reset(guild);
    
        } catch (error) {

            console.log(error);

        };
    },
};