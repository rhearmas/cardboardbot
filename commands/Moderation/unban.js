exports.run = async (client, message, args, level) => {
  const reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  const user = args[0];
  const modlog = client.channels.find('name', config.modLogChannel);
  if (!modlog) return message.reply('I could not find a valid modlog channel.');
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
  message.guild.unban(user);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "unban",
  category: "Moderation",
  description: "Unbans a specified user.",
  usage: "unban <user> <reason>"
};