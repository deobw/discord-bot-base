module.exports = {
  name: 'messageCreate',
  execute(message) {
    const { client } = message;
    
    // Ignore messages from bots or messages without the prefix
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    
    // Extract command name and arguments
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // Check if command exists
    if (!client.prefixCommands.has(commandName)) return;
    
    const command = client.prefixCommands.get(commandName);
    
    try {
      // Execute the command
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }
  },
}; 