const Discord = require('discord.js'); // requisita 'discord.js'
const bot = new Discord.Client(); // cria um client no 'discord.js'

const cooldowns = {};
const Keyv = require('keyv'); // requisita keyv
const database = new Keyv('sqlite://database.db'); // cria uma db no 'keyv'

const fs = require('fs'); // requisita 'fs'
const config = require('./config.json'); // requisista config.json

bot.commands = new Discord.Collection(); // cria uma collection no bot.commands 
bot.aliases = new Discord.Collection(); // cria uma collection no bot.commands.aliases
var commands_length = 0;
console.clear();
fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);
    let js_files = files.filter(f => f.split('.').pop() == 'js');
    js_files.forEach((f, i) => {
        console.log(`${f} carregado com sucesso ✅`)
        commands_length++;
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
    
        pull.config.aliases.forEach(alias => {
          bot.aliases.set(alias, pull.config.name);
        });
    });
});
bot.on('ready',  () => {
    console.log(' ');
    console.log(`${bot.user.username} ficou on com "${commands_length}" comandos`);
    let status = ['Algostiny#7174 onlyfans','the word of Moyai','your mother in my bed'];
    let statusType = ['STREAMING', 'LISTENING', 'PLAYING'];
    setInterval(() => {
        bot.user.setAFK()  
    }, 15000);
});

bot.on('message', async (message) => {
    const guild_db = (message.channel.type=='dm') ? {prefix: "*", lang: "en"} : (await database.get(`Guilds/${message.guild.id}/`)) ? await database.get(`Guilds/${message.guild.id}/`) : {prefix: "*", lang: "en"}
    let prefix = guild_db.prefix;
    let lang = guild_db.lang;

    if(!message.content.startsWith(prefix)||message.author.bot&&message.author.id==569277281046888488) return;
    const message_array = message.content.slice(prefix.length).split(' ');
    const args = message_array.slice(1);
    const command = message_array[0];
    if(cooldowns[message.author.id]) return message.channel.send("cooldown!")
    const command_file = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    if(command_file){
        let lang = require(`./langs/${guild_db.lang}`)[bot.aliases.get(command) || command];
        command_file.run(bot, message, args, lang, database, prefix);
    };
});

bot.login('Nzk4MzcwOTg3MDA3MDE2OTkw.X_0C7A.fpo7zFQ4ywk-dQ2oJvIAaUfR0ns'); // ;p fuck you
module.exports.cooldown = (id,time) =>{
    cooldowns[id] = time;
    setTimeout(()=>{
        cooldowns[id] = null;
    }, time * 1000)
};