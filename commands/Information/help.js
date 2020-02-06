const { RichEmbed } = require('discord.js');
const stripIndents = require('common-tags').stripIndents;

exports.run = async (client, message, args, level) => {
	message.delete();

	let commands;
	let title = "Categories";

	if(args[0]) {
		if(/^category|type$/i.test(args[0])) {
			if(!args[2]) {
				return (await message.reply("you must specify a valid category!")).delete(5000).catch(() => { });
			}

			commands = client.commands(args[1]);
			title = `== Commands under category ${args[1]} ==`;
		} else if(/^all|full|every$/i.test(args[0])) {
			commands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
		} else {
			let command = args[0];
			if (client.commands.has(command)) {
				command = client.commands.get(command);
				if (level < client.levelCache[command.conf.permLevel]) return;
				message.channel.send({embed: client.embed(`Command information: "${command.help.name}"`, command.help.description, [
					{
						name: 'Category',
						value: command.help.category !== "" ? command.help.category : "none",
						inline: true
					},
					{
						name: 'Usage',
						value: command.help.usage,
						inline: true
					},
					{
						name: 'Aliases',
						value: command.conf.aliases.join(", ") !== "" ? command.conf.aliases.join(", ") : "none",
						inline: true
					}
				],
				{
					author: message.author.tag,
					authorIcon: message.author.avatarURL
				})
			});
			}
		}
	}

	if(commands.length > 0) {
		let fields = commands
			.sort((a,b) => a.help.name.localeCompare(b.help.name))
			.map(c => getHelp(client, c, commands.length === 1));

		let maxLength = 1900;
		let messages = [];

		while(fields.length > 0) {
			let len = 0;
			let i = 0;
			while(len < maxLength) {
				if(i >= fields.length) break;

				let field = fields[i];
				len += field.name.length + field.value.length;
				if(len >= maxLength) break;
				i++;
			}

			messages.push({ fields: fields.splice(0,i) });
		}

		message.delete().catch(() => { });
		messages.map(m => m.fields).forEach(async fields => {
			(await message.channel.send({
				embed: client.embed(title,'_This message will self-destruct in 90 seconds._ :boom:',fields)
			})).delete(90000).catch(() => { });
		});
	} else {
		// let categories = client.categories().sort();
		let categories;
		(await message.channel.send({
			embed: client.embed(title,stripIndents
			// **Available categories:**
			// ${categories.map(c => `- __${c}__`).join('\n')}
			`**Usage:**
			Do \`${message.settings.prefix}help category <name>\` for a list of comamnds in a specific category.
			Do \`${message.settings.prefix}help all\` for a list of every command available for this bot and your permission level.
			Do \`${message.settings.prefix}help <command>\` for **extended** command help and options.`)
		})).delete(15000);
	}
};

const getHelp = (bot, command, single) => {
	let description = stripIndents`
		**Usage:** \`${message.settings.prefix}${command.help.usage || command.help.name}\`
		**Description:** ${command.help.description || '<no description>'}
		**Category:** __${command.help.category}__`;

	if (command.help.credits)
		description += `\n**Credits:** *${command.help.credits}*`;

	if (single && command.help.examples)
		description += `\n**Examples:**\n${command.help.examples.map(example => `\`${message.settings.prefix}${example}\``).join('\n')}`;

	if (single && command.help.options instanceof Array) {
		let options = command.help.options.map(option => {
			return stripIndents`
			**${option.name}**
			*Usage:* \`${option.usage || option.name}\`
			*Description:* ${option.description}
			`;
		});
		description += `\n**Options:**\n\n${options.join('\n\n')}`;
	}

	return {
		name: single ? '\u200b' : command.help.name,
		value: description
	};
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["h", "halp"],
	permLevel: "User"
};

exports.help = {
	name: "help",
	category: "Information",
	description: "Displays all the available commands for your permission level.",
	usage: "help [command]"
};
