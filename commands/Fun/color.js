exports.run = async (client, message, args, level) => {
	const response = await client.awaitReply(message, "Hey, what's your favorite color?");
	if(response !== "black") {
		message.reply(`Oh, I really love ${response} too!`);
	} else {
		message.reply(`you like ${response}? Disgusting.`);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "color",
	category: "Fun",
	description: "Who likes a color?",
	usage: "color"
};