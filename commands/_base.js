/*
This file is ignored by the bot's command loader because of the underscore at the start of the file name. No need to worry about loading errors.
Use the list of export functions in your custom commands to get a headstart on making your commands. All theee exports are required, or the command won't load.
*/

exports.run = async (client, message, args, level) => {
  
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

// Basic message auto-deletion
if (!args[0]) {
  message.delete();
  return (await message.reply("text")).delete(5000).catch(() => { });
}