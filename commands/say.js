
const Discord = require('discord.js');
module.exports.run = async (bot, message, args, lang, prefix) => {
    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[0])
        .setDescription(lang.error[1])
        .setColor("#D90000");
        return message.channel.send(embed);
    };
    const message_array = message.content.split(' ');
    if(args[0]=="eu"&&args[1]=="sou"&&args[2]){
        return message.channel.send(`sim, você é ${message.content.slice(prefix.length + 7)}`);
    };
    if(message.member&&message.member.hasPermission('MENTION_EVERYONE')){
        message.channel.send(message_array.slice(1).join(' '));
    }
    else{
        message.channel.send(message_array.slice(1).join(' ').replace(/@everyone/, " everyone").replace(/@here/, " here"));
    };
};
module.exports.config = {
    name: "say",
    aliases: ["falar", "diga"],
    ptbr: {
        usage: '`*say <minha fala>`',
        description: 'Eu posso dizer o que você quiser rsrs',
        accesableby: "Todos"
    },
    en: {
        usage: '`*say <my speech>`'
    }
};