exports.run = async (client, message, args, level) => {
  let msgid = args[1];
  let emoji = args[3];

  guild = message.guild;
  let chnl = message.channel;
  if(args[0]) {
    chnl = args[0].substring("<#".length);
    chnl = chnl.substring(chnl.length-1,0);
    chnl = guild.channels.find(c => c.id === chnl);
  } else {
    return message.reply("you need to use a valid channel.");
  }
  if(args[1] && ) {
    
  } else {
    return message.reply(`you need a valid message ID!`);
  }

  let amt = 3;
  if(args[2] && typeof args[2] == 'number') {
    amt = args[2];
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "getrandom",
  category: "Utility",
  description: "Gets a certain amount of users who reacted to a specific message with a specified emoji, and returns what it got in your current channel.",
  usage: "getrandom channel msgid amount emoji"
};
