const {
    Client,
    Collection
} = require('discord.js');

const client = new Client({
    intents: 32767
})

const config = require('./config.json')

const {
    promisify
} = require('util');

const Ascii = require("ascii-table");
const glob = require('glob')
const PG = promisify(glob);

client.commands = new Collection();

const {
    DisTube
} = require('distube')

const {
    SpotifyPlugin
} = require("@distube/spotify");


client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

module.exports = client

require('./handlers/Events')(client);
require('./handlers/Commands')(client)
client.login(config.Token)