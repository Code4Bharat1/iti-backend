import Blog from "../models/Blog.js";
import Activity from "../models/Activity.js";

// Helper to log admin activities
const logActivity = async (adminId, action) => {
  await Activity.create({
    user: adminId,
    action,
    section: "blog"
  });
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blogs" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newBlog = new Blog({
      title,
      content,
      image,
      date,
      createdBy: req.admin._id,
    });

    await newBlog.save();

    // Save admin activity
    await Activity.create({
      user: req.admin.name || req.admin._id,
      action: 'added',
      section: 'blog',
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error adding blog:', err); // 👈 Log full error to backend console
    res.status(500).json({ error: 'Failed to add blog' }); // 👈 Send clear error
  }
};


export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

    await logActivity(req.admin._id, "updated");
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });

    await logActivity(req.admin._id, "deleted");
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
