//create a  discord bot using openai API that interacts with the discord server
require('dotenv').config();

//prepare to connect to the discord API
const { Client, GatewayIntentBits } = require('discord.js');
//const { OpenAIApi } = require('openai');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

//prepare connection to OpenAI API
const { Configuration , OpenAIApi } = require('openai');

// initialise the configuration
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});

//creating a connection to open ai and its API
const openai = new OpenAIApi(configuration);

//Check for when a message on discord is sent, async function that is pulling out the message that comes from discord users
//creating a try catch loop to cath the errors and log them out, creating a ping pong message to send the message from a user back to me 
client.on('messageCreate', async function(message){
    try{
        if(message.author.bot) return; // so that chat gpt doesn't respond to itself or other bots

        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`ChatGPT is a friendly chatbot.\n\
ChatGPT: Hello, how are you?\n\
${message.author.username}: ${message.content}\n\
ChatGPT:`,
            temperature: 0.9,
            max_tokens: 150,//or 100 if it doesn't work
            stop: ["ChatGPT:", `${message.author.username}`],
        })

        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    } catch(err){
        console.log(err)
    }
});

//loging the bot into the discord server
client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is now Online on Discord :)")