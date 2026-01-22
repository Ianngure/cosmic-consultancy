import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, BookOpen, Award } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-indigo-600" />,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of real-world experience.',
    },
    {
      icon: <Award className="w-12 h-12 text-indigo-600" />,
      title: 'Premium Content',
      description: 'Access high-quality, comprehensive course materials and resources.',
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: 'Proven Results',
      description: 'Join thousands of successful professionals who have transformed their careers.',
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-indigo-600" />,
      title: 'Lifetime Access',
      description: 'Get unlimited access to your purchased courses, anytime, anywhere.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      content: 'Cosmic Consultancy transformed how I approach strategy. The courses are practical, actionable, and worth every penny.',
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Tech Entrepreneur',
      content: 'The quality of content and depth of knowledge is unmatched. Highly recommend for anyone serious about growth.',
      avatar: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      content: 'I\'ve taken multiple courses and each one has directly improved my skills and confidence at work.',
      avatar: 'ER',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Career with Expert Knowledge
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Premium courses and consulting services from Cosmic Consultancy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition border-2 border-white"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions tailored to your professional growth
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Digital Courses</h3>
              <p className="text-gray-700 mb-4">
                Self-paced, comprehensive courses with lifetime access. Learn at your own speed with expert-created content.
              </p>
              <Link to="/courses" className="text-indigo-600 font-semibold hover:text-indigo-700">
                View Courses →
              </Link>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Strategy Consulting</h3>
              <p className="text-gray-700 mb-4">
                One-on-one consulting sessions to address your specific business challenges and opportunities.
              </p>
              <a href="#contact" className="text-purple-600 font-semibold hover:text-purple-700">
                Contact Us →
              </a>
            </div>
            <div className="bg-pink-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Corporate Training</h3>
              <p className="text-gray-700 mb-4">
                Customized training programs for teams and organizations looking to upskill their workforce.
              </p>
              <a href="#contact" className="text-pink-600 font-semibold hover:text-pink-700">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of professionals who have accelerated their careers
          </p>
          <Link
            to="/courses"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition inline-block"
          >
            Explore Courses
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;