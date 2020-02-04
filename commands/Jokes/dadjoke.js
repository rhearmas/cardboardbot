exports.run = async (client, message, args, level) => {
  const { joke } = await client.fetchURL("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
	
	return message.channel.send({ embed: client.embed(`Funny Dad Joke from ${client.user.username}`, joke,
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
  description: `Hey there kiddo, I'm dad!`,
  usage: "dadjoke"
};
