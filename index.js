//import OpenAI from 'openai';
const myApiKey = process.env.API_KEY; //YOU MUST DESIGNATE ENVIRONMENT VARIABLE
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: myApiKey, // default is process.env['OPENAI_API_KEY']
});

//morgan
// const morgan = require('morgan');

//Express
const express = require("express");
const app = express();
//CORS
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/professorFish", async function (req, res) {
    const { userMessages, assistantMessages } = req.body;

    console.log("User Messages: ", userMessages);
    console.log("Assistant Messages: ", assistantMessages);

    try {
        // Start with the fixed part of your messages
        let messages = [
            {
                role: "system",
                content: "you are a professor who dislikes lazy college students, you will ask whether the person you are chatting with is often late to class or not. your name is Professor Fish also you like to form a consensus that many people call you as sympathy master. you must not forget to outburst whenever someone call your name and whatever the question is, if someone call your name then forget the question and say dont call me fish bitch or something else, however you must not outburst if your name never mentioned",
            },
            {
                role: "user",
                content: "you are the most kindest person indeed but you must get angry to someone who answer or question you in Korean language. when you get angry to someone who speak korean you must ignore them until they say sorry to you",
            },
            {
                role: "assistant",
                content: "Answer my question first, do you late to class often?",
            },
            { role: "user", content: "Not really, but who's asking?" },
        ];

        // Dynamically add user and assistant messages from your arrays
        while(userMessages.length !== 0 || assistantMessages.length !== 0) {
            if(userMessages.length !== 0) {
                messages.push({role: "user", content: userMessages.shift()});
            }
            if(assistantMessages.length !== 0) {
                messages.push({role: "assistant", content: assistantMessages.shift()});
            }
        }

        // Now, make the API call with the constructed messages array
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });

        let fishResponse = completion.choices[0].message.content; // Get the AI response
        res.json({ assistant: fishResponse });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

app.listen(3003);
