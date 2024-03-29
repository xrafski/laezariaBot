const { Discord, sendEmbedLog, embedColors, LaezariaIconURL } = require('../laezariaBot');
const config = require("../bot-settings.json");

module.exports.help = {
    name: "edit",
    description: "Modifies the bot messages.",
    type: "manager",
    usage: `ℹ️ Format: **${config.botPrefix}edit messageID contentToReplace**\n\nℹ️ Example: ${config.botPrefix}edit 701686429289414696 I like trains`
};

module.exports.run = async (bot, message, args) => {

    //////////////////////////////////////////////////////////////////////////////////////////////
    //                                  edit messageID content                                  //
    //////////////////////////////////////////////////////////////////////////////////////////////

    if (args[0]) {

        let messageID = args[0];
        let message2edit = message.content.split(' ').splice(2).join(' ');

        if (messageID && message2edit) {
            return EditTheMessage(messageID, message2edit);
        } else return message.channel.send(`Wrong command format, type **${config.botPrefix}help ${module.exports.help.name}** to see usage and examples!`)
            .then(message => message.delete({ timeout: 10000 })).catch(() => { return });
    } else return message.channel.send(`Wrong command format, type **${config.botPrefix}help ${module.exports.help.name}** to see usage and examples!`)
        .then(message => message.delete({ timeout: 10000 })).catch(() => { return });

    //////////////////////////////////////////////////////////////////////////////////////////////

    async function EditTheMessage(A1, A2) {

        let messageEdited = await message.channel.messages.fetch(A1)
            .then(message2edit => message2edit.edit(A2))
            .catch(() => { // error when bot trying to edit wrong or message on the different channel
                return message.channel.send(`Unfortunately, but I can't find the message you tried to edit.\nMake sure to type that command on the same channel as the target message!`)
                    .then(message => message.delete({ timeout: 10000 })).catch(() => { return; });
            });

        if (messageEdited) {
            if (messageEdited.content === A2) {
                // define the embed: edit success
                let embed_edit_success = new Discord.MessageEmbed()
                    .setColor(embedColors.EditMessage)
                    .setAuthor(`Message modified!`, LaezariaIconURL)
                    .setTitle(`${config.botPrefix}edit`)
                    .setDescription(`New message content:\n` + '```' + `${A2}` + '```')
                    .addFields(
                        { name: 'Used by', value: `${message.author}`, inline: true },
                        { name: 'Channel', value: `${message.channel}`, inline: true },
                        { name: 'MessageID', value: `${message.channel.id}\n\n[**Jump to modified message**](${messageEdited.url})`, inline: false })
                    .setFooter(`LOG:ID EditJS_1`)
                    .setTimestamp()

                message.channel.send(`✅ Done!\nMessage modified!`)
                    .then(message => {
                        message.delete({ timeout: 5000 }).catch(() => { return; });
                        return sendEmbedLog(embed_edit_success, config.botlogs.channelID, 'Laezaria Bot - Logs');
                    });
            }
        }
    }
}