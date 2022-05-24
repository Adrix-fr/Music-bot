## Comment lancer le bot ?

#### Première étape :

Allez dans le fichier `config.json` et changez le [Token](https://discord.com/developers) de votre bot discord(https://www.mongodb.com/atlas)
```json
{
    "Token": "TOKEN"
}
```

### Deuxième étape :

Choisissez si vous voulez que les slash soit en global server ou en server privé dans le fichier `Handlers/Commands.js`. (les slash sont activé de base en global)
```js
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
```

# Run

> Pour lancer le bot:
> ```bash
> node .
> ```
> 
