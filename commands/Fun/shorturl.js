const got = require('got');

exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
		await message.reply("please provide a url to shorten!");
		client.user.lastMessage.delete(5000);
		message.delete();
	}

	const url = args.join(' ');

	message.delete();

	const res = await got(`http://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
	message.channel.send({
		embed: client.embed('', '', [
			{
				name: 'Link',
				value: url
			},
			{
				name: 'Short URL',
				value: res.body
			}
		])
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['shorten','vgd'],
  permLevel: "User"
};

exports.help = {
  name: "shorturl",
  category: "Fun",
  description: "Shortens a URL with v.gd.",
  usage: "shortenurl <url>"
};