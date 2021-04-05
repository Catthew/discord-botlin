const {
    MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (args, client, message) => {
    let currentWeather = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER}&query=New York`)
        .then(res => res.json());
    const degree = String.fromCharCode(176);
    const location = currentWeather.location.name;
    const temp = parseInt(currentWeather.current.temperature) * 9 / 5 + 32;
    const weatherDesc = currentWeather.current.weather_descriptions[0];
    const weatherIcon = currentWeather.current.weather_icons[0];
    let embed = new MessageEmbed()
        .setColor('#7289da')
        .setDescription(`${temp}${degree}F and ${weatherDesc}`)
        .setThumbnail(weatherIcon)
        .setTitle(`Weather in ${location}`);
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'meow'
};