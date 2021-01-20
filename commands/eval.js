module.exports.run = async (bot, message, args) => {
    if(message.author.id!=743203231148146800) return
    eval(args.join(' '))
}
module.exports.config = {
    name: "eval",
    aliases: ["poctpoct"]
}