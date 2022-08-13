const mongoose = require(`mongoose`)
const dbUri = "mongodb+srv://billy:discord@cluster0.qsuoa.mongodb.net/discord?retryWrites=true&w=majority"
const schema = mongoose.Schema
const servers = require("../schema.js")

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`setup`)
		.setDescription('Setup the bot. Without doing this some functions may not work')
        .addRoleOption(option=>
            option.setName("verified_role")
            .setDescription("Select The Role To Make Your Verified Role")
            .setRequired(true))
        .addRoleOption(option=>
            option.setName("admin_role")
            .setDescription("Select The Role To Make Into Your Admin Role")
            .setRequired(true)),
	async execute(interaction) {
        await mongoose.connect(dbUri,{keepAlive:true})
        console.log("Connected To Db")
        let user_id = interaction.user.id
        let guild_id = interaction.member.guild.id
        let owner_id = interaction.member.guild.ownerId
        let verified_role = interaction.options.getRole('verified_role');
        verified_role = verified_role.id
        let admin_role = interaction.options.getRole('admin_role');
        admin_role = admin_role.id
        let doc = await servers.find({server_id:guild_id})
        if(doc.length > 0) return interaction.reply(`This Server Has Already Been Setup Please Use The Settings Commands To Alter The Bots Settings`)
        if(user_id !== owner_id) return interaction.reply("Only The Server Owner May Setup The Bot")
        let new_doc =  await servers.create({server_id:guild_id,admin_role:admin_role,verified_role:verified_role,faction_roles:{0:"placeholder"}})
        await new_doc.save()
        console.log(`New Entry Added`)
        interaction.reply(`The Bot Has Now Been Setup In This Server`)
	},
};