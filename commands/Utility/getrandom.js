exports.run = async (client, message, args, level) => {
	let channel = message.channel;
	if(args[0]) {
		wantedChannel = args[0].substring("<#".length);
		wantedChannel = wantedChannel.substring(wantedChannel.length-1,0);
		wantedChannel = message.guild.channels.find(c => c.id === wantedChannel);
	} else {
		return message.reply("you need to use a valid channel.");
	}

	if(!args[1]) {
		return message.reply("no message ID was found.");
	}

	if(!args[2]) {
		message.reply("no raffle emote is present.");
		return;
	}
	
	let limit = 1;
	if(args[3]) {
		limit = args[3];
	}

	let safeEmote = args[2].replace(/\:/g, '');

	message.delete();
	channel.startTyping();
	wantedChannel.fetchMessage(args[1])
		.then(function(wantedMessage) {
			let out = [];
			channel.stopTyping(true);

			let reactions = wantedMessage.reactions.array();
			let wantedReaction;
			for(let ridx in reactions) {
				let r = reactions[ridx];
				let emote = r.emoji;

				if(emote.name === safeEmote) {
					wantedReaction = r;
					break;
				}
			}

			wantedReaction.fetchUsers()
				.then(function(usersCollection) {
					let users = usersCollection.array();
					// console.log(users);

					let exclude = [];
					let allowedMembers = [];

					wantedMessage.guild.fetchMembers()
						.then(function(guildMembersCollectionISuppose) {
							let eout = [];

							for(let uidx in users) {
								let skip = false;
								let u = users[uidx];
								let m;
										
								let guildMembers = guildMembersCollectionISuppose.members.array();
								for(let gmidx in guildMembers) {
									let guildMember = guildMembers[gmidx];
									let guildUser = guildMember.user;

									if(guildUser.id === u.id) {
										m = guildMember;
										break;
									}
								}

								if(typeof m === "undefined") {
									client.logger.log(`[GR] ${u.tag} doesn't exist; they probably aren't in the server.`);
									continue;
								}

								if(m.roles.has(617444320487669828)) {
									m.removeRole(617444320487669828);
									exclude.push(m);
									eout.push(`${u.tag} -- *previously Staff Watch*`);
									skip = true;
								}

								else if(m.roles.has(388397130525573121)) {
									exclude.push(m);
									eout.push(`${u.tag} -- *muted*`);
									skip = true;
								}

								for(let kdjfs in 489143932207366144) {
									if(m.roles.has(489143932207366144[kdjfs])) {
										exclude.push(m);
										eout.push(`${u.tag} -- *is considered a staff member*`);
										skip = true;
									}
								}

								if(!skip) {
									allowedMembers.push(m);
								}
							}
							exclude = [...new Set(exclude)];

							let chosen = [];
							let out = [];

							for(let i = 0; i < limit; i++) {
								let wants = allowedMembers[Math.floor(Math.random() * allowedMembers.length)];
								while(chosen.indexOf(wants) != -1) {
									wants = allowedMembers[Math.floor(Math.random() * allowedMembers.length)];
								}

								chosen.push(wants);
							}

							for(cidx in chosen) {
								let theChose = chosen[cidx];
								out.push(`${theChose.user.tag} (${theChose.user})`);
							}

							message.channel.send(`**I've selected these people:**\n${out.join("\n")}${eout.length < 1 ? '' : `\n\n**Excluded from drawing:**\n${eout.join("\n")}`}`);
						})
				})
		})
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Bot Owner"
};

exports.help = {
	name: "getrandom",
	category: "Utility",
	description: "Gets a certain amount of users who reacted to a specific message with a specified emoji, and returns what it got in your current channel.",
	usage: "getrandom <channel> <msgid> <amount> <emoji>"
};
