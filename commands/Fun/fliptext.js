const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
const OFFSET = '!'.charCodeAt(0);

exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
		message.delete();
		message.reply("you didn't specify any text for me to flip!").delete(5000);
	}

	message.delete();

	message.channel.send(
		args.join(' ').split('')
			.map(c => c.charCodeAt(0) - OFFSET)
			.map(c => mapping[c] || ' ')
			.reverse().join('')
	);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["flip"],
  permLevel: "User"
};

exports.help = {
  name: "fliptext",
  category: "Fun",
  description: "Flips text upside down!",
  usage: "fliptext <text>"
};