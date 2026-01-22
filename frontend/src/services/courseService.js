import api from './api';

export const courseService = {
  // Public endpoints
  getAllCourses: async (params = {}) => {
    try {
      const response = await api.get('/courses/', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getCourseBySlug: async (slug) => {
    try {
      const response = await api.get(`/courses/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Protected endpoints
  getMyCourses: async () => {
    try {
      const response = await api.get('/courses/my-courses');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  checkCourseAccess: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/check-access`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin endpoints
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses/admin/courses', courseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/courses/admin/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/courses/admin/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  uploadDocument: async (courseId, file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      const response = await api.post(
        `/courses/admin/courses/${courseId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteDocument: async (courseId, documentId) => {
    try {
      const response = await api.delete(
        `/courses/admin/courses/${courseId}/documents/${documentId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default courseService;