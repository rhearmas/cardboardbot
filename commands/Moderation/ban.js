exports.run = async (client, message, args, level) => {
	const user = message.mentions.users.first() || client.users.get("username", args[0]).id;
	parseUser(message, user);

	const modlog = client.channels.find('name', config.modLogChannel);
	const caseNum = await caseNumber(client, modlog);

	if (!modlog) return message.reply('I cannot find a valid modlog channel.');
	if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
	// message.guild.ban(user, 2);

	const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
	const embed = new RichEmbed()
		.setColor(0x2f3136)
		.setTimestamp()
		.setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
		.setFooter(`Case ${caseNum}`);
	return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "You've been hit by Banny Billy!",
  usage: "ban <user> <reason>"
};
