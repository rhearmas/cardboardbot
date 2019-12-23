const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
		message.delete();
		return (await message.channel.send("Please provide some text to clapify")).delete(5000);
	}
  message.delete();
	message.channel.send(args.map(randomizeCase).join(':clap:'));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "clap",
  category: "Fun",
  description: "Clap clap clap! Clapifies your text.",
  usage: "clap <text>"
};