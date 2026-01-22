import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Clock } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const CourseCard = ({ course, onAddToCart }) => {
  return (
    <Card hover className="overflow-hidden p-0">
      {/* Thumbnail */}
      {course.thumbnail_url ? (
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-5xl font-bold">{course.title.charAt(0)}</span>
        </div>
      )}

      <div className="p-6">
        {/* Category & Level */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded font-medium">
            {course.category || 'General'}
          </span>
          {course.difficulty_level && (
            <span className="text-xs text-gray-500 capitalize">{course.difficulty_level}</span>
          )}
        </div>

        {/* Title */}
        <Link to={`/courses/${course.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.short_description || course.description}
        </p>

        {/* Duration */}
        {course.estimated_duration && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.estimated_duration}</span>
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-2xl font-bold text-indigo-600">${course.price}</span>
          <div className="flex space-x-2">
            <Link to={`/courses/${course.slug}`}>
              <Button variant="secondary" size="sm">
                Details
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={() => onAddToCart(course)}
              className="flex items-center"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;