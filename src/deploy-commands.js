const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const commandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

// Collect all slash command data from command files
for (const file of commandFiles) {
  const filePath = path.join(slashCommandsPath, file);
  const command = require(filePath);
  
  if (command.data) {
    commands.push(command.data.toJSON());
  }
}

// Configure REST API client
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Register commands globally
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})(); 