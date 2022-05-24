const { Client } = require('discord.js')
const { Database } = require("../../config.json")

module.exports = {
    name: 'ready',
    once: true,

    /**
     * 
     * @param {Client} client 
     */
    execute(client){
        console.log("The client is now ready ✅")
        
        client.user.setActivity("https://github.com/Adrix-fr", {type: "COMPETING"})
    }
}