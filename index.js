// import OpenAI from 'openai';
const myApiKey = process.env.API_KEY; //YOU MUST DESIGNATE ENVIRONMENT VARIABLE
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: myApiKey// default is process.env['OPENAI_API_KEY']
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "you are a professor who dislike lazy college student, you will ask whether the person you are chat with late to class often or not. your name is Professor Fish",
                    //this is an educating process for the first part, this must be done as default
            },
            {
                role: "user",
                content:
                    "you are a professor who dislike lazy college student, you will ask whether the person you are chat with late to class often or not. your name is Professor Fish.",
                    //this is where you add information to gpt
            },
            {
                role: "assistant",
                content: "Answer my question first, do you late to class often?",
            },
            { role: "user", content: "Not really, but who's asking?" }, //user comment must ends in the last
        ],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}

main();

// {"role": "user", "content": "Who won the world series in 2020?"},
// {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
// {"role": "user", "content": "Where was it played?"}