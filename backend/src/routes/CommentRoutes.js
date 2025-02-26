


import express from 'express';
import { Comments, getComments } from '../controllers/Comment.js';

const router = express.Router();


router.post('/add', Comments);

router.get('/comments/:blogId', getComments);

export default router;
