const IMAGE_NAME = /\.(jpe?g|png|gif|webp)$/i;

exports.run = async (client, message, args, level) => {
  if (!args[0]) {
		message.reply("please provide an image URL to send.")
		message.delete();
		return;
	}
	
	message.delete();

	const url = args[0];
	let name;

	if (!IMAGE_NAME.test(url)) {
		name = 'image.png';
	}

	try {
		let msg = await message.channel.send({
			file: {
				name,
				attachment: url
			}
		});
	} catch (ignore) {
		return msg.edit('Failed to send image.');
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "image",
  category: "Utility",
  description: "Sends an image from a URL.",
  usage: "image <url>"
};