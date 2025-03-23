module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Bot is ready! Serving ${client.guilds.cache.size} servers`);
    
    // Set bot status
    client.user.setActivity(`${client.prefix}help`, { type: 'LISTENING' });
  },
}; 