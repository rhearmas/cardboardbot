exports.run = async (client, message, args, level) => {
  var server = servers[message.guild.id];
  if(message.guild.voiceConnection) {
    for(var i = server.queue.length -1; i >= 0; i--) {
      server.queue.splice(i, 1);
    }

    server.dispatcher.end();
    message.channel.send(`${message.author.mention} has stopped the music.`);
  }

  if(message.guild.connection) message.guild.voiceConnection.disconnect();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stops playing music, clears the queue, and disconnects from the voice channel.",
  usage: "stop"
};
