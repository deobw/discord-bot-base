const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Command collections
client.prefixCommands = new Collection();
client.slashCommands = new Collection();
client.prefix = process.env.PREFIX || '!';

// Event handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Prefix Command handler
const prefixCommandsPath = path.join(__dirname, 'prefixCommands');
const prefixCommandFiles = fs.readdirSync(prefixCommandsPath).filter(file => file.endsWith('.js'));

for (const file of prefixCommandFiles) {
  const filePath = path.join(prefixCommandsPath, file);
  const command = require(filePath);
  client.prefixCommands.set(command.name, command);
}

// Slash Command handler
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
  const filePath = path.join(slashCommandsPath, file);
  const command = require(filePath);
  client.slashCommands.set(command.data.name, command);
}

// Login to Discord with your client's token
client.login(process.env.TOKEN); 