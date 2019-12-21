exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
  	message.delete();
		return (await message.reply("please provide an emoji to gather info on!")).delete(5000);
	}

	if (args[0].charCodeAt(0) >= 55296) {
		message.delete();
		return (await message.channel.send({
			embed: client.embed(args[0], 'Built-in **Discord** emoji.')
		})).delete(15000);
	}

	const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

	if (!match || !match[1]) {
		message.delete();
		return (await message.reply("please provide a valid emoji!")).delete(5000);
	}

	const emoji = client.emojis.get(match[1]);

	if (!emoji) {
		message.delete();
		return (await message.reply("that emoji could not be identified.")).delete(5000);
	}

	message.delete();
	(await message.channel.send({
		embed: client.embed('', '', [
			{
				name: 'Name',
				value: emoji.name
			},
			{
				name: 'From Guild',
				value: emoji.guild.name
			},
			{
				name: 'ID',
				value: emoji.id
			},
			{
				name: 'Download URL',
				value: emoji.url
			}
		], { thumbnail: emoji.url })
	})).delete(15000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "emoji",
  category: "Information",
  description: "Provides some information on a specified emoticon.",
  usage: "emoji <emoji>"
};