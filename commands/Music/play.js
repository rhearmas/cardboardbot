const ytdl = require("ytdl-core");

exports.run = async (client, message, args, level) => {
  /*
  if(!args[0]) return (await message.reply("you need to provide a valid URL!")).delete(5000).catch(() => { });
	if(!message.member.voiceChannel) return (await message.reply("you need to be in a voice channel to use this command.")).delete(5000).catch(() => { });

	if(!client.servers[message.guild.id]) client.servers[message.guild.id] = {
		queue: []
	}

	var server = client.servers[message.guild.id];
  server.queue.push(args[0]);
  message.channel.send(`Added ${args[0]} to the queue.`)

  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
    play(connection, message);
  })
  */
  const queue = message.client.queue;
  const serverQueue = message.client.queue.get(message.guild.id);

  const voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) return message.reply("you need to be in a voice channel to use this command!");

  const permissions = voiceChannel.permissionsFor(client.user);
  if(!permissions.has("CONNECT") || !permissions.has("SPEAK")) return message.reply("I don't have the valid permissions to connect and speak in the channel you're in!");

  const songInfo = await ytdl.getInfo(args[0]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  if(!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      this.play(message, queueConstruct.songs[0]);
    } catch(err) {
      client.Logger.error(err);
      queue.delete(message.guild.id);
      return message.channel.send(`Uh oh! Looks like I hit a snag. Here's the error that Node picked up: ${err}`);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
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

function play(message, song) {
  const queue = client.queue;
  const guild = message.guild;
  const serverQueue = queue.get(message.guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url, { fliter: "audioonly" }))
    .on("end", () => {
      console.log("Music ended!");
      serverQueue.songs.shift();
      this.play(message, serverQueue.songs[0]);
    })
    .on("error", error => {
      console.error(error);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
};
