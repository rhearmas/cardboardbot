exports.run = async (client, message, args, level) => {
	const data = await this.fetchURL("https://uselessfacts.jsph.pl/random.json");

	return message.channel.send({ embed: client.embed(`Fun fact!`, data.text, [
		{
			name: "Source",
			value: data.source,
			inline: true
		},
		{
			name: "Source URL",
			value: data.source_url,
			inline: true
		}
 	],
		{
			author: message.author.tag,
			authorIcon: message.author.avatarURL,
			thumbnail: "https://i.imgur.com/IxosIBh.png"
		})
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "randomfact",
  category: "Jokes",
  description: "Knowledge is power!",
  usage: "randomfact"
};
