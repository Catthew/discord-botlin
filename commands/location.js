const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');
const common = require('../utils/common_functions');
const responses = require('../utils/constants/responses');

const filename = __filename.slice(__dirname.length + 1);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('location')
        .setDescription('Sends current location of the group.'),
    async execute(args, client, message) {
        let currentLocation;
        try { currentLocation = await client.getCurrentLocation(); }
        catch (error) {
            common.logAndSendError(error, filename, message, responses['info_error'][1]);
            return;
        }
        if (currentLocation === null) message.channel.send(responses['info_error'][1]).catch(console.error);
        else {
            const embedBuilder = new EmbedBuilder()
                .setColor('#7289da')
                .setDescription(currentLocation['name'])
                .setTimestamp()
                .setTitle(`Where is ${process.env.TEAMNAME}!? `);
            message.channel.send({
                embeds: [embedBuilder]
            }).catch(console.error);
        }
    }
};