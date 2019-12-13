/*
exports.run = async (bot, msg) => {
    const user = msg.mentions.users.first();
    if (!user) {
        throw 'Please mention the user who you want the avatar from.';
    }

    if (!user.avatarURL) {
        throw 'That user does not have an avatar.';
    }

    msg.delete();
    (await msg.channel.send({
        embed: bot.utils.embed(`${user.username}'s Avatar`, `[Download](${user.avatarURL})`, [], { image: user.avatarURL })
    })).delete(30000);
};

exports.info = {
    name: 'avatar',
    usage: 'avatar <user>',
    description: 'Gives you the avatar of a user'
};
*/

exports.run = async (client, message, args, level) => {
  message.delete();
  const user = message.mentions.users.first();
  
  if (!user) {
    await message.reply("please mention the user you want the avatar from.").delete(5000);
    return;
  }
  if (!user.avatarURL) {
    await message.reply("that user does not have an avatar.").delete(5000);
    return;
  }
  
  await message.channel.send({embed: new Discord.RichEmbed()
    .setTitle(`${user.username}'s Avatar`)
    .setImage({image: user.avatarURL})
    .setFooter(`[Download](${user.avatarURL})`,"https://telegram-stickers.github.io/public/stickers/windows-10/33.png")
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "avatar",
  category: "Utility",
  description: "Gives you the avatar of a user.",
  usage: "avatar <user>"
};
