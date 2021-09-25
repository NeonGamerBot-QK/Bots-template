import { Message, Client } from "discord.js";
export default class BaseCommnad {
    name: string;
    description: string;
    aliases: string[];
    constructor(ops: any) {
if(!ops.name) throw new Error("No name provided")
this.name = ops.name;
this.description = ops.description;
this.aliases = ops.aliases;    
}
MissingParams(message: Message, args: string[], client: Client): void {
message.reply('Oops! broken command found, you can help by telling a dev the the command: "' + this.name + '" does not work properly');
console.error('BROKEN_COMMAND', this)
return;
}
}