import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Cosmic Consultancy</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-indigo-600 transition">
              Courses
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;