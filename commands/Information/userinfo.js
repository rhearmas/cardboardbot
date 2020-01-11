function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

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
		`User info: ${target.user.tag}`,
		"**This message will be deleted in 60 seconds. :bomb:",
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
				value: target.guildMember.nickname,
				inline: true
			},
			{
				name: "= Unique User ID (UUID) =",
				value: target.user.id,
				inline: true
			},
			{
				name: "= Shared Servers =",
				value: target.userProfile.mutualGuilds,
				inline: true
			},
			{
				name: "= Account Creation Date =",
				value: dateFormat(user.createdAt),
				inline: true
			},
			{
				name: "= Days Since Creation =",
				value: daysCreated.toFixed(0),
				inline: true
			}
			{
				name: "= Server Join Date =",
				value: target.guildMember.joinedAt,
				inline: true
			},
			{
				name: "= Days Since Joining =",
				value: daysJoined.toFixed(0),
				inline: true
			},
			{
				name: "= Last Spoken =",
				value: `**${target.guildMember.lastMessage.createdAt}**, at server **${target.guildMember.lastMessage.guild}**`,
				inline: true
			},
			{
				name: "= User Roles =",
				value: roles,
				inline: true
			}
		],
		{
			inline: true,
			footer: `Sent by ${message.author}`
			footerIcon: message.author.avatarURL
	});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["user","uinfo"],
  permLevel: "User"
};

exports.help = {
  name: "userinfo",
  category: "Information",
  description: "Gather information about a user, and returns the gathered stuff into an embed.",
  usage: "userinfo [ping:self]"
};
