const Excel = require('exceljs');

let stats = {};

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

module.exports = async (spreadsheet, client) => {
    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(spreadsheet)
        .then(() => {
            workbook.eachSheet((worksheet) => {
                for (let i = 2; i < 10; i++) {
                    let row = worksheet.getRow(i);
                    for (let j = 2; j < 10; j++) {
                        if (row.getCell(j).value == null) {
                            continue;
                        }

                        let character = row.getCell(1);
                        if (stats[character] === undefined) {
                            stats[character] = {};
                        }
                        if (stats[character][stat_mapping[j]] === undefined) {
                            stats[character][stat_mapping[j]] = row.getCell(j).value;
                        } else {
                            stats[character][stat_mapping[j]] += row.getCell(j).value;
                        }
                    }
                }
            });
        })
        .finally(async () => {
            for(let stat in stats){
                let kills = stats[stat]['kills'];
                let damageDealt = stats[stat]['damageDealt'];
                let damageTaken = stats[stat]['damageTaken'];
                let nat1 = stats[stat]['nat1'];
                let nat20 = stats[stat]['nat20'];
                let redCoin = stats[stat]['redCoin'];
                let healing = stats[stat]['healing'];
                let ko = stats[stat]['ko'];
                await client.setStats(stat, kills, damageDealt, damageTaken, nat1, nat20, redCoin, healing, ko);
            }
        });
};