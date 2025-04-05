import axios from 'axios';

// Base URL for Kong API Gateway
const KONG_BASE_URL = import.meta.env.VITE_KONG_BASE_URL || 'http://localhost:8000';

// Axios instance for Kong API Gateway
const api = axios.create({
    baseURL: KONG_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



// Order Food Service (Routed through Kong)
export const orderFood = {
    healthCheck: async () => {
        const response = await api.get('/order-food');
        return response.data;
    },
    getAllOrders: async () => {
        const response = await api.get('/order-food/order/all');
        return response.data;
    },
    getOrdersByUser: async (userId: string) => {
        const response = await api.get(`/order-food/graborder/user/uid=${userId}`);
        return response.data;
    },
    getOrdersByRestaurant: async (restaurant: string) => {
        const response = await api.get(`/order-food/graborder/restaurant=${restaurant}`);
        return response.data;
    },
    getOrdersByReceipt: async (orderId: string) => {
        const response = await api.get(`/order-food/graborder/oid=${orderId}`);
        return response.data;
    },
    getUserCredits: async (userId: string) => {
        const response = await api.get(`/order-food/credits/${userId}`);
        return response.data;
    },
    cancelOrder: async (orderId: string, restaurant: string) => {
        const response = await api.put(`/order-food/order/cancel/${orderId}/${restaurant}`);
        return response.data;
    },
    addOrder: async (orderData: JSON) => {
        const response = await api.post('/order-food/order/addorder', orderData);
        return response.data;
    },
    // getQueue: async () => {
    //     const response = await api.get()
    // }
};

// Complete Order Service (Routed through Kong)
export const completeOrder = {
    healthCheck: async () => {
        const response = await api.get('/complete-order');
        return response.data;
    },
    completeOrder: async (orderId: string, orderData: JSON) => {
        const response = await api.post(`/complete-order/${orderId}/completed`, orderData);
        return response.data;
    },
    cancelOrder: async (orderId: string, orderData: JSON) => {
        const response = await api.post(`/complete-order/${orderId}/cancelled`, orderData);
        return response.data;
    },
};

// Recommend Food Service (Routed through Kong)
export const recommendFood = {
    healthCheck: async () => {
        const response = await api.get('/reccomend-food');
        return response.data;
    },
    getUserOrders: async (userId: string) => {
        const response = await api.get(`/reccomend-food/order/${userId}`);
        return response.data;
    },
    getUserRecommendation: async (userId: string) => {
        const response = await api.get(`/reccomend-food/reccomendation/${userId}`);
        return response.data;
    },
    getAllMenuItems: async () => {
        const response = await api.get('/reccomend-food/menu');
        return response.data;
    },
    getChatGPTRecommendations: async (userId: string) => {
        const response = await api.post(`/reccomend-food/chatgpt/${userId}`);
        return response.data;
    },
};

// Queue Service (Routed through Kong)
export const queueService = {
    addToQueue: async (data: any) => {
        const response = await api.post('/queue/add', data);
        return response.data;
    },
    removeFromQueue: async (data: any) => {
        const response = await api.post('/queue/delete', data);
        return response.data;
    },
    getAllQueues: async () => {
        const response = await api.post('/queue/all');
        return response.data;
    },
};

export default api;