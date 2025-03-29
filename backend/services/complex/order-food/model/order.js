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

async function getOrder(uid, oid, restaurant) {
    try {
        const response = await axios.get(`http://order:6369/orders?oid=${oid}&uid=${uid}&restaurant=${restaurant}`)

        return response.data
    }
    catch (error) {
        console.error("Error getting Order history:", error.response ? error.response.data : error.message);
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

async function getCredits(uid) {

    try {

        const response = await axios.get(`https://personal-3mms7vqv.outsystemscloud.com/CreditMicroservice/rest/RESTAPI1/credit?UserId=${uid}`);

        return response.data;

    } catch (error) {
        console.error("Error updating status:", error.response ? error.response.data : error.message);
        throw error;
    }
}

async function useCredits(creditsContent) {

    const { uid, credit } = creditsContent

    try {

        const response = await axios.put(`https://personal-3mms7vqv.outsystemscloud.com/CreditMicroservice/rest/RESTAPI1/credit?userid=${uid}&credit=${credit}`);

        return response.data;

    } catch (error) {
        console.error("Error updating status:", error.response ? error.response.data : error.message);
        throw error;
    }

}

module.exports = {
    getAllOrders,
    getOrder,
    updateStatus,
    addOrder,
    useCredits,
    getCredits
};






