const Discord = require('discord.js');
module.exports.run = async (bot, message, args, lang, database, prefix) => {
    const command_file = (bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0])));
    if(!command_file){
        let embed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription(`${lang.response[4] + prefix}\``)
        .addField("<a:jotaro_dance:798401732584931348> Config", "`help` - `lang` - `prefix`")
        .addField("<a:gyro_dance:798401731348135967> Fun", "`8ball` - `say`")
        .addField(":underage: NSFW", "`cum` - `rule34`")
        .setColor("#69D900");
        message.channel.send(embed);
    }else{
        const command = command_file.config;
        const language = (lang.response[1]!='Usage') ? "ptbr" : "en";
        let embed = new Discord.MessageEmbed()
        .setTitle(`Help ${command.name}`)
        .addField(`${lang.response[0]}:`, `\`${command.aliases.join('\`, \`')}\``)
        .addField(`${lang.response[1]}:`, command[language].usage)
        .addField(`${lang.response[2]}:`, command[language].description)
        .addField(`${lang.response[3]}:`, command[language].accesableby)
        .setColor("#69D900");
        message.channel.send(embed);
    }
    
    require('../index.js').cooldown(message.author.id, 5);
};
module.exports.config = {
    name: "help",
    aliases: ["ajuda"],
    ptbr: {
        usage: "`*help` - Veja a lista de comandos\n`*help <comando>` - Exibe as informações de algum comando",
        description: "Se você consegue usar não acho que precise de uma descrição",
        accesableby: "Todo Mundo"
    },
    en: {
        usage: "`*help` - See the list of commands\n`*help <command>` - Displays information for any command",
        description: "If you can use it I don't think you need a description",
        accesableby: "Everyone"
    }
};