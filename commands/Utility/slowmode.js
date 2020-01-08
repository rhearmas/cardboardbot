exports.run = async (client, message, args, level) => {
  let rateLimit = +args[0] || 0;
  
  message.channel.rateLimitPerUser = rateLimit;
  (await message.channel.send(`${message.author} has set ${message.channel}'s slowmode to ${rateLimit} seconds.`)).delete(5000);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sm","setslowmode"],
  permLevel: "Administrator"
};

exports.help = {
  name: "slowmode",
  category: "Utility",
  description: "Set the slowmode for a channel. If no arguments are provided, this command will disable it.",
  emoji: "sparkle",
  usage: "slowmode [time:0]"
};