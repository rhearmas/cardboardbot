exports.run = async (client, message, args, level) => {
  let channel = message.channel;

	if (args.length < 1 || !/^\d{18}$/.test(args[0])) {
		(await message.reply('you must provide a message ID.')).delete(5000);
		return message.delete();
	}

	if (args[1] && /^<#\d{18}>$|^\d{18}$/.test(args[1])) {
		channel = client.channels.get(args[1].replace(/[<#>]/g, ''));
	}

	if (!channel) {
		(await message.reply('the channel you requested could not be found.')).delete(5000);
		return message.delete();
	}

	const messages = await channel.fetchMessages({ around: args[0], limit: 1 });

	if (!messages || messages.size < 1) {
		(await message.reply('the message you requested could not be found.')).delete(5000);
		return message.delete();
	}

	let quotedMsg = messages.first();

	let options = {
		timestamp: quotedMsg.editedTimestamp || quotedMsg.createdTimestamp,
		footer: false
	};

	let attachment = quotedMsg.attachments.first();

	if (attachment && (attachment.width || attachment.height)) {
		options.image = attachment.url;
	}

	let field = '';

	if ((message.guild || {}).id !== (channel.guild || {}).id) {
		field = `**in ${(channel.guild || { name: 'DMs' }).name} <#${channel.id}>:**`;
	} else if (channel.id !== message.channel.id) {
		field = `**in <#${channel.id}>:**`;
	}

	message.delete();
	message.channel.send({
		embed: client.embed('', field + '\n\n' + quotedMsg.toString(), [], options)
			.setAuthor(quotedMsg.author.username, quotedMsg.author.avatarURL)
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "quote",
  category: "Utility",
  description: "Quotes the message with the ID of the message (and channel the message is in).",
  usage: "quote <id> [#channel | channel ID]"
};
