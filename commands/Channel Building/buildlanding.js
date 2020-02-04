const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	message.delete();

	const output = await message.channel.send("Generating the landing. Reading arguments...");

	guild = message.guild;
	let chnl = guild.channels.find(c => c.name === 'landing');
	if(args[0]) {
		chnl = args[0].substring("<#".length);
		chnl = chnl.substring(chnl.length-1,0);
		chnl = guild.channels.find(c => c.id === chnl);
		output.edit(`Landing channel set to <#${chnl}>.`);
	} else {
		output.edit(`Arguments provided are invalid or channel was not found; set landing channel to ${chnl}.`);
	}

	async function clearLanding() {
		let fetched;
		fetched = await chnl.fetchMessages();
		await output.edit(`Clearing messages in ${chnl}.`);
		chnl.bulkDelete(fetched);
		await output.edit(`Messages cleared in ${chnl}.`);
	}
	clearLanding();
	
	const intro = new Discord.RichEmbed()
		.setTitle("Introduction")
		.setColor(0x2f3136)
		.setDescription(`Welcome to **${guild.name}**! This is a Discord server that I personally run for all my shenanigans. This is the channel where I explain rules and stuff and other stuff.`)
		.addField("IMPORTANT DISCLAIMER:", "This list does not constitute the full list of rules. With that in mind, try to use common sense and good judgement for any action you're about to take at all times.")
		.addField("Before we go further...","I don't care if you use profanity here, since Discord only allows users who are at least 13 years of age. If you have a problem with this, then this isn't the discord server for you.")
		.setThumbnail(guild.iconURL);
	const textrules = new Discord.RichEmbed()
		.setTitle("Text Channel Rules")
		.setColor(0x2f3136)
		.addField("Use common sense.","This means that you shouldn't be a jerk to others.")
		.addField("No raiding.","Nobody here endorses raiding. Raiding this server or trying to rally other users to help you raid this server or another server is not allowed.")
		.addField("Do not attempt to destroy the server.","This includes vandalizing non-spam channels with spam or playing excessively loud music.")
		.addField("No discrimination.","This includes disrespecting people because of personal factors such as gender, sexual orientation, mental disabilities, race, age, location of residence, or anything else of the like.")
		.addField("Threats towards others are not allowed.","Do not attempt to cause others to feel endangered in this server. We want to provide a safe space for everyone here, so don't ruin it.")
		.addField("Abide by Discord's global platform rules.","This means that you should take the time to read the [Discord Terms of Service](https://discordapp.com/terms) and [Community Guidelines](https://discordapp.com/guidelines).")
		.addField("Don't complain about your punishments.","They were given for a valid reason. ModMail exists just in case a staff member falsely punishes you.")
		.addField("Loopholes aren't a thing, so don't go looking for them.","Don't be a wise-ass and just follow the rules. Don't test your boundaries, being here is a priviledge, not a right.")
		.addField("Advertising outside of the advertisement channel is not permitted.","This includes third-party services (that are not related to this Discord) or anything you or others have created, regardless of permission granted. Advertising other Discord servers -- or advertising **anything** in your playing status or through unsolicited DMs -- is strictly forbidden.")
		.addField("Don't cause beef with other members.","Don't send hate to other people if you see them as a bad person. Tolerate everyone here, even if you despise them, and don't engage in arguments.")
		.addField("Do not humiliate other people.","Mentioning previous drama or other situations any person was involved in is included.")
		.addField("No excuses for punishment.","The rule nullification system exists for a valid reason. Staff don't care until someone complains. Don't use this system as a way to attempt to circumvent a punishment.")
		.addField("Absolutely no NSFW content.","Shocking or graphic content, animal cruelty, and gore are not allowed whatsoever outside of the designated NSFW channels. Breaking this rule will result in a permanent ban on sight.");
	const voicerules = new Discord.RichEmbed()
		.setTitle("Voice Channel Rules")
		.setColor(0x2f3136)
		.addField("Most text rules apply in the voice chat.","Don't go crazy because of the channels being different.")
		.addField("No loud audio.","Playing loud and/or annoying audio through your microphone or music bots is not allowed.")
		.addField("Be responsible.","Everyone in the server holds the right to report users in the voice channels to have them muted as needed.")
		.addField("Use common sense.","You can't escape this rule. Please don't ignore it.")
		.addField("Limit the usage of voice changers.","Don't fake what you sound like. We prevent discrimination, you're fine.");
	const punishmentsystem = new Discord.RichEmbed()
		.setTitle("Punishment System")
		.setColor(0x2f3136)
		.setDescription("Break a rule and you will get warned or muted. Three warns from the moderation bot results in a kick, then a ban after going through the same process. Extreme offenders get worse punishments. If you have a higher-tier role such as Annoying, you may lose it until it's deemed necessary we give it back.")
		.addBlankField()
		.addField("IMPORTANT:","Staff hold a right to punish anyone how they see fit. Staff here are pretty lenient, just be a well rounded individual and respect others. The staff team can see any kind of deleted images because of the readily-available logging system they have at their disposal.");
	const nullify = new Discord.RichEmbed()
		.setTitle("Rule Nullification System")
		.setColor(0x2f3136)
		.setDescription("This is a system about how to actually be punished for breaking rules, and how to avoid it if what you want to do is somehow \"important\". This is **especially important** for staff members.")
		.addField("The System","When a user breaks a rule, as long as everybody within the constituting area is okay with that rule being broken, then **most** rules *(Embed keyword, most)* broken are nullified until a complaining or reporting individual, or group of individuals, is present.")
		.addField("HOWEVER...","This does NOT mean that you can break the rules first and ask questions later. Use this additional information at your own discretion, but if you misuse it or abuse it, the punishment is your own fault.\n_ _\nThere are also a few exceptions to this system. Those exceptions are as follows:\n• Abide by [Discord's ToS](https://discordapp.com/terms) and [Community Guidelines](https://discordapp.com/terms)\n• No discrimination\n• No NSFW outside of designated channels\n_ _\n**__Staff members still hold the right to punish you, even if nobody complains about something!__**\nBe wary of what you do, as all actions have consequences.")
	const confirmation = new Discord.RichEmbed()
		.setTitle("User confirmation and autoconfirmation")
		.setColor(0x2f3136)
		.addField("Overview","User confirmation allows for full functionality in the majority of channels.")
		.addField("What's so special about being a confirmed user?","Being a confirmed user shows that you're special. You get special permissions in text channels. These permissions include:\n• Image posting in regular channels\n• Adding reactions to messages\n• Ability to use external emotes\n• Unlocked access to posting in self-advertisement channels")
		.addField("How to be confirmed?","There are two methods to being a confirmed user:\n• Manual confirmation by receiving the **confirmed** role\n• Achieving level **25**")
		.addField("Method 1: Manual confirmation","Manually confirmed users are able to 100% bypass the autoconfirmation process, and immediately receive the abilities a confirmed user has. The **board of commissioners** have the ability to grant any user the `confirmed` role.")
		.addField("Method 2: Autoconfirmation","Being autoconfirmed means that you're active enough to receive special permissions. This role is called `mayhaps`.\nYou will be granted this role __automatically__ once you reach level **25**.")
	const links = new Discord.RichEmbed()
		.setTitle("Important Links")
		.setColor(0x2f3136)
		.addField("Discord Server Invite Link","Use [this invite](https://discord.gg/4zJ8xqV) to invite others.")
		.addField("Member Survey","After being here for a while, feel free to fill out [this form](https://goo.gl/forms/Gwa62lcu4zC7B8992).")
		.addField("Carrd","Rhearmas has an official website that shows a lot of the stuff about her. [Click here](https://rhearmas.carrd.co) to take a look!");

	async function sendLandingEmbeds() {
		await output.edit("Sending intro... *(Embed 1/7)*");
		await chnl.send({embed: intro});
		await output.edit("Sending text rules... *(Embed 2/7)*");
		await chnl.send({embed: textrules});
		await output.edit("Sending voice rules... *(Embed 3/7)*");
		await chnl.send({embed: voicerules});
		await output.edit("Sending punishment system... *(Embed 4/7)*");
		await chnl.send({embed: punishmentsystem});
		await output.edit("Sending punishment nullification system... *(Embed 5/7)*");
		await chnl.send({embed: nullify});
		await output.edit("Sending confirmation system... *(Embed 6/7)*");
		await chnl.send({embed: confirmation});
		await output.edit("Sending punishment nullification system... *(Embed 7/7)*");
		await chnl.send({embed: links});
		await chnl.send("*If you can't copy the invite link, here's the raw URL: https://discord.gg/4zJ8xqV*");
		await output.edit(`Landing has finished building in ${chnl}. This message will be removed in 5 seconds.`).then(output => {
			output.delete(5000)
		})
		.catch(() => console.error("Error while deleting message."));
	}
	sendLandingEmbeds();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Bot Owner"
};

exports.help = {
	name: "buildlanding",
	category: "Channel Building",
	description: "Builds the landing by purging the whole channel and sending embeds. Builds in first channel named **landing** if no arguments are provided.",
	usage: "buildlanding channel"
};