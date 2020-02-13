const ytdl = require("ytdl-core");

exports.run = async (client, message, args, level) => {
  if(!args[1] || args[1].startsWith("https://")) return (await message.reply("you need to provide a valid URL!")).delete(5000).catch(() => { });
	if(!message.member.voiceChannel) (await return message.reply("you need to be in a voice channel to use this command.")).delete(5000).catch(() => { });

	if(!servers[message.guild.id]) servers[message.guild.id] = {
		queue: []
	}

	var server = servers[message.guild.id];
  server.queue.push(args[1]);

  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
    client.play(connection, message);
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yt"],
  permLevel: "Moderator"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play a song/playlist, or queue it if something's already playing.",
  usage: "play [url]"
};
