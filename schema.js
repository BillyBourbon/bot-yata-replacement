const mongoose = require("mongoose")
const schema = mongoose.Schema
const servers = new schema({
    server_id:{
        type:String,
        required:true,
    },
    admin_role:{
        type:String,
        required:false,
    },
    verified_role:{
        type:String,
        required:false,
    },
    faction_roles:{
        type:Object,
        required:true,
    }
}, 
{timestamps:true}
)

module.exports = mongoose.model('server_yatar', servers,`server_yatar`);