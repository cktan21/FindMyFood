require('dotenv').config();
const axios = require("axios");

async function makeorder(userId, orderDetails) {
    try {
        const response = await axios.post(
            `https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order?userId=${userId}`, 
            orderDetails,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error making order:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = {
    makeorder
};






