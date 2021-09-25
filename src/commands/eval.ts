import { Message, Client } from "discord.js"
import ms from 'ms'
import baseCommand from "../util/basecommand"


export default class extends baseCommand {
    constructor() {
        super({
            name: 'eval',
            description: "Eval a command",
       })
    }
    execute(message:Message,args:String[],client:Client) {
if(message.author.id !== '566766267046821888') return ;
message.reply('e')
    }
    
}