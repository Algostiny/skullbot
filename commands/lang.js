const Discord = require('discord.js');
module.exports.run = async (bot, message, args, lang, database, prefix) => {
    if(message.channel.type=="dm"){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[0])
        .setDescription(lang.error[1])
        .setColor("#D90000");
        return message.channel.send(embed);
    };
    if(!message.member.hasPermission('ADMINISTRATOR')&&!message.member.hasPermission('MANAGE_SERVER')){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[2])
        .setDescription(lang.error[3])
        .setColor("#D90000");
        return message.channel.send(embed);
    }
    const language = await database.get(`Guilds/${message.guild.id}/Lang`);
    if(!language||language=="en"){
        await database.set(`Guilds/${message.guild.id}/Lang`, 'ptbr');
        var texts = ["<:pepe_br:798678027235360800> You're going to Brazil", "Agora irei falar em PT-BR. Para mudar use o comando novamente"];
    }
    else{
        await database.set(`Guilds/${message.guild.id}/Lang`, 'en');
        var texts = ["<:pepe_eua:798678027960713268> You're going to EUA", "Now I will speak in English. To change use the command again"]; 
    };
    let embed = new Discord.MessageEmbed()
    .setTitle(texts[0])
    .setDescription(texts[1])
    .setColor("#69D900");
    message.channel.send(embed);
};
module.exports.config = {
    name: "lang",
    aliases: ["language"]
};