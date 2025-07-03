// controllers/admin/blogController.js

import Blog from '../models/Blog.js';
import Activity from '../models/Activity.js';

// Create a new blog
export const createBlog = async (req, res) => {
  const { title, image, content, date } = req.body;
  const adminId = req.adminId;

  try {
    const blog = await Blog.create({
      title,
      image,
      content,
      date: date || new Date(),
      createdBy: adminId,
    });

    await Activity.create({
      user: 'admin',
      action: 'created',
      section: 'blog',
      dateTime: new Date(),
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog', error: err.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: err.message });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, image, content, date } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, image, content, date },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await Activity.create({
      user: 'admin',
      action: 'updated',
      section: 'blog',
      dateTime: new Date(),
    });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog', error: err.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await Activity.create({
      user: 'admin',
      action: 'deleted',
      section: 'blog',
      dateTime: new Date(),
    });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog', error: err.message });
  }
};
