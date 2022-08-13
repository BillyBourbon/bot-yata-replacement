const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong if online'),
	async execute(interaction) {
		console.log(interaction)
	 interaction.reply('Pong');
	},
};