import api from './api';

export const orderService = {
  createOrder: async (courseIds) => {
    const response = await api.post('/orders/create', { 
      course_ids: courseIds 
    });
    return response.data;
  },

  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  getMyOrders: async (params = {}) => {
    const response = await api.get('/orders/my-orders', { params });
    return response.data;
  },

  getAllOrders: async (params = {}) => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/admin/orders/${orderId}`, { status });
    return response.data;
  },
};

export default orderService;