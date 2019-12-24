const validStatuses = [
	{
		internal: 'online',
		display: 'online',
		emoji: ':zap:'
	},
	{
		internal: 'idle',
		display: 'idle',
		emoji: ':beach_umbrella:'
	},
	{
		internal: 'dnd',
		display: 'do-not-disturb',
		emoji: ':mute:'
	},
	{
		internal: 'invisible',
		display: 'invisible',
		emoji: ':ghost:'
	}
];

const validStatusRegex = new RegExp(`^(${validStatuses.map(status => status.internal).join('|')})$`);
const validStatusString = validStatuses.map(status => `\`${status.internal}\``).join(', ');

exports.run = async (client, message, args, level) => {
  if (args.length < 1 || !validStatusRegex.test(args[0])) {
		(await message.reply(`please provide a status to set from this list: ${validStatusString}`)).delete(5000);
	}

	message.delete();
	
	const status = validStatuses.find(status => status.internal === args[0].toLowerCase());
	client.user.setStatus(status.internal);

	(await message.channel.send(`${status.emoji} Set status to ${status.display}.`)).delete(5000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "status",
  category: "System",
  description: "Sets the bot's status. Pretty straightforward.",
  usage: `status <${validStatuses.map(status => status.internal).join('|')}>`
};