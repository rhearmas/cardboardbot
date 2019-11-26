exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const response = await client.awaitReply(message, "**Are you sure you want to shut me down?** Respond with \`yes\` to proceed.")
  const msg = question;
	console.log(`Response is ${response}`);
  if(response = "yes") {
    await msg.edit(`Confirmed by ${message.author} Shutting down...`);
    await Promise.all(client.commands.map(cmd =>
      client.unloadCommand(cmd)
    ));
    await msg.edit("Successfully shut down.");
    process.exit(0);
  }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Bot Owner"
};

exports.help = {
	name: "shutdown",
	category: "System",
	description: "Shuts down the bot.",
	usage: "shutdown"
};