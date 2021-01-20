const Discord = require('discord.js');
module.exports.run = async (bot, message, args, lang) => {
    message.delete();
    const target = args.join(' ').trim();
    message.channel.startTyping();
    const m = await message.channel.send(`HACKING... ${target.replace(/ /, '_')}`);
    setTimeout(() => {
        var responses = ["is gay", "is trans", "is furry", "is brazilian", "is asian", "is a loli", "is jew"];
        m.edit(`${target} ${responses[Math.floor(Math.random() * responses.length)]} = true`).then(()=> {
            setTimeout(() => {
                var responses = ["Brazil", "England", "USA", "Chile", "Russia", "China", "Japan", "North Korea"];
                m.edit(`${target} - ${responses[Math.floor(Math.random() * responses.length)]} - ${Math.floor(Math.random() * 1010)}ms`).then(()=> {
                    setTimeout(() => {
                        var responses = ["gay","furry","master","cool","dude","xd","lol","games","super","kpop","tiktok", Math.floor(Math.random() * 100)];
                        var responses1 = ["gmail","hotmail","yahoo","lgbtqa+"]
                        let response = `${responses[Math.floor(Math.random() * responses.length)]}${responses[Math.floor(Math.random() * responses.length)]}${responses[Math.floor(Math.random() * responses.length)]}@${responses1[Math.floor(Math.random() * responses1.length)]}.com`
                        m.edit(`${target} - ${response}`).then(()=>{
                            setTimeout(() => {  
                                var responses = ["League Of Legends", "Free Fire", "e621", "r34", "pornhub", "xvideos", "nhentai", "onlyfans"];
                                m.edit(`${target} has account in ${responses[Math.floor(Math.random() * responses.length)]}`).then(()=>{
                                    setTimeout(() => {
                                        m.edit(`${target} was hacked!! :clown: :clown:`)
                                    }, 2000);
                                })
                            }, 2000);
                        })
                    }, 2000);
                    message.channel.stopTyping();
                })
            }, 2000);
        })
    }, 2000);
};
module.exports.config = {
    name: "hack",
    aliases: ["fakehack"]
};