const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!')
})

client.on("message", async message => {
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (message.channel.id === "565353778635866152") {
	    if (command === `${prefix}accept`) {
            message.delete(command);
            let embed = new Discord.RichEmbed()
	            .setColor('#0080ff')
                .setTitle('Welcome to Kittropolis')
                .setAuthor(message.author.username)
                .setDescription('If you would like to invite your friends please do so! ``https://discord.gg/9zwFkBZ``')
	            .addField(`You have accepted the rules.`, 'Understand that you will be expected to follow them.', true)
	            .setTimestamp()
	            .setFooter('Accepted');

            message.channel.send(embed);
            message.channel.send("Please check out #server-info for connection methods and general information. If you have any suggestions for us please put them in the #suggestion-box and if you need any further assistance message in #help!");
            let role = message.guild.roles.find(r => r.name === "Member");
            let member = message.member;
            member.addRole(role).catch(console.error);
        }
    } 
});

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}, please read the rules and if you have any questions go to #help, otherwise, type k!accept`);
});

client.login(token);