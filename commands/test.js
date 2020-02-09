const got = require("got");

exports.run = async (client, message, args, level) => {
  const pgAmount = args[0] || 2;
  const out = await got(`https://loripsum.net/api/${pgAmount}/decorate/code`);
  
  let final = out.body;
  final = final.then(
  	.replace("<b>", "**")).then(
  	.replace("</b>", "**")).then(
  	.replace("<p>", "")).then(
  	.replace(" </p>", "")).then(
  	.replace("<i>", "_")).then(
  	.replace("</i>", "_")).then(
  	.replace("<mark>", "||").then(
  	.replace("</mark>", "||").then(
  	.replace("<pre>","```").then(
  	.replace("</pre>","```");
  
  message.channel.send(final);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "test",
  category: "",
  description: "Sends randomly-generated Lorem Ipsum demo text.",
  usage: "test [paragraphCount:2]"
};