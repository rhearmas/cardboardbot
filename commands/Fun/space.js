exports.run = async (client, message, args, level) => {
  if(!args[0]) {
  	message.delete();
	return (await message.reply("you didn't provide any text to space out!")).delete(5000);
  }

  let amount = 2;

  if(!isNaN(args[0])) {
  	amount = parseInt(args[0]);
  	(amount < 1) && (amount = 1);
  	(amount > 15) && (amount = 15);
  	args = args.slice(1);
  }

  message.delete();
  message.channel.send(args.join(' '.repeat(amount / 2)).split('').join(' '.repeat(amount)));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "space",
  category: "Fun",
  description: "Spaces out text to look all dramatic n' stuff.",
  usage: "space [amount] <text>"
};