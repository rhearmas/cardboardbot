exports.run = async (client, message, args, level) => {
  var server = client.servers[message.guild.id];
  if(message.guild.voiceConnection) {
    for(var i = server.queue.length -1; i >= 0; i--) {
      server.queue.splice(i, 1);
    }

    if(server.dispatcher) server.dispatcher.end();
    message.channel.send(`${message.author} has stopped the music.`);
  }

  if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

  /*
  const serverQueue = client.queue.get(message.guild.id);
  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');

  serverQueue.songs = [];
  if(serverQueue.connection.dispatcher) serverQueue.connection.dispatcher.end();
  message.channel.send(`${message.author} has stopped the music.`);

  if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
  */


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
