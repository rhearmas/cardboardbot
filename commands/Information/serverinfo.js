const dateFormat = require('dateformat');

const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

exports.run = async (client, message, args, level) => {
	message.delete();
	
	const millis = new Date().getTime() - message.guild.createdAt.getTime();
	const days = millis / 1000 / 60 / 60 / 24;

	const owner = message.guild.owner.user || {};

	const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];

	let embed = client.embed(
		`${message.guild.name}`,
		'***This message will dissappear in 60 seconds.***',
		[
			{
				name: 'Created On',
				value: `${dateFormat(message.guild.createdAt)}`,
			},
			{
				name: 'Days Since Creation',
				value: `${days.toFixed(0)}`,
			},
			{
				name: 'Region',
				value: `${message.guild.region}`,
			},
			{
				name: 'Member Count',
				value: `**${message.guild.members.filter(m => m.presence.status !== 'offline' && !m.bot).size}** online / **${message.guild.members.filter(m => !m.bot).size}** total`,
			},
			{
				name: 'Owner',
				value: `${owner.username || 'None'}`,
			},
			{
				name: 'Text Channels',
				value: `${message.guild.channels.filter(m => m.type === 'text').size}`,
			},
			{
				name: 'Voice Channels',
				value: `${message.guild.channels.filter(m => m.type === 'voice').size}`,
			},
			{
				name: 'Verification Level',
				value: `${verificationLevels[message.guild.verificationLevel]}`,
			},
			{
				name: 'Roles',
				value: `${message.guild.roles.size}`,
			},
		],
		{
			inline: true,
			footer: `Guild ID: ${message.guild.id}`
		}
	);

	if (message.guild.iconURL != null) {
		embed.setThumbnail(`${message.guild.iconURL}`);
	}

	(await message.channel.send({ embed })).delete(60000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["server","guildinfo","guild"],
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Information",
  description: "Returns the current guild's information.",
  usage: "serverinfo"
};