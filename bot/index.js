require("dotenv").config();

const OpenAI = require("openai");

console.log("hf token >>", process.env.AQ_TOKEN);

const ai = new OpenAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
    apiKey: process.env.AQ_TOKEN
});

async function askAI(message) {

    const response = await ai.chat.completions.create({
        model: "gemini-3.6-flash",

        messages: [
            {
                role: "system",
                content: `
                    You are CampusHub AI, a friendly assistant
                    for college students.

                    Help with programming, DSA, academics,
                    projects, hackathons and career guidance.

                    Explain concepts clearly and honestly.
                `
            },
            {
                role: "user",
                content: message
            }
        ]
    });

    return response.choices[0].message.content;
}

module.exports = { askAI };