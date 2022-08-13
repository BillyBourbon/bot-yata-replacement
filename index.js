const fs = require('fs');
const { Client, Collection, GatewayIntentBits  } = require('discord.js');
const {key, token, clientId} = require("./settings.json")

const client = new Client({  
	intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,]
});

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
 // console.log(interaction)
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
	  console.log(command.data.name+" @ time"+ new Date())
	  await command.execute(interaction,client);
		console.log(new Date()+": Succesfully Ran Commmand: "+command)
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));