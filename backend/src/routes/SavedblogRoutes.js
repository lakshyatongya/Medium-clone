import express from 'express';
import { Saved,  SavedBlogGetByUserId } from '../controllers/SavedBlog.js';

const router = express.Router();

router.post("/saveBlog", Saved);
router.get("/savedBlogs/:userId", SavedBlogGetByUserId)
export default router;