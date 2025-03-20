require('dotenv').config();
const axios = require("axios");

async function getAllOrders() {

    try {

        const response = await axios.get(`http://order:6369/orders`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting order history:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function getUserOrders(uid) {

    try {

        const response = await axios.get(`http://order:6369/orders/uid=${uid}`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting order history:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function getOrder(oid) {

    try {

        const response = await axios.get(`http://order:6369/orders?oid=${oid}`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting order history:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function getRestaurantOrders(restaurant) {

    try {

        const response = await axios.get(`http://order:6369/orders?restaurant=${restaurant}`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting order history:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

module.exports = {
    getAllOrders,
    getUserOrders,
    getOrder,
    getRestaurantOrders
};






