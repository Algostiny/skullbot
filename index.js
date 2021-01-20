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
    if(message.channel.type=="dm"){
        var prefix = "*";
    }
    else{
        var prefix = await database.get(`Guilds/${message.guild.id}/Prefix`) || "*";
    };
    if(!message.content.startsWith(prefix)||message.author.bot&&message.author.id==569277281046888488) return;
    const message_array = message.content.slice(prefix.length).split(' ');
    const args = message_array.slice(1);
    const command = message_array[0];
    if(cooldowns[message.author.id]) return message.channel.send("cooldown!")
    const command_file = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    if(command_file){
        if(message.channel.type=="dm"){
            var lang = require('./langs/en.json')[command_file.config.name]   
        }
        else{
            var lang = (await database.get(`Guilds/${message.guild.id}/Lang`) == "ptbr") ? require('./langs/ptbr.json')[command_file.config.name] : require('./langs/en.json')[command_file.config.name];
        }
        command_file.run(bot, message, args, lang, database, prefix);
    };
});

bot.login(config.token);
module.exports.cooldown = (id,time) =>{
    cooldowns[id] = time;
    setTimeout(()=>{
        cooldowns[id] = null;
    }, time * 1000)
};