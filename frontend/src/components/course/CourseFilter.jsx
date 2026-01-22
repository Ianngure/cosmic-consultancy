import React from 'react';
import { Search } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const CourseFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Card className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="search"
            placeholder="Search courses..."
            value={filters.search || ''}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <select
          name="category"
          value={filters.category || ''}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option value="Business">Business</option>
          <option value="Technology">Technology</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Finance">Finance</option>
          <option value="Personal Development">Personal Development</option>
        </select>

        {/* Difficulty */}
        <select
          name="difficulty"
          value={filters.difficulty || ''}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Clear Filters */}
        <Button variant="secondary" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    </Card>
  );
};

export default CourseFilter;