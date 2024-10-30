import { Client } from 'discord.js';
import config from './config';
import helpCommand from './commands';
import dotenv from 'dotenv';

const { intents, prefix, token } = config;

dotenv.config();

const client = new Client({
  intents,
  presence: {
    status: 'online',
    activities: [{
      name: `${prefix}help`,
      type: 'LISTENING'
    }]
  }
});

client.on('ready', () => {
  console.log(`Logged in as: ${client.user?.tag}`);
  console.log(`Invite: https://discord.com/oauth2/authorize?client_id=${client.user?.id}&scope=`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift();

    switch (command) {
      case 'ping':
        const msg = await message.reply('Pinging...');
        await msg.edit(`Pong! The round trip took ${Date.now() - msg.createdTimestamp}ms.`);
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0) await message.channel.send(args.join(' '));
        else await message.reply('You did not send a message to repeat, cancelling command.');
        break;

      case 'help':
        const embed = await helpCommand(message);
         embed.setThumbnail(client.user!.displayAvatarURL());
        message.channel.send({ embeds: [embed] });
        break;
      case `mine`:
        const msg2 = await message.channel.send(`Mining...`);
        await msg2.edit(`You mined`+ `` + ` `+Math.floor(Math.random()*11) + ` ` + `<61383-diamond>` +` `+ `diamond!`);
        break;
      case `fight`:
        const msg3 = await message.channel.send(`Fighting...`);
        await msg3.edit(`You fought` + ` ` + Math.floor(Math.random()*11))
        break;
      default:
         await message.channel.send(`Unknown command. Try ${prefix}help`);
    }
  }
});

client.login(token);
