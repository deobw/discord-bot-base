const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all commands or info about a specific command.')
    .addStringOption(option => 
      option.setName('command')
        .setDescription('Get info about a specific command')
        .setRequired(false)),
  
  execute(interaction) {
    const { slashCommands, prefixCommands, prefix } = interaction.client;
    
    const commandName = interaction.options.getString('command');
    
    // If no specific command is requested, list all commands
    if (!commandName) {
      // List both traditional and slash commands
      const prefixCmds = Array.from(prefixCommands.keys()).join(', ');
      const slashCmds = Array.from(slashCommands.keys()).join(', ');
      
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle('Bot Commands')
          .setDescription(`Here are all the available commands:\n\n**Prefix Commands (${prefix}):**\n\`${prefixCmds}\`\n\n**Slash Commands:**\n\`${slashCmds}\``)
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp()
        ],
        ephemeral: true
      });
    }
    
    // Get the specific command requested
    const command = prefixCommands.get(commandName) || slashCommands.get(commandName);
    
    if (!command) {
      return interaction.reply({ 
        content: 'That\'s not a valid command!', 
        ephemeral: true 
      });
    }
    
    // Different output depending on command type
    const isSlashCommand = slashCommands.has(commandName);
    const name = isSlashCommand ? command.data.name : command.name;
    const description = isSlashCommand 
      ? command.data.description 
      : (command.description || 'No description provided');
    
    interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${isSlashCommand ? 'Slash' : 'Prefix'} Command: ${name}`)
        .setDescription(description)
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .setTimestamp()
      ],
      ephemeral: true
    });
  },
}; 