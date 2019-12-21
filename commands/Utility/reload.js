exports.run = async (client, message, args, level) => {
	message.delete();

	if (!args || args.length < 1) return msg.edit("Why are you trying to reload a command without actually naming it?").then(msg => {
		msg.delete(5000);
	});
	
	const commandName = args[0].toLowerCase();
	const command = message.client.commands.get(commandName)
		|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return msg.edit(`There is no command with name or alias \`${commandName}\`, ${message.author}.`).then(msg => {
		msg.delete(5000);
	});
	let msg = await message.channel.send(`**Beginning reload process;** initiated by ${message.author.tag}. Finding and reloading command \`${args[0]}\`...`);

	delete require.cache[require.resolve(`../${command.help.category}/${commandName}.js`)];

	try {
		const newCommand = require(`../${command.help.category}/${commandName}.js`);
		message.client.commands.set(newCommand.help.name, newCommand);
	} catch (error) {
		console.log(error);
		msg.edit(`Hey ${message.author}, there was an error while reloading command \`${commandName}\`:\n\`${error.message}\``).then(msg => {
			msg.delete(10000);
		});   
	}

	msg.edit(`**Command \`${command.help.name}\` has been reloaded successfully.**`).then(msg => {
		msg.delete(5000);
	});
};


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Bot Admin"
};

exports.help = {
	name: "reload",
	category: "System",
	description: "Reloads a command that\'s been modified.",
	usage: "reload [command]"
};