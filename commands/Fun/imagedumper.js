const got = require('got');
const fs = require('fs');
const path = require('path');

exports.run = async (client, message, args, level) => {
  let count = parseInt(args[0]) || 100;
	let attachments = [];

	message.channel.fetchMessages({ limit: Math.min(count, 100), before: message.id }).then(messages => {
		messages.map(m => {
			m.attachments.map(attachment => {
				if (attachment.height) {
					attachments.push(attachment.url);
				}
			});
		});

		let dir = __dirname + '/../../imagedumper_output';
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);

		for (let i = 0; i < attachments.length; i++) download(attachments[i]);

		if (attachments.length === 0) {
			message.reply("I couldn\'t find any images here.");
			message.delete();
			return;
		}
		message.channel.send(`:white_check_mark: ${attachments.length} images scraped and saved to the "out" folder in this bot's folder.`).then(m => { m.delete(10000); });
		message.delete();
	}).catch(message.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "imagedumper",
  category: "Fun",
  description: "Grabs all images from the specified amount of messages (max 100).",
  usage: "imagedumper <amount>"
};

function download(url) {
	let file = fs.createWriteStream(`${__dirname}/../../imagedumper_output/attachment_${path.basename(url)}`);
	got.stream(url).pipe(file);
}