import React, { useState } from 'react';
import { FiEdit2, FiCalendar, FiUser, FiTrash2, FiHeart, FiMessageSquare } from 'react-icons/fi';

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with Indoor Plants',
      content: 'Indoor plants can transform your living space. Start with low-maintenance plants like snake plants or pothos...',
      author: 'PlantLover42',
      date: '2023-05-15',
      likes: 24,
      comments: 5,
      category: 'Beginner Guides'
    },
    {
      id: 2,
      title: 'The Ultimate Watering Guide',
      content: 'Watering is the most common area where plant owners make mistakes. Learn how to properly water different types of plants...',
      author: 'GreenThumb99',
      date: '2023-05-10',
      likes: 42,
      comments: 12,
      category: 'Care Tips'
    }
  ]);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Care Tips');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePost = () => {
    if (title && content) {
      const newBlog = { 
        id: Date.now(),
        title, 
        content, 
        author: 'CurrentUser',
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0,
        category
      };
      setBlogs([newBlog, ...blogs]);
      setTitle('');
      setContent('');
      setCategory('Care Tips');
    }
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleLike = (id) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
    ));
  };

  const filteredBlogs = blogs
    .filter(blog => 
      activeTab === 'all' || blog.category === activeTab
    )
    .filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const categories = ['All', 'Beginner Guides', 'Care Tips', 'Plant Species', 'Troubleshooting'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">Plant Care Blog</h1>
            <p className="text-green-600">Share your plant journey and learn from others</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-10 pr-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeTab === (cat === 'All' ? 'all' : cat) ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
              onClick={() => setActiveTab(cat === 'All' ? 'all' : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Creation Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <FiEdit2 className="mr-2" /> Create New Post
          </h2>
          <input
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Title of your blog post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 mb-4 border border-green-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Share your plant knowledge or experience..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <select
              className="p-2 mb-2 sm:mb-0 border border-green-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Beginner Guides">Beginner Guides</option>
              <option value="Care Tips">Care Tips</option>
              <option value="Plant Species">Plant Species</option>
              <option value="Troubleshooting">Troubleshooting</option>
            </select>
            <button
              onClick={handlePost}
              className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-colors flex items-center"
              disabled={!title || !content}
            >
              <FiEdit2 className="mr-2" /> Publish Post
            </button>
          </div>
        </div>

        {/* Blog Posts */}
        <div>
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-green-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No blog posts found</h3>
              <p className="text-gray-500">Try a different search or category</p>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-green-100 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {blog.category}
                    </span>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">{blog.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiUser className="mr-1" /> {blog.author}
                    <FiCalendar className="ml-3 mr-1" /> {blog.date}
                  </div>
                  <p className="text-gray-700 mb-4">{blog.content}</p>
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleLike(blog.id)}
                      className="flex items-center text-gray-500 hover:text-green-600 mr-4 transition-colors"
                    >
                      <FiHeart className="mr-1" /> {blog.likes}
                    </button>
                    <div className="flex items-center text-gray-500">
                      <FiMessageSquare className="mr-1" /> {blog.comments} comments
                    </div>
                    <a 
                      href="#"
                      className="ml-auto text-green-600 hover:text-green-800 font-medium transition-colors"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;