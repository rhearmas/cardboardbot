const got = require('got');
const cheerio = require('cheerio');

exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
		message.delete();
		return (await message.reply("please provide the username of a player.")).delete(5000);
	}

	const username = args[0];

	const uuid = await getUUID(username);
	if (!uuid) {
		message.delete();
		return (await message.reply("that player could not be found.")).delete(5000);
	}

	message.delete();
	return message.channel.send({
		embed: client.embed('', '', [
			{
				name: 'Username',
				value: username
			},
			{
				name: 'UUID',
				value: `\`${uuid}\``
			},
			{
				name: 'Skin',
				value: `[Download](https://crafatar.com/skins/${uuid}.png)`
			}
		], { thumbnail: `https://crafatar.com/avatars/${uuid}.png?size=250&overlay=true` })
	});
};

async function getUUID(username) {
	const res = await got(`https://mcuuid.net/?q=${username}`);
	const $ = cheerio.load(res.body);
	const input = $('input')[1];

	if (!input) {
		return;
	}
	return input.attribs['value'];
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mcinfo","minecraftuser"],
  permLevel: "User"
};

exports.help = {
  name: "playerinfo",
  category: "Information",
  description: "Shows information about a Minecraft player.",
  usage: "playerinfo <username>"
};