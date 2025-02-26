import mongoose from "mongoose";

const savedBlogSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    },
});

const SavedBlog = mongoose.model("SavedBlog", savedBlogSchema);
export default SavedBlog;
