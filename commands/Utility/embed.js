exports.run = async (client, message, args, level) => {
	if (!args[0]) {
		return message.reply("you must specify some stuff to put into the embed.");
	}

	let parsed = bot.utils.parseArgs(args, ['f', 'ft:', 'd', 't:', 'c:', 'r', 'i:', 'a:', 'th:']);

	let color = parsed.options.c;
	if (parsed.options.r && msg.guild && msg.guild.members) {
		let member = msg.guild.members.get(msg.author.id);
		if (member) {
			color = member.highestRole.hexColor;
		}
	}

	if (color) {
		if (!color.startsWith('#')) {
			color = `#${color}`;
		}

		if (!/^#[a-fA-F0-9]{6}$/.test(color)) {
			return message.reply(`color \`${color}\` is invalid. Please use valid hex format (\`#RRGGBB\`)`);
		}
	}

	message.delete();
	message.channel.send({
		embed: bot.utils.embed(parsed.options.t || '', parsed.leftover.join(' '), [], {
			footer: parsed.options.f || parsed.options.ft,
			timestamp: parsed.options.d,
			color,
			image: parsed.options.i,
			author: parsed.options.a,
			thumbnail: parsed.options.th
		})
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Admin"
};

exports.help = {
	name: "embed",
	category: "Utility",
	description: "Send a message via embeds.",
	usage: "embed [text]"
};
