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
            content: `Give me food recommendations based on the following food order history of this user ${foodHistory}. Generate only 5 food suggestions for the user from the menu ${menulisting} and in valid JSON format in the below example
                      and the food suggestions can come from various restaurants as long as total there are 5 suggestions:
                {
                "Nasi_Lemak_Ayam_Taliwang": {
                    "Chicken_Dishes": {
                      "Nasi_Lemak_Ayam_Taliwang": {
                        "desc": "Signature nasi lemak featuring grilled chicken marinated in traditional Ayam Taliwang spices, served with fragrant coconut rice and accompaniments.",
                        "price": "$6.50"
                      },
                      "Ayam_Penyet": {
                        "desc": "Smashed fried chicken with sambal and rice.",
                        "price": "$7.00"
                      },
                    },
                    "Noodles_and_Rice": {
                      "Mie_Goreng": {
                        "desc": "Indonesian fried noodles with egg and vegetables.",
                        "price": "$5.80"
                      },
                      "Bakso": {
                        "desc": "Beef meatball soup with noodles.",
                        "price": "$6.00"
                      },
                      "Nasi_Goreng": {
                        "desc": "Fried rice with shrimp paste and chili.",
                        "price": "$6.30"
                      },
                    },
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






