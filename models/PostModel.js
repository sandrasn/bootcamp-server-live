import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, trim: true, requred: true },
    username: { type: String, requred: true },
    media: {
      contentId: { type: String, trim: true, required: true },
      path: { type: String, required: true },
    },
  },
  { timenstamps: true },
);

const PostModel = mongoose.model('Post', postSchema);
const save = async model => new PostModel(model).save();
const getPostsByUser = async username => PostModel.find({ username });
const getPostsById = async id => PostModel.findById({ id } || []);
const getAllPosts = async () => PostModel.find({}) || []; // if there are no posts, then function returns empty array

export { save, getAllPosts, getPostsById, getPostsByUser };
