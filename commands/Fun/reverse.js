exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
		message.delete();
		return (await message.reply("text")).delete(5000);
	}
	message.delete();
	message.channel.send(args.join(' ').split('').reverse().join(''));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "reverse",
  category: "Fun",
  description: "Reverses the text you insert.",
  usage: "reverse <text>"
};