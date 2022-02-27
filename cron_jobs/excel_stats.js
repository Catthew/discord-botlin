const Excel = require('exceljs');

const stat_mapping = {
    2: 'kills',
    3: 'damageDealt',
    4: 'damageTaken',
    5: 'nat1',
    6: 'nat20',
    7: 'redCoin',
    8: 'healing',
    9: 'ko'
};

/**
 * Reads the spreadsheet and updates the characters stats.
 * @param {String} spreadsheet The file location of the spreadsheet (xlsx).
 * @param {Discord.Client} client The client instance of the bot.
 */
async function syncStats(spreadsheet, client) {
    const workbook = new Excel.Workbook();
    let stats = {};
    workbook.xlsx.readFile(spreadsheet)
        .then(() => {
            workbook.eachSheet((worksheet) => {
                for (let i = 2; i < 10; i++) {
                    const row = worksheet.getRow(i);
                    for (let j = 2; j < 10; j++) {
                        if (row.getCell(j).value == null) continue;
                        const character = row.getCell(1);
                        if (stats[character] === undefined) stats[character] = {};

                        if (stats[character][stat_mapping[j]] === undefined) stats[character][stat_mapping[j]] = row.getCell(j).value;
                        else stats[character][stat_mapping[j]] += row.getCell(j).value;
                    }
                }
            });
        })
        .finally(async () => {
            for (let stat in stats) {
                const kills = stats[stat]['kills'];
                const damageDealt = stats[stat]['damageDealt'];
                const damageTaken = stats[stat]['damageTaken'];
                const nat1 = stats[stat]['nat1'];
                const nat20 = stats[stat]['nat20'];
                const redCoin = stats[stat]['redCoin'];
                const healing = stats[stat]['healing'];
                const ko = stats[stat]['ko'];
                await client.setStats(stat, kills, damageDealt, damageTaken, nat1, nat20, redCoin, healing, ko);
            }
            const prefix = process.env.PREFIX;
            const channel = process.env.CHANNEL;
            client.channels.cache.get(channel).send(`${prefix} stats`).catch(console.error);
        });
}

module.exports = {
    syncStats
};