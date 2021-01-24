module.exports.run = async(bot, message, args) => {
    const got = require('got')
    const response = (!args[0]||args[0]=="br") ? await got('https://br.ifunny.co/') : await got('https://ifunny.co/');
    const responses = response.body.split('<');
    var videor = [];
    responses.forEach(u =>{
        if(u.indexOf(".mp4")!=-1){
            var a = u.split('"');
            a.forEach(u1 => {
                if(u1.indexOf(".mp4")!=-1) videor.push(u1);
            })
        }
    });
    message.channel.send(videor[Math.floor(Math.random() * videor.length)])
}
module.exports.config = {
    name: "ifunny",
    aliases: []
}