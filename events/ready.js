module.exports = async client => {
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.filter(user => !user.bot).size} users in ${client.guilds.size} ${client.guilds.size > 1 ? "servers" : "server"}.`, "ready");
  
  client.user.setActivity(`${client.users.filter(user => !user.bot).size} humans | ${client.settings.get("default").prefix}help`, {type: "WATCHING"});

  client.user.setStatus("online");
};
