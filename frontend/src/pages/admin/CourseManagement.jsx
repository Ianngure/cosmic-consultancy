import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import courseService from '../../services/courseService';
import { Plus, Edit, Trash2, Upload, DollarSign } from 'lucide-react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    price: '',
    category: '',
    difficulty_level: 'beginner',
    estimated_duration: '',
    is_active: true,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses({ per_page: 100 });
      setCourses(data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, formData);
      } else {
        await courseService.createCourse(formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course. Please try again.');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      slug: course.slug,
      description: course.description,
      short_description: course.short_description || '',
      price: course.price,
      category: course.category || '',
      difficulty_level: course.difficulty_level || 'beginner',
      estimated_duration: course.estimated_duration || '',
      is_active: course.is_active,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await courseService.deleteCourse(courseId);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      short_description: '',
      price: '',
      category: '',
      difficulty_level: 'beginner',
      estimated_duration: '',
      is_active: true,
    });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Loading size="lg" text="Loading courses..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-1">Create and manage your courses</p>
          </div>
          <Button onClick={openCreateModal} className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Course
          </Button>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-600 mb-4">No courses yet. Create your first course!</p>
            <Button onClick={openCreateModal}>
              <Plus className="w-5 h-5 mr-2" />
              Create Course
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="relative">
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.is_active 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {course.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 pr-20">{course.title}</h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {course.short_description || course.description}
                </p>

                <div className="space-y-2 mb-4">
                  {course.category && (
                    <p className="text-sm">
                      <span className="text-gray-500">Category:</span>{' '}
                      <span className="font-medium">{course.category}</span>
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="text-gray-500">Price:</span>{' '}
                    <span className="font-bold text-indigo-600">${course.price}</span>
                  </p>
                  {course.difficulty_level && (
                    <p className="text-sm">
                      <span className="text-gray-500">Level:</span>{' '}
                      <span className="capitalize">{course.difficulty_level}</span>
                    </p>
                  )}
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(course)}
                    className="flex-1 flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                    className="flex-1 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingCourse ? 'Edit Course' : 'Create New Course'}
          size="lg"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Course Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., Advanced Marketing Strategies"
              />

              <Input
                label="Slug (URL-friendly)"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                placeholder="advanced-marketing-strategies"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Brief overview (displayed on course cards)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Detailed course description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  icon={DollarSign}
                  placeholder="99.99"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Finance">Finance</option>
                    <option value="Personal Development">Personal Development</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty_level"
                    value={formData.difficulty_level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <Input
                  label="Estimated Duration"
                  name="estimated_duration"
                  value={formData.estimated_duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 4 weeks"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                  Make course active (visible to users)
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingCourse ? 'Update Course' : 'Create Course'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CourseManagement;