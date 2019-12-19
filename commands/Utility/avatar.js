exports.run = async (client, message, args, level) => {
	let user;

	if (!args[0] || !message.mentions.users.first()) {
		user = message.author;
		author = message.author
		message.delete();
	} else {
		user = message.mentions.users.first();
		author = message.author;
		message.delete();
	}
	if (!user.avatarURL) {
		await message.delete();
		await message.reply("that user does not have an avatar.");
		await client.user.lastMessage.delete(5000);
		return;
	}
	
	(await message.channel.send(
		client.embed(user === message.author ? `Your Avatar` : `${user.username}'s Avatar`, `**Sent by ${author}** | [Download](${user.avatarURL}) | :timer: Deleting in 30 seconds`, [], { image: user.avatarURL })
		)).delete(30000)
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "avatar",
	category: "Utility",
	description: "Gives you the avatar of a user.",
	usage: "avatar <user>"
};
