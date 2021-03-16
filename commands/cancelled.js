exports.run = async (args, client, message) => {
    let cancelled = await client.getCancelled("");
    let complain = cancelled.cancelled ? "Yes... You are safe for another week..." : "No... Get yourself to the DMs place on Saturday at 6...";
    message.channel.send(complain).catch(console.error);
};

exports.help = {
    name: 'cancelled'
};