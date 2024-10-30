import { Message, MessageEmbed, MessageButton, MessageActionRow } from 'discord.js';
import config from './config';

const { prefix } = config;

const commands: { [name: string]: { aliases?: string[]; description: string; format: string } } = {
  'help': {
    description: 'Shows the list of commands and their details.',
    format: 'help'
  },
  'ping': {
    description: 'Checks connectivity with discord\'s servers.',
    format: 'ping'
  },
  'say': {
    aliases: ['repeat'],
    description: 'Repeats whatever is said.',
    format: 'say <message>'
  },
  'mine': {
    aliases: ['to mine'],
    description: 'Mine for resources.',
    format: 'mine'
  },
  'fight': {
    aliases: ['to fight'],
    description: 'Fight for resources.',
    format: 'fight'
  }
}

export default async function helpCommand(message: Message) {
  const footerText = 'Requested by: ' + message.author.tag;
  const footerIcon = message.author.displayAvatarURL();
  const embed = new MessageEmbed()
    .setTitle('HELP MENU')
    .setColor('GREEN')
    .setFooter({ text: footerText, iconURL: footerIcon })
    .setTimestamp();
  const button = new MessageButton()
    .setCustomId('help')
    .setLabel('Help')
    .setStyle('PRIMARY');
  const row = new MessageActionRow().addComponents(button);
  await message.channel.send({
    components: [row]
  });


  for (const commandName of Object.keys(commands)) {
    const command = commands[commandName];
    let desc = command.description + '\n\n';
    if (command.aliases) desc += `**Aliases :** ${command.aliases.join(', ')}\n`;
    desc += '**Format**\n```\n' + prefix + command.format + '```';

    embed.addField(commandName, desc, false);
  }
  return embed
}
