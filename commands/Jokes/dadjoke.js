exports.run = async (client, message, args, level) => {
  const { joke } = await this.fetchURL("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
	
	return message.channel.send({ embed: client.embed(`Funny Dad Joke from ${client.user.username}`, joke.length < 1900 ? joke : `${joke.substring(0, 1900)}...`,
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
  name: "dadjoke",
  category: "Jokes",
  description: `Hey ${message.author}, I'm dad!`,
  usage: "dadjoke"
};
