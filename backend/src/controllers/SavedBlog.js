import express from 'express';
import Blog from '../models/BlogModel.js'; 
import SavedBlog from '../models/SavedModel.js'
import User from '../models/userModel.js';



   export const Saved = async (req, res) => {
  const { blogId, userId } = req.body;
  try {
   
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const existingSavedBlog = await SavedBlog.findOne({ blog: blogId, user: userId });
    if (existingSavedBlog) {
      return res.status(400).json({ message: "Blog already saved by this user" });
    }

   
    const savedBlog = new SavedBlog({
      blog: blogId,
      user: userId,
    });
    
    await savedBlog.save();
    
    blog.meta.favs += 1;
    await blog.save();

    return res.status(200).json({ message: "Blog saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
   };



    
   export  const SavedBlogGetByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const savedBlogs = await SavedBlog.find({ user: userId })
        .populate("blog") 
        .exec();
        
      if (!savedBlogs) {
        return res.status(404).json({ message: "No saved blogs found" });
      }
  
      return res.status(200).json({ savedBlogs });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };
  














