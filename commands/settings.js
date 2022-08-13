const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Select The Setting And The New Value For It'),
	async execute(interaction) {
        
	},
};