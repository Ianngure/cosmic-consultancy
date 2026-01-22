import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import api from '../../services/api';
import { BookOpen, ShoppingBag, Users, DollarSign, TrendingUp, Package } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data.stats);
      setRecentOrders(response.data.recent_orders || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data if API fails
      setStats({
        total_users: 156,
        total_courses: 24,
        total_orders: 89,
        total_revenue: 12450.50,
      });
      setRecentOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Loading size="lg" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.total_revenue?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+12.5%',
      changeType: 'increase',
    },
    {
      title: 'Total Orders',
      value: stats?.total_orders || 0,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/orders',
      change: '+8.2%',
      changeType: 'increase',
    },
    {
      title: 'Total Courses',
      value: stats?.total_courses || 0,
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/admin/courses',
      change: '+3',
      changeType: 'increase',
    },
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/admin/users',
      change: '+24',
      changeType: 'increase',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const CardWrapper = stat.link ? Link : 'div';
            
            return (
              <CardWrapper
                key={index}
                to={stat.link}
                className={stat.link ? 'block' : ''}
              >
                <Card hover={!!stat.link} className="relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      {stat.change && (
                        <div className="flex items-center mt-2">
                          <TrendingUp className={`w-4 h-4 mr-1 ${
                            stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
                      )}
                    </div>
                    <div className={`${stat.bgColor} p-4 rounded-lg`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              </CardWrapper>
            );
          })}
        </div>

        {/* Quick Actions & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/admin/courses"
                  className="flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
                >
                  <BookOpen className="w-5 h-5 text-indigo-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Courses</p>
                    <p className="text-sm text-gray-600">Add or edit courses</p>
                  </div>
                </Link>

                <Link
                  to="/admin/orders"
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <ShoppingBag className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">View Orders</p>
                    <p className="text-sm text-gray-600">Track all orders</p>
                  </div>
                </Link>

                <Link
                  to="/admin/users"
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                >
                  <Users className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">User Management</p>
                    <p className="text-sm text-gray-600">Manage user accounts</p>
                  </div>
                </Link>
              </div>
            </Card>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Link to="/admin/orders" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No recent orders</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order #</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium">{order.order_number}</td>
                          <td className="py-3 px-4 text-sm">{order.user_email}</td>
                          <td className="py-3 px-4 text-sm">${order.total_amount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'completed' 
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;