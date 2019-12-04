exports.run = async (client, message, args, level) => {
	const response = await client.awaitReply(message, "Favourite Color?");
	message.reply(`I really love ${response} too!`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "color",
  category: "Fun",
  description: "Who likes a color?",
  usage: "color"
};