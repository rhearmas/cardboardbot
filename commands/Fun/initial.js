exports.run = async (client, message, args, level) => {
  if (!args[0]) {
		message.delete();
		return (await message.reply("you must input some text to be transformed.")).delete(5000);
	}
  message.delete();
	message.channel.send(args.map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(' '));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "initial",
  category: "Fun",
  description: "Transforms the text you insert into Initial Caps.",
  usage: "initial <text>"
};