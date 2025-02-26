import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, },

});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;


