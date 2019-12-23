const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	msg = args.join(" ");
	await message.delete();
	
	if(args.length == 0)
		return message.reply("please insert a valid message.")
	.then(msg => {
		msg.delete(5000).catch(e => {e})
	})
	
	message.channel.send(msg);
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
  usage: "talk text"
};