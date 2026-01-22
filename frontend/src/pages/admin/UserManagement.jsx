import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import api from '../../services/api';
import { Search, UserCheck, UserX, Mail, Calendar, Shield } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        per_page: 20,
        ...(searchTerm && { search: searchTerm }),
        ...(roleFilter && { role: roleFilter }),
      };

      const response = await api.get('/admin/users', { params });
      setUsers(response.data.users);
      setPagination({
        page: response.data.current_page || 1,
        pages: response.data.pages || 1,
        total: response.data.total || response.data.users.length,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this user?`)) {
      return;
    }

    try {
      await api.put(`/admin/users/${userId}`, {
        is_active: !currentStatus,
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
  };

  const changeUserRole = async (userId, newRole) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      await api.put(`/admin/users/${userId}`, {
        role: newRole,
      });
      fetchUsers();
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Loading size="lg" text="Loading users..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            {pagination.total} total users
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </Card>

        {/* Users Grid */}
        {users.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-600">No users found</p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card key={user.id} hover>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                        {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">
                          {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      {user.is_active ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-2 text-green-600" />
                          <span className="text-green-600">Active</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4 mr-2 text-red-600" />
                          <span className="text-red-600">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewUserDetails(user)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      variant={user.is_active ? 'danger' : 'success'}
                      size="sm"
                      onClick={() => toggleUserStatus(user.id, user.is_active)}
                      className="flex-1"
                    >
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages}
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* User Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="User Details"
          size="lg"
        >
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-2xl">
                  {selectedUser.first_name?.charAt(0)}{selectedUser.last_name?.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h2>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Role</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedUser.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {selectedUser.role}
                    </span>
                    {selectedUser.role !== 'admin' && (
                      <Button
                        size="sm"
                        onClick={() => changeUserRole(selectedUser.id, 'admin')}
                      >
                        Make Admin
                      </Button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedUser.is_active 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedUser.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Member Since</p>
                  <p className="font-semibold">
                    {new Date(selectedUser.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Email Verified</p>
                  <p className="font-semibold">
                    {selectedUser.email_verified ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t">
                <Button
                  variant={selectedUser.is_active ? 'danger' : 'success'}
                  onClick={() => {
                    toggleUserStatus(selectedUser.id, selectedUser.is_active);
                    setIsModalOpen(false);
                  }}
                  className="flex-1"
                >
                  {selectedUser.is_active ? 'Deactivate User' : 'Activate User'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default UserManagement;