import express from 'express';
import multer from 'multer';
import { AllBlogGet, BlogCreation, BlogGet,deleteBlog,getBlogById ,UpdateBlog} from '../controllers/blogcreation.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/:userId/create', upload.array('images'), BlogCreation); 
router.post('/:userId/create', BlogCreation);
router.get('/:userId/blogs', BlogGet);
router.get('/getAllblogs', AllBlogGet);
router.delete('/deleteBlog/:id',deleteBlog )
router.put('/blogupdate/:id', upload.single('image'),UpdateBlog)
router.get('/getBlogById/:id',getBlogById)
export default router;
