import Logger from '../utils/logger';
import AppError from '../errors/AppError';
import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';

const logger = Logger('mediaController');

const addPost = async (req, res) => {
  logger.log('debug', `addPost: ${JSON.stringify(req.body)}`);
  const { user } = req;
  const { caption, contentId } = req.body;
  const { path } = await MediaModel.getMediaById(contentId);
  const media = await MediaModel.getMediaById(contentId);
  if (!media) {
    throw new AppError('No media with such ID');
  }
  const post = await PostModel.save({
    caption,
    username: user.username,
    media: {
      path,
      contentId,
    },
  });
  // Save post model to db
  res.status(200).send({ payload: { post } });
};

const uploadImage = async (req, res) => {
  logger.log('debug', 'Uploaded image!');
  const { user } = req;
  const {
    file: { filename },
  } = req;

  const path = `/${process.env.UPLOAD_FOLDER}/${filename}`;

  const media = await MediaModel.save({
    username: user.username,
    path,
  });
  res.status(200).send({
    payload: {
      contentId: media.id,
      path,
    },
  });
};

const getAllPosts = async (req, res) => {
  logger.log('debug', `getAllPosts}`);
  const posts = await PostModel.getAllPosts();
  res.status(200).send({ payload: posts });
};
const getPostById = async (req, res) => {
  logger.log('debug', `getPostById} ${JSON.stringify(req.params)}`);
  const post = await PostModel.getPostsById(req.params.id);
  res.status(200).send({ payload: post });
};
export { uploadImage, addPost, getAllPosts, getPostById };
