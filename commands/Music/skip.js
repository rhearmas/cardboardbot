exports.run = async (client, message, args, level) => {
  var server = client.servers[message.guild.id];

  if(server.dispatcher) server.dispatcher.end();
  message.channel.send(`${message.author.mention} has skipped the current song.`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "skip",
  category: "Music",
  description: "Skip an unwanted track.",
  usage: "skip"
};
