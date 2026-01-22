import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{user?.first_name} {user?.last_name}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-semibold capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;