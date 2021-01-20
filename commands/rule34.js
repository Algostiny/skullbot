const Discord = require('discord.js');
const superagent = require('superagent');
const { enableColor } = require('npmlog');
module.exports.run = async (bot, message, args, lang) => {
    if(message.channel.type!="dm"&&!message.channel.nsfw){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[0])
        .setDescription(lang.error[1])
        .setColor("#D90000");
        return message.channel.send(embed);
    }
    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[2])
        .setDescription(lang.error[3])
        .setColor("#D90000");
        return message.channel.send(embed);
    }
    const url = (await superagent.get('https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=25&tags='+args.join('_'))).body;
    if(!url||url==""){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[4])
        .setDescription(lang.error[5])
        .setColor("#D90000");
        return message.channel.send(embed);
    }
    var number = 0;
    var hentai = url[number];
    var embed = new Discord.MessageEmbed()
    .setDescription(`Search: \`${args.join('_').slice(0,500)}\`\nId: ${hentai.id}\nTags: \`${hentai.tags.split(' ').slice(0, 20).join('`, `')}\``)
    .setImage(hentai.sample_url)
    .setColor("#69D900");
    const a = await message.channel.send(embed);
    a.react('◀')
    a.react('▶')
    const filter = (reaction, user) => {
        let b = (reaction.emoji.name == '▶'||reaction.emoji.name== '◀') ? true : false;
        return b;
    };
    const collector = a.createReactionCollector(filter, { time: 180000 });
    collector.on('collect', (reaction, user) => {
        if(user.id!=message.author.id) return
        if(reaction.emoji.name=="▶️"||reaction.emoji.name=="▶"){
            number++;
            if(!url[number]) number = 0;
            hentai = url[number]
            var embed = new Discord.MessageEmbed()
              .setDescription(`Search: \`${args.join('_').slice(0,500)}\`\nId: ${hentai.id}\nTags: \`${hentai.tags.split(' ').slice(0, 20).join('`, `')}\``)
              .setImage(hentai.sample_url)
              .setColor("#69D900");
            a.edit(embed);
        }
        else{
            number--;
            if(!url[number]) number = url.length-1;
            hentai = url[number]
            var embed = new Discord.MessageEmbed()
              .setDescription(`Search: \`${args.join('_').slice(0,500)}\`\nId: ${hentai.id}\nTags: \`${hentai.tags.split(' ').slice(0, 20).join('`, `')}\``)
              .setImage(hentai.sample_url)
              .setColor("#69D900");
            a.edit(embed);
        }
    });
};
module.exports.config = {
    name: "rule34",
    aliases: ["r34"]
};