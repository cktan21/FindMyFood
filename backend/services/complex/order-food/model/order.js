require('dotenv').config();
const axios = require("axios");

async function getAllOrders() {

    try {

        const response = await axios.get(`http://order:6369/orders`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting all orders:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function getUserOrders(uid) {

    try {

        const response = await axios.get(`http://order:6369/orders?uid=${uid}`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting user order history:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function getOrder(oid) {

    try {

        const response = await axios.get(`http://order:6369/orders?oid=${oid}`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting order:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function getRestaurantOrders(restaurant) {

    try {

        const response = await axios.get(`http://order:6369/orders?restaurant=${restaurant}`);

        return response.data;
        
    } catch (error) {
        console.error("Error getting Restaurant order history:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function updateStatus(oid, status) {

    try {

        const response = await axios.put(`http://order:6369/update/${oid}/${status}`);

        return response.data;
        
    } catch (error) {
        console.error("Error updating status:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

async function addOrder(orderContent) {

    try {

        const response = await axios.post(`http://order:6369/add`, orderContent);

        return response.data;
        
    } catch (error) {
        console.error("Error updating status:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}

module.exports = {
    getAllOrders,
    getUserOrders,
    getOrder,
    getRestaurantOrders,
    updateStatus,
    addOrder
};






