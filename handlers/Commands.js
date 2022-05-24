const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table')
/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file)

        if(!command.name)
        return Table.addRow(file.split("/")[7], "❌ Failed", "Missing a name")

        if(!command.description)
        return Table.addRow(command.name, "❌ Failed", "Missing a description")
        
        client.commands.set(command.name, command)
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL");
    });

    console.log(Table.toString());


    client.on("ready", async (client) => {

        // SI VOUS VOULEZ QUE SA SOIT QUE SUR 1 SERVEUR, ENLEVEZ LES (/* || */) ⬇️⬇️

        /* const MainGuild = await client.guilds.cache.get("L'IDENTIFIANT DU SERVEUR");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
        MainGuild.commands.set(CommandsArray);
        }); */

        // SUR LE GLOBAL METTEZ (/* || */) ⬇️⬇️ SI VOUS VOULEZ METTRE LES SLASH QUE SUR 1 SERVEUR
        
        await client.application.commands
        .set(CommandsArray)
        .then((s) => {
        console.log("Les slashs commandes ont été déployés.");
        })
        .catch((e) => {
        console.log(e);
         });
    })
}