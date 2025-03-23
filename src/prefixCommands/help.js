module.exports = {
  name: 'help',
  description: 'List all commands or info about a specific command.',
  execute(message, args) {
    const { prefixCommands, prefix } = message.client;
    
    // If no specific command is requested, list all commands
    if (!args.length) {
      const commandList = prefixCommands.map(command => command.name).join(', ');
      return message.channel.send({
        embeds: [{
          color: 0x0099ff,
          title: 'Bot Prefix Commands',
          description: `Here are all the available prefix commands:\n\`${commandList}\`\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,
          footer: { text: `Requested by ${message.author.tag}` },
          timestamp: new Date(),
        }]
      });
    }
    
    // Get the specific command requested
    const name = args[0].toLowerCase();
    const command = prefixCommands.get(name);
    
    if (!command) {
      return message.reply('That\'s not a valid command!');
    }
    
    message.channel.send({
      embeds: [{
        color: 0x0099ff,
        title: `Command: ${command.name}`,
        description: command.description || 'No description provided',
        footer: { text: `Requested by ${message.author.tag}` },
        timestamp: new Date(),
      }]
    });
  },
}; 