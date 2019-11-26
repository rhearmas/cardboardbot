const Discord = require("discord.js");

exports.run = (client, message, args) => {
  message.delete();

  guild = message.guild;
  let chnl = guild.channels.find(c => c.name === 'landing');
  if(args[0]) {
    chnl = args[0].substring("<#".length);
    chnl = chnl.substring(chnl.length-1,0);
    chnl = guild.channels.find(c => c.id === chnl);
  }

  async function clearLanding() {
    let fetched;
    fetched = await chnl.fetchMessages();
    chnl.bulkDelete(fetched);
  }
  clearLanding();
  
  const intro = new Discord.RichEmbed()
    .setTitle("Introduction")
    .setColor(0x00AE86)
    .setDescription(`Welcome to the official **${guild.name} Discord server**! This is a Discord server that I personally run for all my shenanigans. This is the channel where I explain rules and stuff and other stuff.`)
    .addField("IMPORTANT DISCLAIMER:", "This list does not constitute the full list of rules. With that in mind, try to use common sense and good judgement for any action you're about to take at all times.")
    .addField("Before we go further...","I don't care if you use profanity here, since Discord only allows users who are at least 13 years of age. If you have a problem with this, then this isn't the discord server for you.")
    .setThumbnail(guild.iconURL);
  const textrules = new Discord.RichEmbed()
    .setTitle("Text Channel Rules")
    .setColor(0x8E8E38)
    .addField("1.) Use common sense.","This means that you shouldn't be a jerk to others and have read the loose disclaimer.")
    .addField("2.) No raiding.","Nobody here endorses raiding. Raiding this server or trying to rally other users to help you raid this server or another server is not allowed.")
    .addField("3.) Do not attempt to destroy the server.","This includes vandalizing non-spam channels with spam or playing excessively loud music.")
    .addField("4.) No discrimination.","This includes disrespecting people because of personal factors such as gender, sexual orientation, mental disabilities, race, age, location of residence, or anything else of the like.")
    .addField("5.) Threats towards others are not allowed.","Do not attempt to cause others to feel endangered in this server. We want to provide a safe space for everyone here, so don't ruin it.")
    .addField("6.) Abide by Discord's global platform rules.","This means that you should take the time to read the [Discord Terms of Service](https://discordapp.com/terms) and [Community Guidelines](https://discordapp.com/guidelines).")
    .addField("7.) Don't complain about your punishments.","They were given for a valid reason. ModMail exists just in case a staff member falsely punishes you.")
    .addField("8.) Loopholes aren't a thing, so don't go looking for them.","Don't be a wise-ass and just follow the rules. Don't test your boundaries, being here is a priviledge, not a right.")
    .addField("9.) Advertising outside of the advertisement channel is not permitted.","This includes third-party services (that are not related to this Discord) or anything you or others have created, regardless of permission granted. Advertising other Discord servers -- or advertising **anything** in your playing status or through unsolicited DMs -- is strictly forbidden.")
    .addField("10.) Don't cause beef with other members.","Don't send hate to other people if you see them as a bad person. Tolerate everyone here, even if you despise them, and don't engage in arguments.")
    .addField("11.) Do not humiliate other people.","Mentioning previous drama or other situations any person was involved in is included.")
    .addField("12.) No excuses for punishment.","The rule nullification system exists for a valid reason. Staff don't care until someone complains. Don't use this system as a way to attempt to circumvent a punishment.")
    .addField("13.) Don't abuse your power.","You have power, that's cool. It does not, however, give you a one-way pass to do whatever you want.")
    .addField("14.) Absolutely no NSFW content.","Shocking or graphic content, animal cruelty, and gore are not allowed whatsoever. Breaking this rule will result in a permanent ban on sight.");
  const voicerules = new Discord.RichEmbed()
    .setTitle("Voice Channel Rules")
    .setColor(0x388E8E)
    .addField("1.) Most text rules apply in the voice chat.","Don't go crazy because of the channels being different.")
    .addField("2.) No loud audio.","Playing loud and/or annoying audio through your microphone or music bots is not allowed.")
    .addField("3.) Be responsible.","Everyone in the server holds the right to report users in the voice channels to have them muted as needed.")
    .addField("4.) Use common sense.","You can't escape this rule. Please don't ignore it.")
    .addField("5.) Limit the usage of voice changers.","Don't fake what you sound like. We prevent discrimination, you're fine.");
  const punishmentsystem = new Discord.RichEmbed()
    .setTitle("Punishment System")
    .setColor(0xC67171)
    .setDescription("Break a rule and you will get warned or muted. Three warns from the moderation bot results in a kick, then a ban after going through the same process. Extreme offenders get worse punishments. If you have a higher-tier role such as Annoying, you may lose it until it's deemed necessary we give it back.")
    .addBlankField()
    .addField("IMPORTANT:","Staff hold a right to punish anyone how they see fit. Staff here are pretty lenient, just be a well rounded individual and respect others. The staff team can see any kind of deleted images because of the readily-available logging system they have at their disposal.");
  const nullify = new Discord.RichEmbed()
    .setTitle("Rule Nullification System")
    .setColor(0xC5C1AA)
    .setDescription("Self-explanatory information that this server has implemented. When a user breaks a rule, as long as everybody within the constituting area (voice/text channel, room, etcetera) is okay with that rule being broken, and/or is not reported, then essentially all rules broken are nullified until a complaining or reporting individual (or group of individuals) is present.")
    .addField("HOWEVER...","This does NOT mean that you can break the rules first and ask questions later. Use this additional information at your own discretion, but if you misuse it or abuse it, the punishment is your own fault.")
    .addBlankField()
    .addField("Exceptions:","Discrimination and raiding are still not allowed. Plus, you must still abide by the Discord ToS and Community Guidelines.");
  const annoying = new Discord.RichEmbed()
    .setTitle("Annoying Role")
    .setColor(0x9AFF9A)
    .addField("What is the Annoying role?","The Annoying role is a role given out to users who meet certain requirements, and are usually well-known members of the community that don't need a staff position to pose as a great role model. This role grants additional permissions that normally require other roles.")
    .addField("How do I get it?","Well, the requirements are as follows:\n• Level **50** (maximum yes) or above\n• No bans, warns or mutes for at least one month\n• Good community standing\n• Waited at least one month from last removal of the role")
    .addField("What do I do when I meet these requirements?","If you meet the requirements, send a screenshot of your rank by copying the image sent by <@339254240012664832> after using `:?rank` in <#646840514389344257> and sending it through <@575252669443211264>. Be sure to ensure that we know why you're sending it!")
  const links = new Discord.RichEmbed()
    .setTitle("Important Links")
    .setColor(0x8E388E)
    .addField("Discord Server Invite Link","Use [this invite](https://discord.gg/4zJ8xqV) to invite others.")
    .addField("Member Survey","After being here for a while, feel free to fill out [this form](https://goo.gl/forms/Gwa62lcu4zC7B8992).");

  chnl.send({embed: intro});
  chnl.send({embed: textrules});
  chnl.send({embed: voicerules});
  chnl.send({embed: punishmentsystem});
  chnl.send({embed: nullify});
  chnl.send({embed: annoying});
  chnl.send({embed: links});
  setTimeout(function(){chnl.send("*If you can't copy the invite link, here's the raw URL: https://discord.gg/4zJ8xqV*")},5000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "buildlanding",
  category: "Channel Building",
  description: "Builds the landing by purging the whole channel and sending embeds. Builds in first channel named **landing** if no arguments are provided.",
  usage: "buildlanding channel"
};