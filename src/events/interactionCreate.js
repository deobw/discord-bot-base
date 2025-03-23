module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    if (!interaction.isCommand()) return;
    
    const { client } = interaction;
    const command = client.slashCommands.get(interaction.commandName);
    
    if (!command) return;
    
    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({ 
        content: 'There was an error while executing this command!', 
        ephemeral: true 
      });
    }
  },
}; 