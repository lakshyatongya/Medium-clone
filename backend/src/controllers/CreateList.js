
import express from 'express';
import mongoose from 'mongoose';
import CreateList from "../models/ListModel.js";
import SavedBlog from "../models/SavedModel.js";
import User from "../models/userModel.js";
import Blog from '../models/BlogModel.js';


// export const CreatedList = async (req, res) => {
//   const { listname, description, userId } = req.body;

//   if (!listname || !userId) {
//     return res.status(400).json({ error: "List name and User are required." });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     const pureList = new CreateList({
//       listname,
//       description,
//       user: userId,
//     });

//     await pureList.save();
//     res.status(201).json(pureList);  
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong creating the list." });
//   }
// };



// export const blogsavedinlist = async (req, res) => {
//     const { blogId } = req.body;
//     const { listId } = req.params;

//     if (!blogId) {
//       return res.status(400).json({ error: "Blog ID is required." });
//     }

//     try {

//       const list = await CreateList.findById(listId);

//       if (!list) {
//         return res.status(404).json({ error: "List not found." });
//       }


//       const blog = await Blog.findById(blogId);
//       if (!blog) {
//         return res.status(404).json({ error: "Blog not found." });
//       }


//       const isBlogAlreadySaved = list.savedBlog.some(item => item.blog.toString() === blogId);

//       if (isBlogAlreadySaved) {
//         return res.status(400).json({ message: "This blog is already saved to the list." });
//       }


//       list.savedBlog.push({
//         blog: blogId,
//         listId: list._id
//       });

//       await list.save();

//       res.status(201).json({ message: "Blog saved to the list!" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Something went wrong while saving the blog." });
//     }
// };


// export const listgetbyuserid = async (req, res) => {
//   const { userId } = req.params; 

//   if (!userId) {
//     return res.status(400).json({ error: "User ID is required." });
//   }


//   try {

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid User ID format." });
//     }

//     const lists = await CreateList.find({ user: new mongoose.Types.ObjectId(userId) })
//       .populate("savedBlog.blog");


//     if (lists.length === 0) {
//       return res.status(404).json({ error: "No lists found for this user." });
//     }


//     res.status(200).json(lists);
//   } catch (error) {
//     console.error("Error fetching lists:", error);  
//     res.status(500).json({ error: "Something went wrong while fetching lists." });
//   }
// };

// export const blogsavedinlist = async (req, res) => {
//   const { blogId, listIds } = req.body;  // listIds should be an array

//   if (!blogId) {
//     return res.status(400).json({ error: "Blog ID is required." });
//   }

//   // If listIds is not provided, default to a single list with listId from params
//   const listsToSave = listIds || [req.params.listId];

//   try {
//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return res.status(404).json({ error: "Blog not found." });
//     }

//     for (const listId of listsToSave) {
//       const list = await CreateList.findById(listId);

//       if (!list) {
//         return res.status(404).json({ error: `List with ID ${listId} not found.` });
//       }

//       const isBlogAlreadySaved = list.savedBlog.some(item => item.blog.toString() === blogId);

//       if (isBlogAlreadySaved) {
//         // If blog is already saved in this list, skip and continue
//         continue;
//       }

//       // Add the blog to the list
//       list.savedBlog.push({
//         blog: blogId,
//         listId: list._id
//       });

//       // Save the list after adding the blog
//       await list.save();
//     }

//     res.status(201).json({ message: "Blog saved to the lists!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong while saving the blog." });
//   }
// };


export const CreatedList = async (req, res) => {
  const { listname, description, userId } = req.body;

  if (!listname || !userId) {
    return res.status(400).json({ error: "List name and User are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    let existReadingList = await CreateList.findOne({
      user: userId,
      listname: 'reading',
    });

    if (!existReadingList) {
      const defaultReadingList = new CreateList({
        listname: 'Reading',
        description: 'Your default reading list.',
        user: userId,
        isDefault: true,
        isChecked: true, 
      });
      await defaultReadingList.save();
      return res.status(201).json(defaultReadingList);
    }

    const newList = new CreateList({
      listname,
      description,
      user: userId,
     
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong creating the list." });
  }
};
export const blogsavedinlist = async (req, res) => {
  const { blogId, listIds } = req.body;

  if (!blogId) {
    return res.status(400).json({ error: "Blog ID is required." });
  }


  const listsToSave = listIds || [req.params.listId];

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    for (const listId of listsToSave) {
      const list = await CreateList.findById(listId);

      if (!list) {
        return res.status(404).json({ error: `List with ID ${listId} not found.` });
      }

      const isBlogAlreadySaved = list.savedBlog.some(item => item.blog.toString() === blogId);

      if (isBlogAlreadySaved) {
        continue;
      }

      list.savedBlog.push({
        blog: blogId,
        listId: list._id
      });

      await list.save();
    }

    res.status(201).json({ message: "Blog saved to the lists!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while saving the blog." });
  }
};

export const listgetbyuserid = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    let lists = await CreateList.find({ user: new mongoose.Types.ObjectId(userId) })
      .populate("savedBlog.blog");


    if (lists.length === 0) {
      const defaultReadingList = await CreateList.findOne({ user: userId, isDefault: true });
      if (!defaultReadingList) {
        const readingList = new CreateList({
          listname: 'reading',
          description: 'Your default reading list.',
          user: userId,
          isDefault: true,
        });
        await readingList.save();
        lists = [readingList];
      }
    }

    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Something went wrong while fetching lists." });
  }
};

