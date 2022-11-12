const Excel = require('exceljs');
const common = require('../../utils/common_modules');
const optionalStats = require('./utils/optional_stats');

const FILENAME = __filename.slice(__dirname.length + 1);

/**
 * Reads the spreadsheet and updates the characters stats.
 * @param {String} spreadsheet The file location of the spreadsheet (xlsx).
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Boolean} sync If the command was run by the stats sync command.
 */
async function syncStats(spreadsheet, client, sync) {
    const workbook = new Excel.Workbook();
    let stats = {};
    workbook.xlsx.readFile(spreadsheet)
        .then(() => {
            workbook.eachSheet((worksheet) => {
                for (let i = 2; i < 10; i++) {
                    const row = worksheet.getRow(i);
                    const character = row.getCell(1);
                    if (stats[character] === undefined) stats[character] = {};
                    for (let j = 2; j < 10; j++) {
                        if (row.getCell(j).value == null) continue;
                        
                        const rowValue = row.getCell(j).value;
                        if (typeof rowValue !== 'number') throw new Error(`Sheet [${worksheet.name}] and cell [${worksheet.getRow(i).getCell(j)._address}] contains an invalid character. Please remove!`);
                        
                        const header = worksheet.getRow(1).getCell(j);
                        if (stats[character][header] === undefined) stats[character][header] = rowValue;
                        else stats[character][header] += rowValue;
                    }
                }
            });
        })
        .then(async () => {
            for (let name in stats) {
                const damageDealt = stats[name]['damageDealt'] === undefined ? 0 : stats[name]['damageDealt'];
                const damageTaken = stats[name]['damageTaken'] === undefined ? 0 : stats[name]['damageTaken'];
                const healing = stats[name]['healing'] === undefined ? 0 : stats[name]['healing'];
                const kills = stats[name]['kills'] === undefined ? 0 : stats[name]['kills'];
                const knockedOut = stats[name]['knockedOut'] === undefined ? 0 : stats[name]['knockedOut'];
                const nat1s = stats[name]['nat1s'] === undefined ? 0 : stats[name]['nat1s'];
                const nat20s = stats[name]['nat20s'] === undefined ? 0 : stats[name]['nat20s'];

                let tempOptionalStats = null;
                const oSKeys = Object.keys(optionalStats);
                for (let stat in oSKeys) {
                    const oStat = oSKeys[stat];
                    const excelOSName = '[OS] ' + oStat ;
                    if (excelOSName in stats[name]) {
                        if (tempOptionalStats === null) tempOptionalStats = {};
                        tempOptionalStats[oStat] = stats[name][excelOSName] === undefined ? 0 : stats[name][excelOSName];
                    }
                }
                try {
                    await client.setStats(damageDealt, damageTaken, healing, kills, knockedOut, name, nat1s, nat20s, tempOptionalStats);
                } catch (error) {
                    common.logAndSendError(error, FILENAME, null, null);
                }
            }
            const channel = (sync) ? process.env.CHANNELDEV : process.env.CHANNELGENERAL;
            const prefix = process.env.PREFIX;
            client.channels.cache.get(channel).send(`${prefix} stats`).catch(console.error);
        }).catch(error => {
            common.logAndSendError(error, FILENAME, null, null);
        });
}

module.exports = {
    syncStats
};