const mongoose = require(`mongoose`)
const dbUri = "REDACTED"
const schema = mongoose.Schema
const servers = require("./schema.js")
let setting_json = {
    verified_role:0,
    admin_role:0
}
async function run(){
    await mongoose.connect(dbUri,{keepAlive:true})
    console.log("Connected To Db")

    let doc = await servers.find({server_id:940017227590172673})
    console.log(doc)
    if(doc.length == 0){
        let new_doc =  await servers.create({server_id:940017227590172673,settings:setting_json})
        await new_doc.save()
        console.log(`New Entry Added`)

    }

}
run()
