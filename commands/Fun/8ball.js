const responses = [
	'Ask again later.',
	'Soon.',
	'Yes.',
	'Absolutely!',
	'Never.',
	'When you are ready.',
	'Hopefully.',
	'Hopefully not.',
	'Oh my, why would you even ask that?',
	'What kind of a question is that?',
	'Over my dead body!',
	'Haha, funny joke.',
	'It is certain.',
	'It is decidedly so.',
	'Without a doubt.',
	'Yes - definitely.',
	'You may rely on it.',
	'As I see it, yes.',
	'Most likely.',
	'Outlook good.',
	'Signs point to yes.',
	'Reply hazy, try again.',
	'Better not tell you now.',
	'Cannot predict now.',
	'Concentrate and ask again.',
	'Don\'t count on it.',
	'My reply is no.',
	'My sources say no.',
	'Outlook not so good.',
	'Very doubtful.'
];

function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

exports.run = async (client, message, args, level) => {
  message.delete();

  if (args.length < 1) {
		return (await message.reply("Please specify something to ask of the magic 8-ball!")).delete(5000);
	}

	let response = randomItem(responses);

	const query = args.join(' ');

	if (query.indexOf('ipodtouch0218') > -1 || query.indexOf('233360087979130882') > -1) {
		response = 'HAH';
	}

	message.channel.send(`**${message.author.username}** asks: "${query}"\n**:8ball::** ${response}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "Ask the magic eight ball for wisdom.",
  usage: "8ball <query>"
};