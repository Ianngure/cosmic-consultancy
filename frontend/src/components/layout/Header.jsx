import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Menu, X, ShoppingCart, User, LogOut, BookOpen, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getItemCount, toggleCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Cosmic Consultancy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-indigo-600 transition">
              Courses
            </Link>

            {isAuthenticated() ? (
              <>
                <Link to="/my-courses" className="text-gray-700 hover:text-indigo-600 transition">
                  My Courses
                </Link>
                {isAdmin() && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    Admin
                  </Link>
                )}
                
                {/* Cart */}
                <button
                  onClick={toggleCart}
                  className="relative text-gray-700 hover:text-indigo-600 transition"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </button>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition"
                  >
                    <User className="w-5 h-5 mr-1" />
                    {user?.first_name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-red-600 transition"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={toggleCart}
                  className="relative text-gray-700 hover:text-indigo-600 transition"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </button>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </Link>

              {isAuthenticated() ? (
                <>
                  <Link
                    to="/my-courses"
                    className="text-gray-700 hover:text-indigo-600 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Courses
                  </Link>
                  {isAdmin() && (
                    <Link
                      to="/admin/dashboard"
                      className="text-gray-700 hover:text-indigo-600 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-indigo-600 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;