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
        
        //await client.channels.cache.get("954583310737227847").send({files: ["F:/Important Photos/banner.png"]})
        //await wait(1000)
        //await client.channels.cache.get("954583310737227847")
        //.send({content: `
        //**1.** This is BeatBox support **only**. Any other kinds of topics, convos and/or assistance requests will be ignored or may even result in a warn/mute. \n\n**2.** If any kind of racist, political, and transphobia/homophobia or any kind of sensible topic is brought up it may result in a staff member to intervene and act as they see fit. \n\n**3.**No slurs or any kind of derogatory term. \n\n**4.** Be conscious and respectful of what you say to others. This is purely and simply a support server, be kind and helpful to others. \n\n**5.** No NSFW or any kind of age-restricted content or messages. Will result in a ban. \n\n**6.** No self-promotion, advertisement and/or spam in channels ever. \n\n**7.** Any kind of action that may seem suspicious and lean forward to scams will result in a quick and instant ban. \n\n**8.** Dont ask for nitro to anyone neither in dms nor here. \n\n**9.** Do not expect us to handle it immediately. We also are busy and have schedules. Be patient and even before reaching out to us just wait for BeatBox to respond correctly to your commands. If there is a delay in any kind of assistance, let us know.\n\n**10.** Do not mention specific roles or people for assistance, if somebody knows your problem, they will reply to you.\n\n`
        //});
        //await client.channels.cache.get("954583310737227847")
        //.send({content: `**11.** Your name or nickname must be something mentionable, latin characters from A-Z with no emojis too.\n\n**12.** Do not try to intervene nor act like a mod, if a complicated situation shows the need for staff to join in, ping one.\n\n**13.** Staff members can do as they see more fit to the situation. They can not follow the rules strictly and act on their own free will to help the server stay safe.\n\n**14.** English Only.\n\n**15.** Make sure to research your problem before coming to us.\n\n**16.** Dont just send \"I need help\" or \"Bot not working\" in support channels. Be more descriptive. \n\n**17.** Use the channels for their intended use. \n\n**18.**  All users must follow Discord's Terms Of Service (TOS) and Community Guidelines, any account that violates these rules will be banned from the server.\n\n**19.** Have a brain too that helps really often eh.\n\n**20.** Dont be annoying in general tbh.`})


        //const h = new WebhookClient({ url: "https://discord.com/api/webhooks/970013562258980904/4PPUoWR8aPxARCY66OXouZiuIUS5gqVApld5grUblPwxylH7sSEabIp_YcGtOJ-a3t12"})
        //h.send({
        //embeds: [
        //  new MessageEmbed({
        //    color: "#2f3136",
        //   title: "🏆 Oscar Nominations",
        // description: "**Starts Below <:smirkclown:910471810443788319>**",
        //  footer: {
        //      text: "Organized April 30 - May 7 2022",
        //  },
        // }).setImage("https://cdn.discordapp.com/attachments/890282271335120946/970019886946471956/unknown.png")
        //  ]})

        //client.channels.fetch("954583310737227847")
        //.then(async (c) => {
        // await c.send({
        //  embeds: [],
        // components: [
        // new MessageActionRow()
        // .addComponents(
        //   new MessageButton()
        //   .setEmoji("⬆")
        //   .setLabel("Jump to the top")
        //   .setURL(`https://discord.com/channels/954582914807509032/954583310737227847/959819028854112286`)
        //   .setStyle("LINK")

        // )
        //  ]
        // })
        //})
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