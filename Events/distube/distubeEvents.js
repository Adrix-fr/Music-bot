const client = require('../../index')
const { MessageEmbed }= require('discord.js')

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) => {
    const embed = new MessageEmbed()
    .setColor('RED')
    .setDescription(`🎧 | Joue \`${song.name}\` - \`${song.formattedDuration}\`\nDemandé par : ${song.user}\n${status(queue)}`)
    queue.textChannel.send({embeds: [embed]})
  })
  
  .on('addSong', (queue, song) => {   
    const embed2 = new MessageEmbed()
    .setColor('RED') 
    .setDescription(`Ajout ${song.name} - \`${song.formattedDuration}\` dans la file d'attente par ${song.user}`)
  queue.textChannel.send({embeds: [embed2]})
  
    .on('addList', (queue, playlist) => {
      const embed3 = new MessageEmbed()
      .setColor('RED')
      .setDescription(`Ajout\`${playlist.name}\` playlist (${playlist.songs.length} songs) à la file d'attente \n${status(queue)}`)
      queue.textChannel.send({embeds: [embed3]})})
  
    .on('error', (channel, e) => {
    channel.send(`Une erreur a été rencontrée : ${e}`)
    console.error(e)
  })

  .on('empty', channel => channel.send('Le channel vocal est vide ! J\'ai du quitter le channel...'))

  .on('searchNoResult', message => message.channel.send(`Aucun résultat trouvé !`))

  .on('finish', queue => queue.textChannel.send('Terminé !'))})