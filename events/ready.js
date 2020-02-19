module.exports = async client => {
  client.logger.log(`Looks like I'm ready! My tag is ${client.user.tag}, and I'm ready to serve ${client.users.cache.some(user => !user.bot).size} users in ${client.guilds.size} ${client.guilds.size > 1 ? "servers" : "server"}.`, "ready");

  client.user.setActivity(`${client.users.filter(user => !user.bot).size} humans | ${client.settings.get("default").prefix}help`, {type: "WATCHING"});
  client.user.setStatus("online");
};
