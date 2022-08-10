const { VoiceClient } = require("djs-voice");
const client = require("../../bot.js");
require('dotenv').config();

 // create a new listening voice client from the djs-voice package with your settings
const voiceClient = new VoiceClient({
    allowBots: false,
    client: client,
    debug: false,
    mongooseConnectionString: process.env.Database,
});

module.exports = voiceClient;