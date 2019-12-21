const dateFormat = require('dateformat');

dateFormat('dddd, mmmm dS, yyyy, h:MM:ss TT');

exports.run = async (client, message, args, level) => {
	if (!message.guild) {
		message.delete();
		return (await message.reply("this can only be used in a guild!")).delete(5000);
	}
	
	if (message.mentions.users.size < 1) {
		message.delete();
		return (await message.reply("@mention someone to find their info.")).delete(5000);
	}

	let user = message.mentions.users.first();
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

	let embed = client.embed(
		`${user.username}#${message.mentions.users.first().discriminator}`,
		'***This message will dissappear in 60 seconds.***',
		[
			{
				name: 'Status',
				value: `${user.presence.status[0].toUpperCase() + user.presence.status.slice(1)}`,
			},
			{
				name: 'Game',
				value: `${(user.presence.game && user.presence.game && user.presence.game.name) || 'Not playing a game.'}`,
			},
			{
				name: 'Created On',
				value: `${dateFormat(user.createdAt)}`,
			},
			{
				name: 'Days Since Creation',
				value: `${daysCreated.toFixed(0)}`,
			},
			{
				name: 'Joined On',
				value: `${dateFormat(member.joinedAt)}`,
			},
			{
				name: 'Days Since Joining',
				value: `${daysJoined.toFixed(0)}`,
			},
			{
				name: 'Roles',
				value: `\`${roles.join('`, `')}\``,
				inline: false,
			},
		],
		{
			inline: true,
			footer: `User ID: ${user.id}`,
			thumbnail: user.displayAvatarURL
		}
	);

	message.delete();
	(await message.channel.send({ embed })).delete(60000);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "userinfo",
	category: "Information",
	description: "Provides some information about a mentioned user.",
	usage: "userinfo <@mention>"
};