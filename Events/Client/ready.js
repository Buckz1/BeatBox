const {
    Client,
    WebhookClient,
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder }
    = require("discord.js");

require('dotenv').config();
const mongoose = require("mongoose");

module.exports = {
    name: "ready",
    once: true,
    /**
 * @param {Client} client
 */
    async execute(client) {

        console.log(`[Client] User now ready!`);
        
        if (!process.env.Database) return;

        mongoose.connect(process.env.Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("[Client] Connected to the Database!");
        }).catch((error) => {
            console.log(error);
        });
    }
};
