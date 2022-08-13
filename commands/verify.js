const { SlashCommandBuilder } = require('@discordjs/builders');
const {key, token, clientId} = require("../settings.json")
const axios = require(`axios`)
const mongoose = require(`mongoose`)
const dbUri = "mongodb+srv://billy:discord@cluster0.qsuoa.mongodb.net/discord?retryWrites=true&w=majority"
const schema = mongoose.Schema
const servers = require("../schema.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Links the user and their discord accounts'),
	async execute(interaction) {
        let user_id = interaction.user.id
        await mongoose.connect(dbUri,{keepAlive:true})
        console.log("Connected To Db")
        let member = interaction.member
        let guild_id = interaction.member.guild.id
        let doc = await servers.find({server_id:guild_id})
        if(doc.length == 0) return interaction.reply(`Unable To Pull Server Settings. Check Bot Is Setup Before Tying Again`)
        try{
            let call = await axios.get(` https://api.torn.com/user/${user_id}?selections=discord,profile&key=${key}`)
            let torn_id = call.data.discord.userID
            let torn_name = call.data.name
            let faction_id = call.data.faction.faction_id
            let verified_role = doc[0].verified_role
            const role_to_give = interaction.guild.roles.cache.get(verified_role)
            member.roles.add(role_to_give)
            try{
                member.setNickname(`${torn_name} [${torn_id}]`)
                interaction.reply(`Verification Succesfully. You Are Now Known As ${torn_name} [${torn_id}]`);
            } catch(e){
                
            interaction.reply(`Verification Unsuccesfull as the bot lacks the required permissions to change your name`);
            }
        }
        catch(e){
            console.log(e)
            interaction.reply(`Verification Not Succesfull`)
        }
	 
	},
};