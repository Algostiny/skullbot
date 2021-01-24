const got = require('got');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args, lang) => {
    if(message.channel.type!="dm"&&!message.channel.nsfw){
        let embed = new Discord.MessageEmbed()
        .setTitle(lang.error[0])
        .setDescription(lang.error[1])
        .setColor("#D90000");
        return message.channel.send(embed);
    }
    let response = (await got('https://hqdesexo.com')).body;
    let splitted = (response.split('"'));
    let images = splitted.filter(v => v.indexOf('.jpg')!=-1);
    let urls = splitted.filter(v => v.indexOf('.html')!=-1);
    let number = 0;
    let embed = new Discord.MessageEmbed()
    .setDescription(`${lang.response[0]}: ${urls[number*2].slice(25, -5).replace(/-/g, ' ')}`)
    .setImage(images[number])
    .setColor('RANDOM');
    let msg = await message.channel.send(embed);
    msg.react('◀');
    msg.react('⬆')
    msg.react('▶');
    const filter = (reaction, user) => {
        let b = (reaction.emoji.name == '▶'||reaction.emoji.name== '◀'||reaction.emoji.name== '⬆') ? true : false;
        return b;
    };
    let level = 0;
    const collector = msg.createReactionCollector(filter, { time: 180000 });
    collector.on('collect', async (reaction, user) => {
        if(message.author.id!=user.id) return;
        if(reaction.emoji.name=='▶'){
            if(level==1)return;
            if(!images[number]) number = 0;
            number++;
            let embed = new Discord.MessageEmbed()
            .setDescription(`${lang.response[0]}: ${urls[number*2].slice(25, -5).replace(/-/g, ' ')}`)
            .setImage(images[number])
            .setColor('RANDOM');
            msg.edit(embed);
        }
        else if(reaction.emoji.name=='◀'){
            if(level==1)return;
            if(!images[number]) number = images.length-2;
            number--;
            let embed = new Discord.MessageEmbed()
            .setDescription(`${lang.response[0]}: ${urls[number*2].slice(25, -5).replace(/-/g, ' ')}`)
            .setImage(images[number])
            .setColor('RANDOM');
            msg.edit(embed);
        }
        else if(reaction.emoji.name=='⬆'){
            level++
            let response = (await got(urls[number*2])).body;
            let splitted = (response.split('"'));
            let images1 = splitted.filter(v => v.indexOf('.jpg')!=-1);
            let number1 = 0;
            let embed = new Discord.MessageEmbed()
            .setDescription(`${urls[number*2].slice(25, -5).replace(/-/g, ' ')}`)
            .setImage(images1[number1])
            .setColor('RANDOM');
            msg.edit(embed);
            const filter1 = (reaction, user) => {
                let b = (reaction.emoji.name == '▶'||reaction.emoji.name== '◀'||reaction.emoji.name== '⬆') ? true : false;
                return b;
            };
            const collector1 = msg.createReactionCollector(filter, { time: 180000 });
            
            collector1.on('collect', (reaction, user) => {
                if(message.author.id!=user.id) return;
                if(reaction.emoji.name=='▶'){
                    if(number1==urls.length*2) number = 0;
                    number1++;
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`${urls[number*2].slice(25, -5).replace(/-/g, ' ')}`)
                    .setImage(images1[number1])
                    .setColor('RANDOM');
                    msg.edit(embed);
                }
                else if(reaction.emoji.name=='◀'){
                    if(number1==0) number = urls.length-1;
                    number1--;
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`${urls[number*2].slice(25, -5).replace(/-/g, ' ')}`)
                    .setImage(images1[number1])
                    .setColor('RANDOM')
                    .setFooter(`${(number1<10) ? '0' + number1 : number1}/${images1.length}`);
                    msg.edit(embed);
                }
            })
        };
    });
};
module.exports.config = { 
    name: "hqdesexo",
    aliases:[]
};