/*
const makeCommand = method => {
		return (bot, msg, args) => {
				if (args.length < 1) {
						throw 'Please provide a word to search!';
				}

				const parsed = bot.utils.parseArgs(args, ['e']);
				const word = parsed.leftover.join(' ');

				webdict(method, word).then(res => {
						let result;
						if (!res || !res.definition || !res.definition[0]) {
								result = 'No results found.';
						} else {
								result = res.definition[0];
						}

						if (parsed.options.e) {
								msg.edit(result);
								return;
						}

						msg.delete();
						msg.channel.send({
								embed: bot.utils.embed(`:book: ${word}`, result)
						});
				});
		};
};

module.exports = [
		{
				run: makeCommand('dictionary'),
				info: {
						name: 'dictionary',
						aliases: ['dict'],
						usage: 'dictionary <word>',
						description: 'Looks a word up in the dictionary.',
						credits: 'NITEHAWK'
				}
		},
		{
				run: makeCommand('urbandictionary'),
				info: {
						name: 'urban',
						usage: 'urban <word>',
						description: 'Looks a word up in the urban dictionary.',
						credits: 'NITEHAWK'
				}
		}
];
*/

const webdict = require('webdict');

exports.run = async (client, message, args, level) => {
	message.delete();

	if (!args[0]) return message.reply("you didn't provide a valid word to look up.");

	const parsed = client.parseArgs(args, ['e']);
	const word = parsed.leftover.join(' ');

	webdict('urbandictionary', word).then(res => {
		let result;
		if (!res || !res.definition || !res.definition[0]) {
			result = 'No results found.';
		} else {
			result = res.definition[0];
		}

		if (parsed.options.e) {
			message.channel.send(result);
			return;
		}
		
		message.channel.send(client.embed(`:book: ${word}`, result));
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['urban'],
	permLevel: "User"
};

exports.help = {
	name: "urbandictionary",
	category: "Utility",
	description: "Looks up a word in the urban dictionary.",
	usage: "urbandictionary <word>"
};
