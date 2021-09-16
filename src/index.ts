import { Client, Message, MessageActionRow, MessageEmbed, Intents } from 'discord.js'
import { Collection } from '@discordjs/collection'
import * as test from './test'
let client: any = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    shards: 0,
    restSweepInterval: 6e2,
    retryLimit: 1e2
})
console.log('e')
client.on('ready', () => {
    console.log('Ready on ' + client.user?.username)
})
client.prefix = ['!']
client.commands = new Map()
const global:any =  globalThis
global.client = client
//test.default()
client.login(process.env.TOKEN)
client.on('messageCreate', (message:Message) => {
const args = message.content.trim().split(/ +/)
const cmd = args.shift()?.toLowerCase()
const command = client.commands.get(cmd)
if(!command) return message.channel.send({ content: "Cannot get command `" + cmd + "`", allowedMentions: {
    parse: []
}})
command.execute(message,args,client)
})