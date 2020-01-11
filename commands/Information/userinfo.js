const dateFormat = require('dateformat');

dateFormat('dddd, mmmm dS, yyyy, h:MM:ss TT');

exports.run = async (client, message, args, level) => {
	let user = message.mentions.users.first() || message.author;
	let member = message.guild.member(user);
  
  	if (!member) {
		message.delete();
		return (await message.reply("that member could not be found!")).delete(5000);
	}
	
	const millisCreated = new Date().getTime() - user.createdAt.getTime();
	const daysCreated = millisCreated / 1000 / 60 / 60 / 24;
	
	const millisJoined = new Date().getTime() - member.joinedAt.getTime();
	const daysJoined = millisJoined / 1000 / 60 / 60 / 24;
  
  	let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    if (roles.length < 1) roles = ['None'];
  
  	let game = (user.presence.game && user.presence.game && user.presence.game.name) || 'Not playing a game.'
	
	await message.delete();
	message.channel.send({ embed: client.embed(
		`User info: ${member.user.tag}`,
		"**This message will be deleted in 60 seconds.** :bomb:",
		[
			{
				name: "= Status =",
				value: `${user.presence.status[0].toUpperCase() + user.presence.status.slice(1)}`
			},
			{
				name: "= Game =",
				value: `${(user.presence.game && user.presence.game && user.presence.game.name) || 'Not playing a game.'}`
			},
			{
				name: "= Nickname =",
				value: member.nickname || "None"
			},
			{
				name: "= Unique User ID (UUID) =",
				value: member.user.id !== null ? member.user.id : "Unknown"
			},
			{
				name: "= Account Creation Date =",
				value: dateFormat(user.createdAt) !== null ? dateFormat(user.createdAt) : "Unknown"
			},
			{
				name: "= Days Since Creation =",
				value: daysCreated.toFixed(0) !== null ? daysCreated.toFixed(0) : "Unknown"
			},
			{
				name: "= Server Join Date =",
				value: member.joinedAt !== null ? member.joinedAt : "Unknown"
			},
			{
				name: "= Days Since Joining =",
				value: daysJoined.toFixed(0) !== null ? daysJoined.toFixed(0) : "Unknown"
			},
			{
				name: "= Last Spoken =",
				value: member.lastMessage !== null ? `**${member.lastMessage.createdAt}**, at server **${member.lastMessage.guild}**` : "Unknown"
			},
			{
				name: "= User Roles =",
				value: `\`${roles.join('\`, \`')}\``
			}
		],
		{
			inline: true,
			footer: `Sent by ${message.author.tag}`,
			footerIcon: message.author.avatarURL
		})
	})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["user", "uinfo"],
  permLevel: "User"
};

exports.help = {
  name: "userinfo",
  category: "Information",
  description: "Gather information about a user, and returns the gathered stuff into an embed.",
  usage: "userinfo [ping:self]"
};
