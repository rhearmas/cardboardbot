const Discord = require("discord.js");

exports.run = (client, message, args) => {
  message.delete();

  guild = message.guild;
  let chnl = message.channel;
  if(args[0]) {
    chnl = args[0].substring("<#".length);
    chnl = chnl.substring(chnl.length-1,0);
    chnl = guild.channels.find(c => c.id === chnl);
  }

  async function clearChannel() {
    let fetched;
    fetched = await chnl.fetchMessages();
    chnl.bulkDelete(fetched);
  }
  clearChannel();
  
  const intro = new Discord.RichEmbed()
    .setTitle("Introduction")
    .setColor(0x00AE86)
    .setDescription(`Welcome to our staff team. We're great to have you. Part of your duties include keeping the server standing on two feet. But that doesn't mean your day is over yet. When taking part of our team, these guidelines must be met or exceeded, otherwise your position will be terminated. Please remember that this position is **voluntary**, and will most likely receive no compensation for your work.`);
  const rules = new Discord.RichEmbed()
    .setTitle("Staff Rules")
    .setColor(0x8E8E38)
    .addField("1.) Follow all this server's rules in #info.","Just because you're higher in the member list hierchy, doesn't mean you suddenly have a one-way ticket to total entitlement to break the rules. Set the good example for the nonadmins.")
    .addField("2.) Don't be a hypocrite.","Hypocrisy is so, *so* incredibly common, and without properly addressing this, absolute chaos may ensue. With that said, remember that you need to always give yourself a taste of your own medicine before giving it to others.")
    .addField("3.) Giveaways must require permission from a Head Admin or above.","Yeah, giving stuff away is fun, but don't abuse it.")
    .addField("4.) Don't ping people unless it's justified.","Tying to this main server's rules, don't ping someone unless you're actively in conversation with them. Only ping higher-ups if someone's doing something wrong or you need help on what to do in a situation.")
    .addField("5.) Don't abuse your power.","You aren't Stalin or Hitler or anything. Don't pull a fast one and go on murder sprees in-game or mass ban waves.")
    .addField("6.) Don't do stuff to certain people because you \"don't like them\".","We all have our distaste for someone, but a community consensus for which bans are justified and which ones aren't. Warning people for stupid reasons isn't the right thing to do.")
    .addField("7.) Changing parts of the server without prior permission is not allowed.","This isn't your server, it's the community's. Be righteous with what you do. You will need evidence to prove that you were permitted to do such actions.")
    .addField("8.) Breaking Discord Terms of Service results in immediate action.","The Terms of Service are an important part to Discord. If you are exhibited to have assumed any behavior, you will be suspended from your priviledges.")
    .addField("9.) Your rank doesn't let you ruin lower users' lives.","Do not use your rank as a way to get other people's attention or make them uncomfortable, **especially when trying to groom them like a predator**.");
  const botinfo = new Discord.RichEmbed()
    .setTitle("Management Information")
    .setColor(0x388E8E)
    .setDescription("We use @GalacticTest#2913 and @Carl-bot#1536 for management. Here's what you use them for.")
    .addField("GalacticBot","**PREFIX: - (DASH)** | Moderation. Useful commands:\n`-warn user reason` | Example: `;warn rhearmas#9001 spamming`\n`-mute user [time]; [reason]` | Example: `-mute rhearmas#9001 5m spamming`\n`-kick user reason` | Example: `;kick rhearmas#9001 flooding channels`\n`-ban user reason` | Example: `-ban rhearmas#9001 abusing staff rank` | BANS WITH THIS ARE PERMANENT\n`-tempban user time; reason` | Example: `-tempban rhearmas#9001 1d; mass pinging` | **USE THIS BEFORE ANYTHING ELSE**")
    .addField("Carl-Bot","**PREFIX: c/** | Fun, utilities, reminders. Useful commands:\n`c/remindme time reason`\n`c/reminder user`\n**Use `c/help commandname` to see more syntax information.**");
  const importantInfo = new Discord.RichEmbed()
    .setTitle("Super Important Information")
    .setColor(0xC5C1AA)
    .setDescription("As with the nonadmins, we hold the right to punish you as we see fit. Don't test your boundaries, and for the love of god, **do not use `@everyone` without any context**. People who don't tolerate pings may either leave the discord or will mute it, effectively missing out on events.")
    .addField("Don't be afraid to ask questions!","Other staff members are always ready to help if you hit a snag and need someone higher up in the user hierarchy to handle something, or if that one button doesn't work or that lever doesn't go down all the way.");
  
  chnl.send("\`<BEGIN_TAPE>\`");
  chnl.send({embed: intro});
  chnl.send({embed: rules});
  chnl.send({embed: botinfo});
  chnl.send({embed: importantInfo});
  setTimeout(function(){chnl.send("\`<END_TAPE>\`")},1000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "staffinfo",
  category: "Channel Building",
  description: "Builds the staff rules channel in the mentioned channel. Builds in current if no arguments are provided.",
  usage: "staffinfo channel"
};