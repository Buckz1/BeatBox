const client = require("../../bot.js");
const voiceClient = require("../Client/VoiceClient");

// make the client listen to the voiceStateUpdate event and see the oldState and newState of a users voice channel
client.on("voiceStateUpdate", (oldState, newState) => {
    voiceClient.startListener(oldState, newState);
});