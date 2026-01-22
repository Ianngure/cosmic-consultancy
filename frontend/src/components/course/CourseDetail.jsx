import React from 'react';
import { CheckCircle, Clock, BarChart, Award } from 'lucide-react';
import Card from '../common/Card';

const CourseDetail = ({ course }) => {
  return (
    <div className="space-y-6">
      {/* Main Info */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded font-medium">
            {course.category}
          </span>
          <span className="text-4xl font-bold text-indigo-600">${course.price}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>

        <div className="flex items-center space-x-6 text-gray-600 mb-6">
          {course.difficulty_level && (
            <div className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              <span className="capitalize">{course.difficulty_level}</span>
            </div>
          )}
          {course.estimated_duration && (
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{course.estimated_duration}</span>
            </div>
          )}
          {course.document_count > 0 && (
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              <span>{course.document_count} Resources</span>
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-3">About This Course</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{course.description}</p>
        </div>
      </Card>

      {/* What You'll Learn */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Access to all course materials and resources</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Lifetime access to course content</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Downloadable documents and guides</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Certificate of completion</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default CourseDetail;