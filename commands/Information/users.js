function hasRole(member, roleName) {
	return member.roles.map(role => role.name.toLowerCase()).indexOf(roleName.toLowerCase()) > -1;
}

exports.run = async (client, message, args, level) => {
  if (!message.guild || !message.guild.members) {
		message.delete();
		return (await message.reply("You must run this command from within a server.")).delete(5000);
	}

	let members = message.guild.members.array().sort((a, b) => a.user.username.localeCompare(b.user.username));

	if (args.length > 0) {
		members = members.filter(member => hasRole(member, args[0]));
	}

	if (members.length < 1) {
		message.delete();
		return (await message.reply("No members could be found.")).delete(5000);
	}

	message.delete();

	let users = members.map(m => `${m.user}${(m.user.bot ? ' [BOT]' : '')}`);
	const body = users.join('\n');

	if (body.length < 2000) {
		(await message.channel.send({
			embed: client.embed('', body)
		})).delete(60000);
	} else {
		let raw = members.map(m => `${m.user.username}${m.user.bot ? ' [BOT]' : ''}`).join('\n');

		const { url } = await client.textUpload(raw);

		let trimmed = body.substr(0, 1500);
		trimmed = trimmed.slice(0, trimmed.lastIndexOf('\n'));

		message.channel.send({
			embed: client.embed('', trimmed, [{ name: 'Full list', value: url }])
		});
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "users",
  category: "Information",
  description: "Lists all users in the current server. This command may be long, only use it in places you know you can use it.",
  usage: "users"
};