import axios from 'axios';

// if you ever face an error simply just delete the .data

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

    getOrdersByFilter: async (userId: string, orderId: string, restaurant: string ) => {
        const response = await api.get(`/order-food/graborder/user/uid=${userId}&restaurant=${restaurant}&oid=${orderId}`);
        return response.data;
    },

    cancelOrder: async (orderId: string, restaurant: string) => {
        const response = await api.put(`/order-food/order/cancel/${orderId}/${restaurant}`);
        return response.data;
    },

    addOrder: async (orderData: any) => {
        const response = await api.post('/order-food/order/addorder', orderData);
        return response;
    }
};

export const Credits = {
    getUserCredits: async (userId: string) => {
        const response = await api.get(`/order-food/credits/${userId}`);
        return response.data;
    },
}

export const Queue = {
    getAllQueue: async () => {
        const response = await api.get('/queue/qStatus');
        return response.data;
    }
}

export const Payment = {
    healthCheck: async () => {
        const response = await api.get('/order-food');
        return response.data;
    },
    createCheckout: async (data: any) => {
        const response = await api.post('/payment/create-checkout-session', data)
        return response
    },
    sessionStatus: async (sessionId: string) => {
        const response = await api.get(`/payment/session-status?session_id=${sessionId}`)
        return response
    }
    
}


// Complete Order Service (Routed through Kong)
export const completeOrder = {
    healthCheck: async () => {
        const response = await api.get('/complete-order');
        return response.data;
    },
    completeOrder: async (orderId: string, orderData: any) => {
        const response = await api.post(`/complete-order/${orderId}/completed`, orderData);
        return response.data;
    },
    cancelOrder: async (orderId: string, orderData: any) => {
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
    getChatGPTRecommendations: async (userId: string) => {
        const response = await api.post(`/reccomend-food/chatgpt/${userId}`);
        return response.data;
    },
};

// these die die have to have .data
export const Menu = {
    getAllMenuItems: async () => {
        const response = await api.get('/menu/all');
        return response.data;
    },
    getMenuRestraunt: async (restraunt: string) =>  {
        const response = await api.get(`/menu/${restraunt}`);
        return response.data;      
    }
    
}


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