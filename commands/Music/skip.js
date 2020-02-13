exports.run = async (client, message, args, level) => {
  var server = servers[message.guild.id];

  if(server.dispatcher) server.dispatcher.end();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "",
  category: "",
  description: "",
  usage: ""
};
