const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (bot, message, args, lang) => {
    if(message.channel.type!="dm"&&!message.channel.nsfw){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[0])
        .setDescription(lang.error[1])
        .setColor("D90000");
        return message.channel.send(embed);
    }
    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[2])
        .setDescription(lang.error[3])
        .setColor("D90000");
        return message.channel.send(embed);
    }
    const image = (await superagent.get("https://nekos.life/api/v2/img/cum")).body.url;
    let embed = new Discord.MessageEmbed()
    .setDescription(`${message.author} ${lang.response} ${args.join(' ').trim()}`)
    .setImage(image)
    .setColor('RANDOM');
    message.channel.send(embed);
};
module.exports.config = {
    name: "cum",
    aliases: ["gozar"],
    en:{
        usage: "`*cum <alguém>`"
    },
    ptbr:{

    }
};