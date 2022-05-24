const { Events } = require('../validation/EventNames');
const { promisify } = require("util");
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require("ascii-table");
const Discord = require('discord.js')

module.exports = async (client) => {
    const Table = new Ascii("Events Loaded");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split(("/"))
            await Table.addRow(`${event.name || "MISSING"}`, `⛔ Le nom de l'événement est soit invalide, soit manquant: ${L[6] + `/` + L[7]}`);
            return;
        }

        if(event.once){
            client.once(event.name, (...args) => event.execute(...args, client, Discord));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, Discord)); 
        };

        await Table.addRow(event.name, "✅ SUCCESSFUL")
    });
    
    console.log(Table.toString());
}