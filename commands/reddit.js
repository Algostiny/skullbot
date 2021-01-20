const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async(bot, message, args, lang) => {
    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[0])
        .setDescription(lang.error[1])
        .setColor("#D90000");
        return message.channel.send(embed);
    };

    let url = `https://www.reddit.com/r/${args[0]}/${args[1] || "new"}/.json?limit=10`;
    let response = (await superagent.get(url)).body;
    var posts = [];
    response.data.children.forEach(i => {
        if(!message.channel.nsfw&&i.data.over_18==true)return;
        if(i.data.url.endsWith('.png')||i.data.url.endsWith('.jpeg')||i.data.url.endsWith('.jpg')||i.data.url.endsWith('.gif')){
            posts.push(i.data)
        }
    });
    if(posts.length<1) return;
    message.channel.send(posts[Math.floor(Math.random() * posts.length)].url)
};
module.exports.config = {
    name: "reddit",
    aliases: []
};