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
