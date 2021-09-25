import { Client, Message, Intents } from 'discord.js'
//import * as fetch from 'node-fetch'
import { config } from 'dotenv'
import * as fs from 'fs'
config()
let client: any = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    shards: 0,
    restSweepInterval: 6e2,
    retryLimit: 1e2,
    restWsBridgeTimeout:  60 * 1000,
    restTimeOffset: 1e2,
    presence: { activities: [{ name: 'status text', type: 'WATCHING'}, {name: 'status text', type: 'PLAYING'}], afk:true, status: 'dnd' }
})
console.log('e')

client.commands = new Map()
client.on('ready', () => {
    console.log('Ready on ' + client.user?.username)
fs.readdirSync(__dirname + '/commands/').filter((file:String) => file.endsWith('.ts')).forEach((file:String) =>{
    // try {
    //     require('./commands/'+file)
    // } catch (err) {
    //     console.log('cant open file ' + `${__dirname}/command/${file}`)
    //  return;
    // }
    let cmd = require('./commands/'+file).default
    console.log(cmd)
    cmd = new cmd();
    console.log(cmd)
client.commands.set(cmd.name, cmd)
})
console.log(client.commands.size)
})
client.prefix = ['!']
//client.fetch = fetch;
const global:any =  globalThis
global.client = client
//test.default()
client.login(process.env.TOKEN)
client.on('messageCreate', (message:Message) => {
if(message.author.bot) return;
const prefix = client.prefix.find((prefi: any) => message.content.startsWith(prefi))
if(!prefix) return;
const args = message.content.slice(prefix.length).trim().split(/ +/)
const cmd = args.shift()?.toLowerCase()
const command = client.commands.get(cmd)
if(!command) return message.channel.send({ content: "Cannot get command `" + cmd + "`", allowedMentions: {
    parse: []
}})
if(!command.run && !command.execute) return command.MissingParams(message, args, client);
if(command.run) return command.run(message, args, client);
if(command.execute) return command.execute(message, args, client)
command.RunCommand(message,args,client)
})
process.on('uncaughtException', console.error)