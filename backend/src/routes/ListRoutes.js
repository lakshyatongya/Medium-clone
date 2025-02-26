

import express from 'express';
import {  CreatedList, blogsavedinlist, listgetbyuserid,deleteBlogFromList, AllListget, getBlogFromList,deleteList } from '../controllers/CreateList.js';

const router = express.Router();


router.post("/createlists", CreatedList);


router.post("/:listId/save-blog", blogsavedinlist);

router.get("/getlists/:userId", listgetbyuserid);

router.delete('/:listId/delete-blog', deleteBlogFromList);
// router.get("/:listId/blogs/:blogId",getBlogFromList)

router.get("/:listId/blogs", getBlogFromList);

router.get("/getallist",AllListget)
router.delete('/:listId', deleteList);
export default router;

