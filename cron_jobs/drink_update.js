module.exports = async (client) => {

    const scheduleDrinks = await client.getScheduleDrinks();

    const turnCount = scheduleDrinks['turnCount'];
    const oldTurn = await client.setTurn(turnCount, false);

    if(oldTurn['nModified'] == 0){
        console.log(`Error. Update to original turn ${turnCount} failed.`);
        return;
    } 

    let newTurnCount;
    if(turnCount == 4){
        newTurnCount = 1;
    } else {
        newTurnCount = turnCount + 1;
    }
    const newTurn = await client.setTurn(newTurnCount, true);
    
    if(oldTurn['nModified'] == 0){
        console.log(`Error. Update to new turn ${turnCount} failed.`);
        return;
    } 

};