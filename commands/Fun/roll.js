const Roll = require('roll');
const roller = new Roll();

exports.run = async (client, message, args, level) => {
  if (!args[0]) {
		message.delete();
		return (await message.reply("you must specify in dice notation (XdY).")).delete(5000);
	}

	let reason = '';
	let footer = '';

	footer += `:game_die: **${args[0]}**`;
	if (args.length > 1) {
		reason = args.splice(1).join(' ');
		footer += ` | Reason: ${reason}`;
	}

	let results = roller.roll(args[0]);

	message.delete();

	let embed = client.embed(
		`Total: ${results.result}`,
		`${[].concat.apply([], results.rolled).join(', ').substr(0, 1800)}`,
		[
			{
				name: '\u200b',
				value: footer
			}
		],
		{
			footer: `Rolled by ${message.author.tag}`
		}
	);

	message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "roll",
  category: "Fun",
  description: "Rolls X dice with Y sides. Supports standard dice notation.",
  usage: "roll <XdY> [reason]"
};