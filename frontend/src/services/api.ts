import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const menuService = {
    getAllItems: async () => {
        const response = await api.get('/menu');
        return response.data;
    },
    getItemById: async (id: string) => {
        const response = await api.get(`/menu/${id}`);
        return response.data;
    },
};

export const orderService = {
    createOrder: async (orderData: any) => {
        const response = await api.post('/order', orderData);
        return response.data;
    },
    getOrders: async () => {
        const response = await api.get('/order');
        return response.data;
    },
    completeOrder: async (orderId: string) => {
        const response = await api.post('/complete-order', { orderId });
        return response.data;
    },
};

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

export const paymentService = {
    processPayment: async (paymentData: any) => {
        const response = await api.post('/payment', paymentData);
        return response.data;
    },
    checkCredit: async (userId: string) => {
        const response = await api.get(`/credit/${userId}`);
        return response.data;
    },
};

export const recommendationService = {
    getRecommendations: async (userId: string) => {
        const response = await api.get(`/reccomendation/${userId}`);
        return response.data;
    },
    getFoodRecommendations: async (preferences: any) => {
        const response = await api.post('/reccomend-food', preferences);
        return response.data;
    },
};

export const notificationService = {
    sendNotification: async (notificationData: any) => {
        const response = await api.post('/notifications', notificationData);
        return response.data;
    },
};

export default api; 