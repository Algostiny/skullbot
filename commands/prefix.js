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
    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[4])
        .setDescription(`${lang.error[5]}`)
        .setColor("#D90000");
        return message.channel.send(embed);
    };
    await database.set(`Guilds/${message.guild.id}/Prefix`,args.join(' ').trim());
    let embed = new Discord.MessageEmbed()
        .setTitle(lang.response[0])
        .setDescription(`${lang.response[1]}\`${args.join(' ').trim()}\``)
        .setColor("#69D900");
    message.channel.send(embed);
};
module.exports.config = {
    name: "prefix",
    aliases: ["setprefix", "prefixo"]
};