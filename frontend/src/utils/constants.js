export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
export const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const CATEGORIES = [
  'Business',
  'Technology',
  'Marketing',
  'Design',
  'Finance',
  'Personal Development',
];

export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'];

export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:slug',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  MY_COURSES: '/my-courses',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_ORDERS: '/admin/orders',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};