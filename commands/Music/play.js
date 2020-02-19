const Youtube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new Youtube(process.env.YOUTUBEAPI);

exports.run = async (client, message, args, level) => {
  

  /*
  const queue = client.queue;
  const serverQueue = client.queue.get(message.guild.id);

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
      client.logger.error(err);
      queue.delete(message.guild.id);
      return message.channel.send(`Uh oh! Looks like I hit a snag. Here's the error that Node picked up: \`${err}\``);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`**${song.title}** has been added to the queue!`);
  }
  */

  /*
  const query = args[0];

  var voiceChannel = message.author.voiceChannel;
  if (!voiceChannel) return message.reply("you need to be in a voice channel to use this command!");

  if(query.match(/^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*%/)) {
    try {
      const playlist = await youtube.getPlaylist(query);
      const videosObj = await playlist.getVideos();

      for (let i = 0; i < videosObj.length; i++) {
        const video = await videosObj[i].fetch();

        const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
        const title = video.raw.snippet.title;
        let duration = this.formatDuration(video.duration);
        const thumbnail = video.thumbnails.high.url;
        if (duration == "00:00") duration = "Live Stream";

        const song = {
          url,
          title,
          duration,
          thumbnail,
          voiceChannel
        };

        message.guild.musicData.push(song);
      }
      if(message.guild.musicData.isPlaying == false) {
        message.guild.musicData.isPlaying == true;
        return this.playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying == true) {
        return message.channel.send(`Playlist - :musical_note: ${playlist.title} :musical_note: has been added to the queue.`);
      }
    } catch (err) {
      client.logger.error(err);
      return message.reply("that playlist is either private or doesn't exist!");
    }
  }
  if(query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
    const url = query;
    try {
      query = query.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

      const id = query[2].split(/[^0-9a-z_\-]/i)[0];
      const video = await youtube.getVideoByID(id);
      const title = video.title;
      let duration = this.formatDuration(video.duration);
      const thumbnail = video.thumbnails.high.url；
      if(duration == "00:00") duration = "Live Stream";
      const song = {
        url,
        title,
        duration,
        thumbnail,
        voiceChannel
      };
      message.guild.musicData.queue.push(song);
      if(message.guild.musicData.isPlaying == false || typeof message.guild.musicData.isPlaying == "undefined") {
        message.guild.musicData.isPlaying = true;
        return this.playSong(message.guild.musicData.queue, message);
      } else if(message.guild.musicData.isPlaying == true) {
        return message.channel.send(`${song.title} has been added to the queue.`);
      }
    } catch (err) {
      client.logger.error(err);
      return message.channel.send("Uh oh! Looks like I hit a snag. Ask a bot administrator to check the console.");
    }
  }
  try {
    const videos = await youtube.searchVideos(query, 5);
    if(videos.length < 5) {
      return message.reply("it seems I had some trouble finding what you requested. Please try again or be more specific.");
    }
    const vidNameArr = [];
    for(let i = 0; i < videos.length; i++) {
      vidNameArr.push(`${i + 1}: ${videos[i].title}`);
    }
    vidNameArr.push("exit");

    const embed = new client.embed("Top 5 songs found", "Please select a song from the list below.", [
      {
        name: "**__Song 1__**",
        value: vidNameArr[0]
      }
      {
        name: "**__Song 2__**",
        value: vidNameArr[1]
      }
      {
        name: "**__Song 3__**",
        value: vidNameArr[2]
      }
      {
        name: "**__Song 4__**",
        value: vidNameArr[3]
      }
      {
        name: "**__Song 5__**",
        value: vidNameArr[4]
      }
    ],
    {
      author: message.author.tag,
      authorIcon: message.author.avatarURL
    });
    var songEmbed = await message.channel.send({ embed });

    try {
      var response = await message.channel.awaitMessages(
        msg => (msg.content > 0 && msg.content < 6) || msg.content === "exit",
        {
          max: 1,
          maxProcessed: 1,
          time: 20000,
          errors: ["time"]
        }
      );

      var videoIndex = parseInt(response.first().content)
    } catch (err) {
      client.logger.error(err);
      songEmbed.delete();
      return message.reply("Please try again, and enter a valid number from 1 to 5.\n*(Hint: you can exit this menu by responding with \`exit\`)*");
    }
    const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
    const title = video.title;
    let duration = this.formatDuration(video.duration);
    const thumbnail = video.thumbnails.high.url;
    if(duration == "00:00") duration = "Live Stream";
    const song = {
      url,
      title,
      duration,
      thumbnail,
      voiceChannel
    };

    message.guild.musicData.queue.push(song);

    if(message.guild.musicData.isPlaying == false) {
      message.guild.musicData.isPlaying = true;
      songEmbed.delete();
      this.playSong(message.guild.musicData.queue, message);
    } else if(message.guild.musicData.isPlaying == true) {
      songEmbed.delete();
      return message.channel.send(`${song.title} has been added to queue.`);
    }
  } catch (err) {
    console.error(err);
    if (songEmbed) {
      songEmbed.delete();
    }
    return message.channel.send("Something went wrong playing one of the songs, is its source private?");
  }
  */
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

/*
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
*/

/*
function playSong(queue, message) {
  let voiceChannel;
  queue[0].voiceChannel
    .join()
    .then(connection => {
      const dispatcher = connection
        .play(
          ytdl(queue[0].url, {
            quality: "highestaudio",
            highWaterMark: 1024 * 1024 * 10
          })
        )
        .on("start", () => {
          message.guild.musicData.songDispatcher = dispatcher;
          voiceChannel = queue[0].voiceChannel;

          const videoEmbed = client.embed("", "", [
            {
              name: "**__Now Playing__**",
              value: queue[0].title
            },
            {
              name: "**__Duration__**",
              value: queue[0].duration
            }
          ],
          {
            thumbnail: queue[0].thumbnail
          });
          if (queue[1]) videoEmbed.addField("Next Up:", queue[1].title);
          message.channel.send(videoEmbed);
          return queue.shift();
        })
        .on("finish", () => {
          if (queue.length >= 1) {
            return this.playSong(queue, message);
          } else {
            message.guild.musicData.isPlaying = false;
            return voiceChannel.leave();
          }
        })
        .on("error", e => {
          message.channel.send("I couldn't play that song!");
          console.error(e);
          return voiceChannel.leave();
        });
    })
    .catch(e => {
      console.error(e);
      return voiceChannel.leave();
    });
}

function formatDuration(durationObj) {
  const duration = `${durationObj.hours ? durationObj.hours + ":" : ""}${
    durationObj.minutes ? durationObj.minutes : "00"
  }:${
    durationObj.seconds < 10
      ? "0" + durationObj.seconds
      : durationObj.seconds
      ? durationObj.seconds
      : "00"
  }`;
  return duration;
}
*/
