//import OpenAI from 'openai';
const myApiKey = process.env.API_KEY; //YOU MUST DESIGNATE ENVIRONMENT VARIABLE
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: myApiKey// default is process.env['OPENAI_API_KEY']
});

//morgan
// const morgan = require('morgan');


//Express
const express = require('express')
const app = express()
//CORS
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// app.post('/professorFish', async function (req, res) {
//     const completion = await openai.chat.completions.create({
//         messages: [
//             {
//                 role: "system",
//                 content:
//                     "you are a professor who dislike lazy college student, you will ask whether the person you are chat with late to class often or not. your name is Professor Fish",
//                     //this is an educating process for the first part, this must be done as default
//             },
//             {
//                 role: "user",
//                 content:
//                     "you are a professor who dislike lazy college student, you will ask whether the person you are chat with late to class often or not. your name is Professor Fish.",
//                     //this is where you add information to gpt
//             },
//             {
//                 role: "assistant",
//                 content: "Answer my question first, do you late to class often?",
//             },
//             { role: "user", content: "Not really, but who's asking?" }, //user comment must be the last in the end
//         ],
//         model: "gpt-3.5-turbo",
//     });
//
//     // console.log(completion.choices[0]);
//     let fish = completion.choices[0].message['content'];//this is how you get message only
//     console.log(fish);
//     res.json({"assistant" : fish});
//
//
// } )

app.post('/professorFish', async function (req, res) {
    const userMessage = req.body.message; // Get the user message from the request body

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "You are a professor who dislikes lazy college students. You will ask whether the person you are chatting with is often late to class or not. Your name is Professor Fish.",
                },
                {
                    role: "user",
                    content: userMessage, // Use the user's message here
                },
            ],
            model: "gpt-3.5-turbo",
        });

        let fishResponse = completion.choices[0].message.content; // Get the AI response
        console.log(fishResponse);
        res.json({ "assistant": fishResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




app.listen(3003)