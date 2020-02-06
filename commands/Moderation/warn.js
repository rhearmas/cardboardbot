exports.run = async (client, message, args, level) => {
  const user = message.mentions.users.first();
  client.parseUser(message, user);
  const modlog = client.channels.find('name', config.modLogChannel);
  const caseNum = await caseNumber(client, modlog);
  if (!modlog) return message.reply('I cannot find a modlog channel.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);

  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${message.settings.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
  	.setColor(0x2f3136)
  	.setTimestamp()
  	.setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  	.setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["w","citation"],
  permLevel: "Moderator"
};

exports.help = {
  name: "warn",
  category: "Moderation",
  description: "Issues a citation to a specified user.",
  usage: "warn <user> <reason>"
};
