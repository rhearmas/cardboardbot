exports.run = async (client, message, args, level) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find('name', 'mod-log');
  const caseNum = await client.caseNumber(client, modlog);
  const muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;

  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: "Moderator"
};

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "Mute or unmute a specified user.",
  usage: "mute <user> <reason>"
};