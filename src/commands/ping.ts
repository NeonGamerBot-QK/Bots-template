import { Message, Client } from "discord.js"

export default { 
    name: 'ping',
    async execute(message: Message,args: String[],client: Client): Promise<void> {
        message.reply('Pong')
    }
}