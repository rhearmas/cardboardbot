let _inverseReplacementsCached = null;
const getInverseReplacements = replacements => {
	if (_inverseReplacementsCached) {
		return _inverseReplacementsCached;
	}
	const inverseReplacements = new Map();
	Object.keys(replacements)
		.map(letter => {
			replacements[letter].forEach(replacement => {
				inverseReplacements.set(new RegExp(global.utils.quoteRegex(replacement), 'gi'), letter);
			});
		});

	_inverseReplacementsCached = inverseReplacements;

	return inverseReplacements;
};

exports.run = async (client, message, args, level) => {
  const parsedArgs = client.parseArgs(args, ['e', 't']);

	if (parsedArgs.leftover.length < 1) {
		message.delete();
		return (await message.reply("please provide some text to convert.")).delete(5000);
	}

	let parsed;

	if (parsedArgs.options.e) {
		const extendedLeetReplacements = {
			'a': ['4', '@', '/-\\', 'Д'],
			'b': ['ß'],
			'c': ['¢', '©'],
			'e': ['3', '€'],
			'f': ['ph', 'ƒ'],
			'g': ['6'],
			'i': ['1', '!'],
			'l': ['7'],
			'n': ['И', 'ท'],
			'q': ['Ø'],
			'r': ['®', 'Я'],
			's': ['5', '$', '§'],
			't': ['†'],
			'u': ['|_|', 'µ', 'บ'],
			'v': ['\\/'],
			'w': ['\\/\\/', 'VV', 'Ш', 'พ'],
			'x': ['Ж', '×'],
			'y': ['¥']
		};

		const inverseReplacements = getInverseReplacements(extendedLeetReplacements);
		if (parsedArgs.options.t) {
			parsed = parsedArgs.leftover.join(' ');

			for (let [replacement, origValue] of inverseReplacements) {
				parsed = parsed.replace(replacement, origValue);
			}
		} else {
			parsed = parsedArgs.leftover
				.join(' ')
				.replace(/[a-z]/gi, str => {
					let selection = client.randomSelection(extendedLeetReplacements[str.toLowerCase()] || [str]);
					selection = client.quoteRegex(selection);
					return selection;
				});
		}
	} else {
		const simpleLeetReplacements = '4BCD3F6H1JKLMN0PQR57';
		if (parsedArgs.options.t) {
			parsed = parsedArgs.leftover.join(' ').replace(/[a-z0-9]/g, function (a) {
				let foundInReplacements = simpleLeetReplacements.indexOf(a);
				if (foundInReplacements === -1) {
					return a;
				}
				return String.fromCharCode(97 + foundInReplacements);
			});
		} else {
			parsed = parsedArgs.leftover.join(' ').replace(/[a-z]/g, function f(a) {
				return simpleLeetReplacements[parseInt(a, 36) - 10] || a.replace(/[a-t]/gi, f);
			}).toLowerCase();
		}
	}

	message.delete();
	message.channel.send(parsed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leet",
  category: "Fun",
  description: "Talk like a true gamer.",
  usage: "leet <text>"
};