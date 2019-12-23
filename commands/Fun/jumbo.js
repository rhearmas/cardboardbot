exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
		message.delete();
		return (await message.reply("you didn't provide an emoji to enlarge.")).delete(5000);
	}

	if (args[0].charCodeAt(0) >= 55296) {
		message.delete();
		return (await message.reply("I can't enlarge Discord's built-in emoji.")).delete(5000);
	}

	const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

	if (!match || !match[1]) {
		message.delete();
		return (await message.reply("please provide a valid emoji.")).delete(5000);
	}

	const emoji = client.emojis.get(match[1]);

	if (!emoji) {
		message.delete();
		return (await message.reply("I couldn't identify that emoji.")).delete(5000);
	}

	message.delete();
	message.channel.send({
		files: [
			emoji.url
		]
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "jumbo",
  category: "Fun",
  description: "Enlarges an emoji.",
  usage: "jumbo <emoji>"
};