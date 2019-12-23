const mapping = {
	' ': '   ',
	'0': ':zero:',
	'1': ':one:',
	'2': ':two:',
	'3': ':three:',
	'4': ':four:',
	'5': ':five:',
	'6': ':six:',
	'7': ':seven:',
	'8': ':eight:',
	'9': ':nine:',
	'!': ':grey_exclamation:',
	'?': ':grey_question:',
	'#': ':hash:',
	'*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
	mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
		message.delete();
		return (await message.reply("Please specify something to ask of the magic 8-ball!")).delete(5000);
	}
	message.delete();
	message.channel.send(
		args.join(' ')
			.split('')
			.map(c => mapping[c] || c)
			.join('')
	);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "fanceh",
  category: "Fun",
  description: "Renders text in big emoji letters.",
  usage: "fanceh <text>"
};