require('dotenv').config();
const { OpenAI } = require('openai');

const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

async function generateFoodReccomendation(foodHistory, menulisting) {
    try {
        const completion = await openai.chat.completions.create({
        messages: [
            { 
            role: "system", 
            content: `Give me food recommendations based on the following food order history of this user ${foodHistory}. Generate 5 food suggestions for the user from the menu ${menulisting} and in valid JSON format in the below example:
                {
                    "food_option_1": "burger",
                    "food_option_2": "pasta",
                    "food_option_3": "rice",
                    "food_option_4": "sushi",
                    "food_option_5": "noodles",
                }`
            }
        ],
        model: "gpt-3.5-turbo",
        });

        const responseContent = completion.choices[0].message.content;
        console.log(responseContent);
        const parsedContent = JSON.parse(responseContent);
        return parsedContent;
    } catch (error) {
        console.error('Error generating food reccomendation:', error);
        throw error;
    }
}

module.exports = {
    generateFoodReccomendation, 
};






