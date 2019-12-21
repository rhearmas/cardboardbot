const got = require('got');

exports.run = async (client, message, args, level) => {
	if (!args[0]) return message.reply('you must specify a repository or search term!');

	const input = args.join(' ');

	if (input.indexOf('/') !== -1) {
		let repo = safeRepo(input);
		let msg = await message.channel.send(`:arrows_counterclockwise: Loading info for '${repo}'...`);

		const res = await got(`https://api.github.com/repos/${repo}`, { json: true });
		const json = res.body;
		if (json.message === 'Not Found') {
			msg.edit('That repository could not be found!');
		}

		message.delete();
		msg.edit({
			embed: client.embed('', getInfo(json))
		});
	} else {
		let msg = await message.channel.send(`:arrows_counterclockwise: Searching for '${input}'...`);

		const res = await got(`https://api.github.com/search/repositories?q=${args.join('+')}`, { json: true });
		const json = res.body;
		if (json.total_count < 1) msg.edit(`No results found for '${args.join(' ')}'`);

		message.delete();
		msg.edit(':white_check_mark: Top 3 results:');

		json.items.slice(0, 3).forEach(item => {
			message.channel.send({
				embed: client.embed('', getInfo(item))
			});
		});
	}
};

function safeRepo(input) {
	if (input.indexOf('/') === -1) {
		return;
	}

	let user = input.substr(0, input.indexOf('/'));
	input = input.substr(input.indexOf('/') + 1);
	let repo = input.indexOf('/') === -1 ? input : input.substr(0, input.indexOf('/'));
	return `${user}/${repo}`;
}

function getInfo(json) {
	return `**${json.full_name}**

\t**Description:** _${json.description || 'None provided'}_
\t**Owner:** [${json.owner.login}](${json.owner.html_url})
\t**Primary Language:** \`${json.language}\`

\t:house:  [Home page](${json.html_url})  :small_red_triangle_down:  [Downloads](${json.html_url}/releases)  :exclamation:  [Issues](${json.html_url}/issues)

\t:negative_squared_cross_mark:  \`${json.open_issues_count}\` open issues  :star:  \`${json.stargazers_count}\` stargazers  :eyes:  \`${json.subscribers_count || json.watchers_count}\` watchers


\tDo \`git clone ${json.clone_url}\` to clone this repository
`;
}

exports.info = {
	name: 'github',
	usage: 'github <user/repo>',
	description: 'Links to a GitHub repository'
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "github",
  category: "Utility",
  description: "Look up a GitHub repository, and links to it. If you want a specific repository, use [user/repo] as the additional argument. Otherwise, just use [repo].",
  usage: "github <user/repo>"
};