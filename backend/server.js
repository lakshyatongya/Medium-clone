import express from 'express';
import bodyParser from 'body-parser';
import mongodb from "./src/config/db.js"
import cors from 'cors';
import UserRouter from './src/routes/userRoutes.js';
import BlogRoutes from './src/routes/blogRoutes.js'
import CommentRouter from './src/routes/CommentRoutes.js';
import SavedRoutes from './src/routes/SavedblogRoutes.js';
import ListRoutes from './src/routes/ListRoutes.js'


const app = express();
const PORT = process.env.PORT || 3000;
mongodb();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/Comment', CommentRouter)
app.use('/user', UserRouter);
app.use('/blog', BlogRoutes);
app.use('/saved',SavedRoutes);
app.use('/lists',ListRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
