import api from './api';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (publishable key from environment)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const paymentService = {
  // Create order
  createOrder: async (courseIds) => {
    try {
      const response = await api.post('/orders/create', {
        course_ids: courseIds,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create payment intent
  createPaymentIntent: async (orderId) => {
    try {
      const response = await api.post('/payments/create-intent', {
        order_id: orderId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId) => {
    try {
      const response = await api.post('/payments/confirm', {
        payment_intent_id: paymentIntentId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get order details
  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's orders
  getMyOrders: async () => {
    try {
      const response = await api.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Process checkout with Stripe
  processCheckout: async (orderId, paymentMethodId) => {
    try {
      // Create payment intent
      const { client_secret } = await paymentService.createPaymentIntent(orderId);

      // Get Stripe instance
      const stripe = await stripePromise;

      // Confirm payment
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: paymentMethodId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Confirm on backend
      await paymentService.confirmPayment(result.paymentIntent.id);

      return {
        success: true,
        paymentIntentId: result.paymentIntent.id,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get Stripe instance (for Elements)
  getStripe: async () => {
    return await stripePromise;
  },
};

export default paymentService;