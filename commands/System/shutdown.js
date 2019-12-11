exports.run = async (client, message, args, level) => {
  message.delete();

  let response = await client.awaitReply(message, "**Are you sure you want to shut me down?** Respond with \`yes\` to proceed.");
  message.author.lastMessage.delete();
  let msg = client.user.lastMessage;
	
  if(response === "yes") {
    await msg.edit(`**Confirmed by ${message.author}.** Shutting down...`);
    await Promise.all(client.commands.map(cmd =>
      client.unloadCommand(cmd)
    ));
    await msg.edit(`Successfully shut down by ${message.author}.`);
    process.exit(0);
  } else if(response === "no") {
    await msg.edit(`**Shutdown cancelled by ${message.author}.** This message will be removed in 5 seconds.`).then(msg => {
      msg.delete(5000)
    });
    return;
  } else {
    await msg.edit(`**${message.author} has provided an invalid response**; shutdown aborted. This message will be deleted in 5 seconds.`).then(msg => {
      msg.delete(5000)
    });
    return;
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