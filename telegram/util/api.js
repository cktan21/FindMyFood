// util/api.js
import axios from 'axios';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

// Base URL for Kong API Gateway
const KONG_BASE_URL = process.env.KONG_BASE_URL || 'http://localhost:8000';
console.log('KONG_BASE_URL:', KONG_BASE_URL);

// Axios instance for Kong API Gateway
const api = axios.create({
  baseURL: KONG_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Socket.IO client setup
const SOCKET_IO_URL = process.env.SOCKET_IO_URL || 'http://localhost:3300';
const socket = io(SOCKET_IO_URL);

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server');
});
socket.on('connect_error', (error) => {
  console.error('❌ Socket.IO connection error:', error);
});

// Notification stream
const notificationSubject = new Subject();
export function listenForNotifications() {
  socket.on('notification', (data) => {
    notificationSubject.next(data);
  });
  return notificationSubject.asObservable();
}

// Queue stream
const queueAllSubject = new Subject();
export function ioAllQueue() {
  socket.on('receivedAllQueue', (data) => {
    queueAllSubject.next(data);
  });
  return queueAllSubject.asObservable();
}

// Order-Food service (via Kong)
export const orderFood = {
  healthCheck: async () => {
    const res = await api.get('/order-food');
    return res.data;
  },

  getAllOrders: async () => {
    const res = await api.get('/order-food/order/all');
    return res.data;
  },

  getOrdersByFilter: async (userId, orderId, restaurant) => {
    const params = new URLSearchParams();
    if (userId)    params.set('uid', userId);
    if (orderId)   params.set('oid', orderId);
    if (restaurant) params.set('restaurant', restaurant);
    const res = await api.get(`/order-food/order/graborder?${params.toString()}`);
    return res.data;
  },

  cancelOrder: async (orderId, restaurant) => {
    const res = await api.put(`/order-food/order/cancel/${orderId}/${restaurant}`);
    return res.data;
  },

  addOrder: async (orderData) => {
    const res = await api.post('/order-food/order/addorder', orderData);
    return res.data;
  },
};

export const Credits = {
  getUserCredits: async (userId) => {
    const res = await api.get(`/order-food/order/credits/${userId}`);
    return res.data;
  },
};

export const Queue = {
  getRestaurantQueue: async (restaurant) => {
    const res = await api.get(`/queue/${restaurant}`);
    return res.data;
  },

  getAllQueue: async () => {
    const res = await api.get('/queue/all');
    return res.data;
  },
};

export const Payment = {
  healthCheck: async () => {
    const res = await api.get('/order-food');
    return res.data;
  },

  createCheckout: async (data) => {
    const res = await api.post('/payment/create-checkout-session', data);
    return res.data;
  },

  sessionStatus: async (sessionId) => {
    const res = await api.get(`/payment/session-status?session_id=${sessionId}`);
    return res.data;
  },
};

export const completeOrder = {
  healthCheck: async () => {
    const res = await api.get('/complete-order');
    return res.data;
  },

  completeOrder: async (orderId, orderData) => {
    const res = await api.post(`/complete-order/${orderId}/completed`, orderData);
    return res.data;
  },

  cancelOrder: async (orderId, orderData) => {
    const res = await api.post(`/complete-order/${orderId}/cancelled`, orderData);
    return res.data;
  },
};

export const recommendFood = {
  healthCheck: async () => {
    const res = await api.get('/reccomend-food');
    return res.data;
  },

  getChatGPTRecommendations: async (userId) => {
    const res = await api.post(`/reccomend-food/chatgpt/${userId}`);
    return res.data;
  },
};

export const Menu = {
  getAllMenuItems: async () => {
    const res = await api.get('/menu/all');
    return res.data;
  },

  getMenuByRestaurant: async (restaurant) => {
    const res = await api.get(`/menu/${restaurant}`);
    return res.data;
  },
};

export default api;
