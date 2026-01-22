import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';

// Public Pages
import Home from '../pages/Home';
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

// Protected Pages
import Profile from '../pages/Profile';
import MyCourses from '../pages/MyCourses';
import Checkout from '../pages/Checkout';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import CourseManagement from '../pages/admin/CourseManagement';
import OrderManagement from '../pages/admin/OrderManagement';
import UserManagement from '../pages/admin/UserManagement';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;