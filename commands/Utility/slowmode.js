exports.run = async (client, message, args, level) => {
  message.delete();
  let rateLimit = +args[0];

  if(typeof rateLimit !== "number") return (await message.reply("you need to provide a valid time limit!")).delete(5000);
  if(rateLimit < 0 || rateLimit > 21600) return (await message.reply(`I can't complete this request because the Discord API is only able to handle times from 0 seconds to 21600 seconds (6 hours), and you requested a time of ${rateLimit} seconds.`)).delete(5000);
  
  message.channel.setRateLimitPerUser(rateLimit, `command handle from ${message.author.tag}.`);
  if(rateLimit === 0) {
    (await message.channel.send(`${message.author} has removed ${message.channel}'s slowmode.`)).delete(5000);
  } else {
    (await message.channel.send(`${message.author} has set ${message.channel}'s slowmode to ${rateLimit} seconds.`)).delete(5000);
  }
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