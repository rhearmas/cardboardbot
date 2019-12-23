const got = require('got');

async function getInfo(id) {
	return (await got(`http://xkcd.com/${id}/info.0.json`, { json: true })).body;
}

async function getLatest() {
	return (await got('http://xkcd.com/info.0.json', { json: true })).body;
}

async function getRandom() {
	const latest = await getLatest();
	const max = latest.num;

	return Math.floor(Math.random() * max);
}

exports.run = async (client, message, args, level) => {
  let id;

	if (args[0] === 'latest') {
		id = (await getLatest()).num;
	} else {
		id = parseInt(args[0]);
		if (isNaN(id)) {
			id = await getRandom();
		}
	}

	while (id === 404) {
		id = await getRandom();
	}

	const info = await getInfo(id);

	message.delete();
	message.channel.send({
		embed: client.embed(`[${id}] ${info.title}`, '', [], {
			image: info.img,
			color: [150, 168, 199],
			url: `http://xkcd.com/${id}`
		}).setFooter(info.alt)
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "xkcd",
  category: "Fun",
  description: "Fetches random or specific XKCD comics.",
  usage: "xkcd [latest|<id>]"
};