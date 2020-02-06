exports.run = async (client, message, args, level) => {
  const user = message.mentions.users.first();
  parseUser(message, user);

  const modlog = client.channels.find('name', config.modLogChannel);
  const caseNum = await caseNumber(client, modlog);

  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

  // message.guild.member(user).kick();

  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
    .setColor(0x2f3136)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Boot someone out!",
  usage: "kick <user> <reason>"
};
