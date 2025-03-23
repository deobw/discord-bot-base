const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping! Checks bot latency.'),
  
  execute(interaction) {
    const startTime = Date.now();
    interaction.reply('Pinging...').then(() => {
      const latency = Date.now() - startTime;
      interaction.editReply(`Pong! Latency: ${latency}ms. API Latency: ${Math.round(interaction.client.ws.ping)}ms`);
    });
  },
};