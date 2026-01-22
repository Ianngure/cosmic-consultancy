import React from 'react';
import CourseCard from './CourseCard';
import Loading from '../common/Loading';

const CourseList = ({ courses, loading, onAddToCart }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading size="lg" text="Loading courses..." />
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No courses found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default CourseList;