import { Message, Client } from "discord.js"
import ms from 'ms'
import baseCommand from "../util/basecommand"
export default class extends baseCommand  {
    public constructor() {
        super({
            name: "ping",
        })
    }
   public execute(message:Message,args: string[],client: Client): void {
message.reply(`pinging..`).then((m:Message) => { 
    
    const all = client.ws.ping + (Date.now() - message.createdTimestamp) + (Date.now() - m.createdTimestamp)
    let msg = `Pong!: \n Api latency ${client.ws.ping} \n Message latency ${Date.now() - m.createdTimestamp}\n MessageCreate latency: ${Date.now() - message.createdTimestamp}\n total: ${all}`
    if(args[0] === '-p') msg = `Pong!: \n Api latency ${ms(client.ws.ping)} \n Message latency ${ms(Date.now() - m.createdTimestamp)}\n MessageCreate latency: ${ms(Date.now() - message.createdTimestamp)}\n total: ${ms(all)}`
m.edit(msg)
})
   }
}