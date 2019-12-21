const got = require('got');

exports.run = async (client, message, args, level) => {
  if (!args[0]) {
  	(await message.reply("you must specify a time to convert!")).delete(5000);
		message.delete();
		return;
	}

	let input = args.join(' ');
	let url = `https://api.duckduckgo.com/?q=${encodeURIComponent(input)}&format=json`;

	let msg = await message.channel.send(':arrows_counterclockwise: **Loading conversion...**');

	const res = await got(url, { json: true });

	if (!res || !res.body) {
		(await msg.edit(`${message.author}, I couldn't load data from DDG.`)).delete(5000);
	}

	let data = res.body;

	let answer = data['Answer'];
	let response;

	if (data['AnswerType'] === 'timezone_converter') {
		message.delete();

		let matches = input.match(/(.*?)\s*(to|in)\s*(.*)/);
		let prefix;

		if (matches) {
			prefix = matches[1];
		} else {
			prefix = input;
		}

		response = client.embed('', '', [
			{
				name: 'Timezone:',
				value: `${prefix} \u2794 ${answer}`
			}
		]);

		msg.edit({ embed: response });
	} else {
		(await msg.edit(`I couldn't find a conversion for \`${input}\`.`)).delete(5000);
		return;
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "timezone",
  category: "Utility",
  description: "Converts between timezones using DuckDuckGo.",
  usage: "timezone <time> to <zone>"
};