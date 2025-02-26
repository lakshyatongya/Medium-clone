import mongoose from 'mongoose';
import Comment from '../models/CommentModel.js';
import Blog from '../models/BlogModel.js';
import User from '../models/userModel.js'

export const Comments = async (req, res) => {
  try {
    const { blogId, userId, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: 'Invalid blog ID format' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const newComment = new Comment({ blogId, userId, content });
    await newComment.save();

    return res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;


    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }


    const comments = await Comment.find({ blogId: blogId })
      .populate('userId', 'name');


    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
