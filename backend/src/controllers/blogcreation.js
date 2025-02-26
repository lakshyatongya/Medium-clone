
import Blog from "../models/BlogModel.js";
import multer from "multer";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary"
import path from "path";

import Comment from "../models/CommentModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: "dtvh8ptix", 
  api_key: 182287918174542, 
  api_secret:"v_C0jEH-5wgPDQtYtaYCcB42E60", 
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "./uploads"), 
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   },
// });

// export const handleMultipartData = multer({
//   storage,
//   limits: { fileSize: 1000000 * 10 }, 
// }).single("image");


// export const BlogCreation = async (req, res) => {
//   let { title, description } = req.body;
//   const userId = req.params.userId;
//   console.log("res body", req.body.title)
//   handleMultipartData(req, res, async (err) => {
//     console.log("blogcreation", res.data);
//     console.log("err ==============", err)
    
//     if (err) {
//       return res.json({ msgs: err.message });
//     }

   
//     let { title, description } = req.body;
//     const userId = req.params.userId;

    
//     title = title?.trim();
//     description = description?.trim();


//     if (!title || !description || !req.file) {
//       return res.status(400).json({
//         status: 'FAILED',
//         message: 'Title, description, and image are required!',
//       });
//     }

 
//     const filePath = req.file.path;
//     if (!filePath) {
//       return res.status(400).json({
//         status: 'FAILED',
//         message: 'File path is missing!',
//       });
//     }

//     // try {
//     //   const result = await cloudinary.v2.uploader.upload(filePath);
//     //   const user = await User.findById(userId);
//     //   if (!user) {
//     //     return res.status(404).json({
//     //       status: 'FAILED',
//     //       message: 'User not found!',
//     //     });
//     //   }
//     const result = await cloudinary.v2.uploader.upload(filePath);
//     console.log(result);
//       const newBlog = new Blog({
//         title,
//         description,
//         image:result.url,
//         author: userId,
//       });

//       const savedBlog = await newBlog.save();
//       return res.status(201).json({
//         status: 'SUCCESS',
//         message: 'Blog created successfully.',
//         blog: savedBlog,
//       });


//     // } catch (err) {
//     //   console.error(err);
//     //   return res.status(500).json({
//     //     status: 'FAILED',
//     //     message: 'An error occurred while creating the blog.',
//     //   });
//     // }


//   });
// };




//-------------------------------------------------------------------------------------------------------------------------------------------//


export const BlogCreation = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.params.userId;

  if (!title || !description || !req.files || req.files.length === 0) {
    return res.status(400).json({
      status: 'FAILED',
      message: 'Title, description, and image are required!',
    });
  }

  const images = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const imageFile = req.files[i];
      if (!imageFile.buffer) {
        throw new Error(`Buffer for image ${i} is undefined.`);
      }

     
      const result = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          }
        ).end(imageFile.buffer); 
      });

      images.push({
        url: result.secure_url,
        caption: req.body[`caption${i}`] || '', 
      });
    }

    const newBlog = new Blog({
      title: title.trim(),
      description: description.trim(),
      images: images,
      author: userId,
    });

    const savedBlog = await newBlog.save();
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Blog created successfully.',
      blog: savedBlog,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    return res.status(500).json({
      status: 'FAILED',
      message: 'An error occurred while uploading images or creating the blog.',
    });
  }
};

export const BlogGet = async (req, res) => {
  const userId = req.params.userId;


  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: 'FAILED',
      message: 'Invalid user ID format.',
    });
  }

  try {
  
    const blogs = await Blog.find({ author: userId });

    if (blogs.length === 0) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'No blogs  for this user.',
        blogs:[]
      });
    }

    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Blogs fetch successfully.',
      blogs,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'FAILED',
      message: 'An error fetching blog',
    });
  }
};

export const AllBlogGet = async (req, res) => {
  try {
    const short ={createdAt: -1 }
    const allblogs = await Blog.find().sort(short);  
    if (allblogs.length === 0) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'No blogs found.',
      });
    }
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Blogs fetch successfully.',
      allblogs,
    });
  } catch (err) {
    console.error(' fetch - blogs:', err);
    return res.status(500).json({
      status: 'FAILED',
      message: 'An error fetching blog ',
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid blog ID format.' });
    }
    const blogDelete = await Blog.findByIdAndDelete(blogId);
    if (!blogDelete) {
      return res.status(404).json({ status: 'FAILED', message: 'Blog not found.' });
    }
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Blog delete successfully.',
      id: blogId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'FAILED',
      message: 'An error deleting the blog.',
    });
  }
};

  export const UpdateBlog = async (req, res) => {
    const blogId = req.params.id;
    const { title, description, image } = req.body;
  
  
    try {
      
      const blogupdate = await Blog.findOne({ _id: blogId });
  
      if (!blogupdate) {
        return res.status(404).json({ message: `Blog with id "${blogId}" not found.` });
      }
  
    
      if (!title || !description) {
        return res.status(422).json({ message: 'Both title and description are required' });
      }
  
    console.log("object",typeof blogId)
      const updatedBlog = await Blog.findByIdAndUpdate({ '_id': blogId}, { title ,description},{new: true});
  
      
  
      return res.status(200).json({ data: updatedBlog });
    } catch (error) {
      console.error("Error updating blog:", error);
      return res.status(500).json({ message: "An error occurred while updating the blog" });
    }
};
  
 export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;  
    const blog = await Blog.findById(blogId);  
   
    if (!blog) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Blog not found.',
      });
    }
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Blog fetched successfully.',
      blog,  
    });
  } catch (err) {
    console.error('Error fetching blog by ID:', err);
    return res.status(500).json({
      status: 'FAILED',
      message: 'An error occurred while fetching the blog.',
    });
  }
};









