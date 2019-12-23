const responses = [
	'is on a killing spree!',
	'just shot someone!',
	'murdered an innocent! Grab the sherrif!',
	'got a bullseye.',
	'wrangled a person!',
	'made someone get got!',
	'brought a gun to a knife fight.',
	'earned someone a closed-casket funeral.',
	'shot a weeb!',
	'pumped up some kicks!'
];

const critResponses = [
	'GOT A HEADSHOT!!',
	'HIT A 360 NOSCOPE!!!!',
	'EXPLODED A CORPSE WITH A BULLET!!',
	'HAS LUCK ON THEIR SIDE!!',
	'SENT SOMEONE FLYING HOME!!!!'
];

function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

exports.run = async (client, message, args, level) => {
  if (message.mentions.users.size < 1) {
		message.delete();
		return (await message.reply("gotta mention those people you wanna shoot, ya know.")).delete(5000);
	}

	let response = randomItem(responses);

	let crit = Math.floor(Math.random() * 10);
	// console.log(`crit is ${crit}`)
	if(crit === 1) {
		response = randomItem(critResponses);
	}

	let output = message.mentions.users.map(m => `**${m}** ${crit === 1 ? ':skull:' : ''}:boom::gun: **${message.author}**`).join('\n');

	message.delete();
	message.channel.send({
		embed: client.embed(`${crit === 1 ? message.author.username.toUpperCase() : message.author.username} ${response}`, output)
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "shoot",
  category: "Fun",
  description: "Shoots yer friendz!",
  usage: "shoot <mention>"
};