const Excel = require('exceljs');
const common = require('../../utils/common_functions');
const optional_stats = require('../../utils/constants/optional_stats');
const filename = __filename.slice(__dirname.length + 1);

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
                    for (let j = 2; j < 10; j++) {
                        const header = worksheet.getRow(1).getCell(j);
                        if (row.getCell(j).value == null) continue;
                        const character = row.getCell(1);
                        if (stats[character] === undefined) stats[character] = {};
                        const rowValue = row.getCell(j).value;
                        if (typeof rowValue !== 'number') throw new Error(`Sheet [${worksheet.name}] and cell [${worksheet.getRow(i).getCell(j)._address}] contains an invalid character. Please remove!`);
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

                let optionalStats = null;
                const oSKeys = Object.keys(optional_stats);
                for (let stat in oSKeys) {
                    const optionalStat = oSKeys[stat];
                    const excelOSName = '[OS] ' + optionalStat;
                    if (excelOSName in stats[name]) {
                        if (optionalStats === null) optionalStats = {};
                        optionalStats[optionalStat] = stats[name][excelOSName] === undefined ? 0 : stats[name][excelOSName];
                    }
                }
                try {
                    await client.setStats(damageDealt, damageTaken, healing, kills, knockedOut, name, nat1s, nat20s, optionalStats);
                } catch (error) {
                    common.logAndSendError(error, filename, null, null);
                }
            }

            const prefix = process.env.PREFIX;
            if (sync) client.channels.cache.get(process.env.CHANNELDEV).send(`${prefix} stats`).catch(console.error);
            else client.channels.cache.get(process.env.CHANNELGENERAL).send(`${prefix} stats`).catch(console.error);
        }).catch(error => {
            common.logAndSendError(error, filename, null, null);
        });
}

module.exports = {
    syncStats
};