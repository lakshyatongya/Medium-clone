import mongoose from "mongoose";

const createListSchema = new mongoose.Schema({
  listname: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  savedBlog: [{
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreateList",
      required: true
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});


const CreateList = mongoose.model("CreateList", createListSchema);
export default CreateList;


