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
  return (await message.reply("text")).delete(5000);
}