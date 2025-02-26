// import mongoose from 'mongoose';
// const { Schema } = mongoose;
// const blogSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   tags: [String],
//   meta: {
//     votes: { type: Number, default: 0 },
//     favs: { type: Number, default: 0 },
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   isPublished: { type: Boolean, default: false },
//   views: { type: Map, of: Number, default: {} },
//   image: { type: String, required: true },

// });

// const Blog = mongoose.model('Blog', blogSchema);
// export default Blog;



import mongoose from 'mongoose';

const { Schema } = mongoose;

const imageSchema = new Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' }
}, { _id: false });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  meta: {
    votes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  views: { type: Map, of: Number, default: {} },
  images: [imageSchema],
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
