import { useState, useEffect } from 'react';
import courseService from '../services/courseService';

export const useCourses = (initialFilters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseService.getAllCourses(filters);
      setCourses(data.courses);
      setPagination({
        page: data.current_page,
        pages: data.pages,
        total: data.total,
      });
    } catch (err) {
      setError(err);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return { 
    courses, 
    loading, 
    error, 
    filters, 
    setFilters: updateFilters, 
    pagination, 
    refetch: fetchCourses 
  };
};

export default useCourses;