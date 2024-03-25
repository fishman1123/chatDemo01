// import OpenAI from 'openai';
const myApiKey = process.env.API_KEY; //YOU MUST DESIGNATE ENVIRONMENT VARIABLE
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: myApiKey// default is process.env['OPENAI_API_KEY']
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices);
}

main();