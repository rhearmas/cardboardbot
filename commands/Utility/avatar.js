/*
exports.run = async (bot, msg) => {
		const user = msg.mentions.users.first();
		if (!user) {
				throw 'Please mention the user who you want the avatar from.';
		}

		if (!user.avatarURL) {
				throw 'That user does not have an avatar.';
		}

		msg.delete();
		(await msg.channel.send({
				embed: bot.utils.embed(`${user.username}'s Avatar`, `[Download](${user.avatarURL})`, [], { image: user.avatarURL })
		})).delete(30000);
};

exports.info = {
		name: 'avatar',
		usage: 'avatar <user>',
		description: 'Gives you the avatar of a user'
};
*/

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
