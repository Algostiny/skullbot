const Discord = require('discord.js');
module.exports.run = async (bot, message, args, lang) => {
    if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[0])
        .setDescription(lang.error[1])
        .setColor("#D90000");
        return message.channel.send(embed);
    };
    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[2])
        .setDescription(lang.error[3])
        .setColor("#D90000");
        return message.channel.send(embed);
    };
    const character = ["monkey", "moyai", "shrek", "8ball", "einstein"];
    const characters = ["Monkey", "Moyai Stone", "Shrek", "8ball", "Albert Einstein"]
    const character_avatars = ["https://cdn.discordapp.com/attachments/798755652112613387/798755664628547635/51YLsREcAaL.png",
    "https://cdn.discordapp.com/attachments/798755652112613387/798755835576188938/1f5ff.png",
    "https://cdn.discordapp.com/attachments/798755652112613387/798755733339766784/unknown.png",
    "https://cdn.discordapp.com/attachments/798755652112613387/798755888746725396/kisspng-magic-8-ball-8-ball-pool-eight-ball-clip-art-q-vector-5ade91fc9c06a2.png",
    "https://cdn.discordapp.com/attachments/798755652112613387/798755938454470686/unknown.png"];
    const character_number = Math.floor(Math.random() * character.length);
    const responses = lang.response[character[character_number]];
    const response = responses[Math.floor(Math.random() * responses.length)];
    const webhook = (await message.channel.fetchWebhooks()).first();
    if(!webhook){
    message.channel.createWebhook(`${character[character_number]}`, {
        avatar: character_avatars[character_number],
    })
    .then(async (webhook) => {
        await webhook.send(response, {
			username: characters[character_number],
			avatarURL: character_avatars[character_number]
        })
        webhook.delete()
    });
  }
  else{
    await webhook.send(response, {
        username: characters[character_number],
        avatarURL: character_avatars[character_number]
    });
  };
};
module.exports.config = {
    name: "8ball",
    aliases: ["bola8", "pergunta", "ask"],
    ptbr: {
        usage: "`*8ball <questão>` - Faça uma questão",
        description: "Me faça algumas questões",
        accesableby: "Todo Mundo"
    },
    en: {
        usage: "`*8ball <question>` - Make a question",
        description: "Ask me any questions",
        accesableby: "Everyone"
    }
};