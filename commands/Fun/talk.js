const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	msg = args.join(" ");
	await message.delete();
	
	if(args.length === 0) {
		return (await message.reply("please insert a valid message.")).delete(5000);
	}

	let location = message.channel;
	guild = message.guild;

	if(args[0].startsWith('<#') && args[0].endsWith('>')) {
		location = args[0].slice(2, -1);
		location = guild.channels.find(c => c.id === location);
		msg = msg.replace(/[0-9]+/g, "").replace(/[$<#>]+/g, "").slice(1);
		console.log(`msg is ${msg}`)
	}
	
	location.send(msg);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "talk",
  category: "Fun",
  description: "Talk as the bot in the current channel you're in.",
  usage: "talk <text>"
};