//   const { blogId } = req.body;
//   const { listId } = req.params;

//   if (!blogId) {
//     return res.status(400).json({ error: "Blog ID is required." });
//   }

//   try {

//     const list = await CreateList.findOneAndUpdate(
//       { _id: listId },
//       { $pull: { savedBlog: { blog: blogId } } },
//       { new: true }
//     );


//     if (!list) {
//       return res.status(404).json({ error: "List not found." });
//     }


//     const blogRemoved = list.savedBlog.every(item => item.blog.toString() !== blogId);

//     if (blogRemoved) {
//       return res.status(400).json({ message: "This blog was delete to the list." });
//     }

//     res.status(200).json({ message: "Blog removed from the list." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong while deleting the blog." });
//   }
// };


// export const deleteBlogFromList = async (req, res) => {
//   const { blogId } = req.body;
//   const { listId } = req.params;

//   if (!blogId) {
//     return res.status(400).json({ error: "Blog ID is required." });
//   }

//   try {
//     const list = await CreateList.findOneAndUpdate(
//       { _id: listId },
//       { $pull: { savedBlog: { blog: blogId } } },  
//       { new: true }
//     );

//     if (!list) {
//       return res.status(404).json({ error: "List not found." });
//     }

//     const blogRemoved = list.savedBlog.every(item => item.blog.toString() !== blogId);

//     if (blogRemoved) {
//       return res.status(400).json({ message: "This blog was already removed from the list." });
//     }

//     res.status(200).json({ message: "Blog removed from the list." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong while deleting the blog." });
//   }
// };

// Backend code to delete a blog from the list
// Backend code to delete a blog from the list
export const deleteBlogFromList = async (req, res) => {
  const { blogId } = req.body; // Get blogId from the body
  const { listId } = req.params; // Get listId from the URL parameter

  if (!blogId) {
    return res.status(400).json({ error: "Blog ID is required." });
  }

  try {
    const list = await CreateList.findOneAndUpdate(
      { _id: listId },
      { $pull: { savedBlog: { blog: blogId } } },  // Pull blog from the list's savedBlog array
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ error: "List not found." });
    }

    res.status(200).json({ message: "Blog removed from the list." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while deleting the blog." });
  }
};



export const AllListget = async (req, res) => {
  try {

    const allList = await CreateList.find();
    if (allList.length === 0) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'No blogs found.',
      });
    }
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'list fetch successfully.',
      allList,
    });
  } catch (err) {
    console.error(' fetch - list:', err);
    return res.status(500).json({
      status: 'FAILED',
      message: 'An error fetching list ',
    });
  }
};

export const getBlogFromList = async (req, res) => {
  const { listId } = req.params;

  if (!listId) {
    return res.status(400).json({ error: "List ID is required." });
  }


  try {
    if (!mongoose.Types.ObjectId.isValid(listId)) {
      return res.status(400).json({ error: "Invalid List ID format." });
    }

    const list = await CreateList.findById(listId).populate("savedBlog.blog");

    if (!list) {
      return res.status(404).json({ error: "List not found." });
    }

    const blogs = list.savedBlog.map((item) => item.blog);
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs from list:", error);
    res.status(500).json({ error: "Something went wrong while fetching the blogs." });
  }
};

export const deleteList = async (req, res) => {
  const { listId } = req.params;

  if (!listId) {
    return res.status(400).json({ error: "List ID is required." });
  }

  try {

    const list = await CreateList.findById(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found." });
    }

    if (list.isDefault) {
      return res.status(400).json({ error: "Cannot delete the default reading list." });
    }


    await CreateList.findByIdAndDelete(listId);

    res.status(200).json({ message: "List deleted successfully." });
  } catch (error) {
    console.error("Error deleting list:", error);
    res.status(500).json({ error: "Something went wrong while deleting the list." });
  }
};

