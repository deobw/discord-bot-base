# discord-bot-base
Base for building discord bot in javascript

## Setup

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
4. Edit `.env` and add your Discord bot token and other settings
5. Deploy slash commands (optional, only if you want to use slash commands):
```bash
npm run deploy-commands
```
6. Start the bot:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Creating a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" tab and add a bot
4. Copy the token and add it to your `.env` file
5. Enable the "Message Content Intent" under Privileged Gateway Intents
6. Go to the "OAuth2" tab
7. In URL Generator, select "bot" and "applications.commands" scopes with appropriate permissions
8. Use the generated URL to invite the bot to your server

## Project Structure

- `src/index.js` - Main bot file
- `src/prefixCommands/` - Prefix command files (traditional message-based commands)
- `src/slashCommands/` - Slash command files (interaction-based commands)
- `src/events/` - Event handler files
- `src/deploy-commands.js` - Script to register slash commands globally

## Command System

This bot supports both prefix commands and slash commands in separate directories.

### Adding Prefix Commands

Create a new file in the `src/prefixCommands` directory:

```javascript
module.exports = {
  name: 'commandname',
  description: 'Description of the command',
  execute(message, args) {
    // Command code here
  },
};
```

### Adding Slash Commands

Create a new file in the `src/slashCommands` directory:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Description of the command'),
  execute(interaction) {
    // Command code here
  },
};
```

After adding or modifying slash commands, run:
```bash
npm run deploy-commands
```

## Features

- Separate prefix and slash command handlers
- Event system
- Environment configuration
- Global slash command registration
- Basic commands (ping, help)
