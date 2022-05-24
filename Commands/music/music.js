const {
    CommandInteraction,
    Client,
    MessageEmbed,
    GuildMember
} = require("discord.js");

module.exports = {
    name: "music",
    description: "Système musique avancée",
    options: [{
            name: "play",
            description: "Permet de lancer la musique",
            type: "SUB_COMMAND",
            options: [{
                name: "query",
                description: "Donnez un nom ou un url pour lancer",
                type: "STRING",
                required: true
            }]
        },
        {
            name: "volume",
            description: "Permez de modifier le volume",
            type: "SUB_COMMAND",
            options: [{
                name: "pourcent",
                description: "10 = 10%",
                type: "NUMBER",
                required: true
            }]
        },
        {
            name: "settings",
            description: "Choisissez une option",
            type: "SUB_COMMAND",
            options: [{
                name: "options",
                description: "Appuyer sur une option",
                type: "STRING",
                required: true,
                choices: [{
                        name: "queue",
                        value: "queue"
                    },
                    {
                        name: "skip",
                        value: "skip"
                    },
                    {
                        name: "pause",
                        value: "pause"
                    },
                    {
                        name: "resume",
                        value: "resume"
                    },
                    {
                        name: "stop",
                        value: "stop"
                    },
                    {
                        name: "Shuffle queue",
                        value: "shuffle"
                    },
                    {
                        name: "Autoplay",
                        value: "AutoPlay"
                    },
                    {
                        name: "Related Song",
                        value: "RelatedSong"
                    },
                    {
                        name: "Repeat Mode",
                        value: "RepeatMode"
                    }
                ]
            }]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} client 
     * @param {Client} interaction
     */
    async execute(interaction, client) {
        const {
            options,
            guild,
            channel,
            member
        } = interaction;
        const VoiceChannel = member.voice.channel

        if (!VoiceChannel)
            return interaction.reply({
                content: "Vous devez être dans un vocal pour pouvoir utiliser cette commande",
                ephemeral: true
            });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({
                content: `Je suis prêt a lancer dans le salon : <#${guild.me.voice.channelId}> !`,
                ephemeral: true
            });

        try {
            switch (options.getSubcommand()) {
                case "play": {
                    client.distube.play(VoiceChannel, options.getString("query"), {
                        textChannel: interaction.channel,
                        member: member
                    });
                    return interaction.reply({
                        content: `🎧 Demande reçue.`
                    });

                }
                case "volume": {
                    const Volume = options.getNumber("pourcent");
                    if (Volume > 100 | Volume < 1)
                        return interaction.reply({
                            content: `vous devez spécifier un nombre entre \`1/100\``
                        });

                    client.distube.setVolume(VoiceChannel, Volume)
                    return interaction.reply({
                        content: `🔊 Volume à été modifié par \`${Volume}\``
                    });
                }
                case "settings": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if (!queue)
                        return interaction.reply({
                            content: `⛔ Il n'y a pas de file d'attente`
                        });

                    switch (options.getString("options")) {
                        case "skip":
                            await queue.skip(VoiceChannel);
                            return interaction.reply({
                                content: `⏭️ Le son à bien été skip`
                            })

                        case "stop":
                            await queue.stop(VoiceChannel);
                            return interaction.reply({
                                content: `⏹️ Le son à bien été stoppé`
                            })

                        case "pause":
                            await queue.pause(VoiceChannel);
                            return interaction.reply({
                                content: `⏸️ Le son à bien été mis en pause`
                            })

                        case "resume":
                            await queue.resume(VoiceChannel);
                            return interaction.reply({
                                content: `▶️ Le son à bien été relancé`
                            })

                        case "shuffle":
                            await queue.shuffle(VoiceChannel);
                            return interaction.reply({
                                content: `🔀 la file d'attente a bien été mélangée`
                            })

                        case "AutoPlay":
                            let Mode = await queue.toggleAutoplay(VoiceChannel);
                            return interaction.reply({
                                content: `⏩ Mode AutoPlay est réglé sur ${Mode ? "on" : "off"}`
                            })

                        case "RelatedSong":
                            await queue.addRelatedSong(VoiceChannel);
                            return interaction.reply({
                                content: `🎧 une chanson liée a été ajoutée à la file d'attente`
                            })

                        case "RepeatMode":
                            let Mode2 = await client.distube.setRepeatMode(queue);
                            return interaction.reply({
                                content: `🔂 Mode Repeat est réglé sur ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}`
                            })

                        case "queue":
                            const embed = new MessageEmbed()
                                .setColor('RED')
                                .setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)
                            return interaction.reply({
                                embeds: [embed]
                            });
                    }
                    return;
                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`⛔ Alert: ${e}`)
            return interaction.reply({
                embeds: [errorEmbed]
            });
        }
    }
}