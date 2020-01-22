const discord = require('discord.js');
const client = new discord.Client();
const token = process.env.token;
const prefix = process.env.prefix;
const messagesFromWarrior = [];

client.on('ready', () => {
    console.log("Bot is ready!");
    client.user.setPresence({
        status:"dnd",
        game: {
            name:'Warri0r#1910 as always. Prefix is mod!',
            type:"LISTENING"
        }
    })
});
//ACTIVATE ANYTHING EVENT
client.on('message', msg => {
    const args = msg.content.substring(prefix.length).trim().split(" ")
    const command = args.shift();

    if(command == "activate") {
        if(!args[0]) return msg.channel.send(`Master ${msg.author.tag}, please specify what to activate.`);
        const type = args[0]
        if(type=="setup") {
            msg.guild.createChannel("videos", {topic: "This is where Flamingo videos are posted. -Your bot, Moderator#5892."})
            .then()
            .catch(error => {
                msg.channel.send(`ERROR IN SETTING UP, PLEASE CONTACT OWNER. ERROR: ${error.message}`)
            });
        }
    }
});
//HELP COMMAND
client.on('message', msg => {
    const arguments = msg.content.substring(prefix.length).trim();
    const command = arguments.shift();

    if(command == "help") {
        if(!arguments[0]) {
            const Embed1 = new discord.RichEmbed();
            Embed1.setTitle(msg.author.tag);
            Embed1.setColor(0x00FFEC);
            Embed1.setFooter(msg.author.avatarURL);
            Embed1.setDescription(`Here are all of the commands, master.`);
            Embed1.addField("mod!help", "Displays this message. Did I say message? I MEAN DANK EMBED!");
            Embed1.addField("mod!activate", "Activate a function. This command uses the help command feature, so I need to explain it here.\n The activate commands has the following commands: mod!activate setup - Activates the setup of the bot.")
            Embed1.addField("mod!join", "Makes the bot join a voice channel.")
            Embed1.setFooter("Bot still being made! Bot made by TheMilkyWay, icon by Wix Logo Maker.");

            return msg.channel.send(Embed1);
        }
    }
});
//ALERT OWNER WHEN THE ACTIVATE SETUP COMMAND HAS BEEN USED!
client.on('channelCreate', channelThatWasCreated => {
    sleep(1000);
    if(channelThatWasCreated !=null) {
        if(channelThatWasCreated.name == "videos") {
            if(channelThatWasCreated.guild.name == "Flamingo Video Center"){
                console.log(`QUICK! HURRY UP! HE USED THE COMMAND SETUP! GO MAKE THAT WEBHOOK NOW BOI SO I CAN SERVE MY MASTER!`);
            }
        }
    }
});
//Sleep command so I can pause stuff, etc.
function sleep(milliseconds){
    var start = new Date().getTime();
    for(var i = 0; i < 1e7; i++) {
        if((new Date().getTime - start) > milliseconds) {
            break;
        }
    }
}

//Deez nuts, I don't know what I am doing anymore. -TheMilkyWay#4688 at 10:00 pm. Below this is the join voice channel command.
client.on("message", message => {
        const args = message.content.substring(prefix.length).trim().split(" ");
        const command = args.shift();
    
        if(command == "join") {
        if(!args[0]) return message.channel.send("Master, please specify the person you would like me to join. E.G: mod!join @Warri0r")
        if(!message.mentions.users.size == 1) return message.channel.send("Master, please mention only 1 person!");
        const personToJoin = message.mentions.members.first()
        let VoiceChannel = message.guild.channels.find(channel => channel.id == personToJoin.voiceChannel.id);
        VoiceChannel.join()
        .then(connection => {
            message.channel.send("Joined the voice channel, master. I do not have the command to play music yet if your wondering. If I did right now, it would be B-A-D (Bull Ash Dank), and add UN to the front of dank.")
        })
        .catch(message.author.send("Psst.. Master.. I failed to join the person. Perhaps give me administrator permisssions and drag my role right under yours?"));
    }
});
//SHUTDOWN COMMAND
client.on('message', message => {
    const args = message.content.substring(prefix.length).trim().split(" ");
    const command = args.shift();

    if(command == "shutdown") {
        if(!args[0]) return message.channel.send("Master, please specify bot at the end of shutdown(example at the end), or else I might break. E.G: mod!shutdown bot");
        const typeOfToShutdown = args[0];
        if(typeOfToShutdown == "bot") {
            await message.channel.send("Shutting down, master. Contact TheMilkyWay if you would like to power me back up. Bye!");
            client.user.setPresence({
                status: "invisible"
            })
            process.exit();
        }
    }
});

client.login(token)
//Welcome to the bottom of the script whoever you are.