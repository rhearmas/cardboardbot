exports.methods = {
	encode: input => {
		return input.toString().split('')
			.map(c => c.charCodeAt(0).toString(2));
	},
	decode: input => {
		let _input = typeof input === 'string' ? input.split(' ') : input;
		return _input.map(c => parseInt(c, 2))
			.map(c => String.fromCharCode(c))
			.join('');
	}
};

exports.run = async (client, message, args, level) => {
  if (args.length < 2) {
		message.delete();
		return (await message.channel.send(`Hey ${message.author}, do \`${client.settings.get("default").prefix}help binary\` to see how to use this.`)).delete(5000);
	}

	let input = args.slice(1).join(' ');

	if (args[0].match(/^enc(ode(Text)?)?$/i)) {
		message.channel.send(this.methods.encode(input).join(' '));
	} else if (args[0].match(/^dec(ode(Text)?)?$/i)) {
		message.channel.send(this.methods.decode(input));
	} else if (args[0].match(/^decToBin$/i)) {
		if (isNaN(input)) {
			message.delete();
			return (await message.reply('your input must be a number.')).delete(5000);
		}

		message.channel.send(parseInt(input).toString(2));
	} else if (args[0].match(/^binToDec$/i)) {
		if (isNaN(input)) {
			message.delete();
			return (await message.reply('your input must be a number.')).delete(5000);
		}

		message.channel.send(parseInt(input, 2));
	} else {
		message.delete();
		return (await message.reply(`the sub command you entered, \`${args[0]}\`, is something I'm unfamiliar with.`)).delete(5000);
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "binary",
  category: "Fun",
  description: "Convert text to binary, or vice versa.",
  usage: "binary <encodeText|decodeText|decToBin|binToDec> <input>"
};