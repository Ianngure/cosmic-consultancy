import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';
import { ShoppingCart, CheckCircle } from 'lucide-react';

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    try {
      const data = await courseService.getCourseBySlug(slug);
      setCourse(data);
      
      if (isAuthenticated()) {
        const accessData = await courseService.checkCourseAccess(data.id);
        setHasAccess(accessData.has_access);
      }
    } catch (err) {
      console.error('Error loading course:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {course.thumbnail_url && (
            <img src={course.thumbnail_url} alt={course.title} className="w-full h-96 object-cover" />
          )}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded">{course.category}</span>
              <span className="text-3xl font-bold text-indigo-600">${course.price}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6 whitespace-pre-wrap">{course.description}</p>
            
            {course.estimated_duration && (
              <p className="text-gray-600 mb-6">Duration: {course.estimated_duration}</p>
            )}
            
            {hasAccess ? (
              <div className="flex items-center text-green-600 mb-6">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span className="font-semibold">You own this course</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  const result = addToCart(course);
                  if (result.success) navigate('/checkout');
                  else alert(result.message);
                }}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 flex items-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;