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
		.setColor(0x00AE86)
		.setDescription(`Welcome to **${guild.name}**! This is a Discord server that I personally run for all my shenanigans. This is the channel where I explain rules and stuff and other stuff.`)
		.addField("IMPORTANT DISCLAIMER:", "This list does not constitute the full list of rules. With that in mind, try to use common sense and good judgement for any action you're about to take at all times.")
		.addField("Before we go further...","I don't care if you use profanity here, since Discord only allows users who are at least 13 years of age. If you have a problem with this, then this isn't the discord server for you.")
		.setThumbnail(guild.iconURL);
	const textrules = new Discord.RichEmbed()
		.setTitle("Text Channel Rules")
		.setColor(0x8E8E38)
		.addField("Use common sense.","This means that you shouldn't be a jerk to others and have read the loose disclaimer.")
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
		.addField("Absolutely no NSFW content.","Shocking or graphic content, animal cruelty, and gore are not allowed whatsoever. Breaking this rule will result in a permanent ban on sight.");
	const voicerules = new Discord.RichEmbed()
		.setTitle("Voice Channel Rules")
		.setColor(0x388E8E)
		.addField("Most text rules apply in the voice chat.","Don't go crazy because of the channels being different.")
		.addField("No loud audio.","Playing loud and/or annoying audio through your microphone or music bots is not allowed.")
		.addField("Be responsible.","Everyone in the server holds the right to report users in the voice channels to have them muted as needed.")
		.addField("Use common sense.","You can't escape this rule. Please don't ignore it.")
		.addField("Limit the usage of voice changers.","Don't fake what you sound like. We prevent discrimination, you're fine.");
	const punishmentsystem = new Discord.RichEmbed()
		.setTitle("Punishment System")
		.setColor(0xC67171)
		.setDescription("Break a rule and you will get warned or muted. Three warns from the moderation bot results in a kick, then a ban after going through the same process. Extreme offenders get worse punishments. If you have a higher-tier role such as Annoying, you may lose it until it's deemed necessary we give it back.")
		.addBlankField()
		.addField("IMPORTANT:","Staff hold a right to punish anyone how they see fit. Staff here are pretty lenient, just be a well rounded individual and respect others. The staff team can see any kind of deleted images because of the readily-available logging system they have at their disposal.");
	const nullify = new Discord.RichEmbed()
		.setTitle("Rule Nullification System")
		.setColor(0xC5C1AA)
		.setDescription("This is a system about how to actually be punished for breaking rules, and how to avoid it if what you want to do is somehow \"important\". This is **especially important** for staff members.")
		.addField("The System","When a user breaks a rule, as long as everybody within the constituting area is okay with that rule being broken, then **most** rules *(Embed keyword, most)* broken are nullified until a complaining or reporting individual, or group of individuals, is present.")
		.addField("HOWEVER...","This does NOT mean that you can break the rules first and ask questions later. Use this additional information at your own discretion, but if you misuse it or abuse it, the punishment is your own fault. By the way, you must still abide by the Discord ToS and Community Guidelines in order to be protected by this system.")
	const annoying = new Discord.RichEmbed()
		.setTitle("Annoying Role")
		.setColor(0x9AFF9A)
		.addField("What is the Annoying role?","The Annoying role is a role given out to users who meet certain requirements, and are usually well-known members of the community that don't need a staff position to pose as a great role model. This role grants additional permissions that normally require other roles.")
		.addField("How do I get it?","Well, the requirements are as follows:\n• Level **50** (maximum yes) or above\n• No bans, warns or mutes for at least one month\n• Good community standing\n• Waited at least one month from last removal of the role")
		.addField("What do I do when I meet these requirements?","If you meet the requirements, send a screenshot of your rank by copying the image sent by <@339254240012664832> after using `:?rank` in <#646840514389344257> and sending it through <@575252669443211264>. Be sure to ensure that we know why you're sending it!")
	const links = new Discord.RichEmbed()
		.setTitle("Important Links")
		.setColor(0x8E388E)
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
		await output.edit("Sending Annoying role system... *(Embed 6/7)*");
		await chnl.send({embed: annoying});
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