const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

exports.run = async (client, message, args, level) => {
	message.delete();

	if (!args[0]) {
		return (await message.reply("you must provide an equation to be solved!")).delete(5000);
	}

	const question = args.join(" ");

	let answer;
	try {
		answer = math.eval(question);
	} catch (err) {
		message.channel.send(`**Invalid math equation:** ${err}`);
	}

	message.channel.send(client.embed('', stripIndents`**Equation:**\n\`\`\`\n${question}\n\`\`\`**Answer:**\n\`\`\`\n${answer}\n\`\`\``));
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['calc', 'math'],
	permLevel: "User"
};

exports.help = {
	name: "calculator",
	category: "Utility",
	description: "Calculates almost any math equation",
	usage: "calculate <equation>"
};