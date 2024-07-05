import { BlogInterface } from "../interfaces/BlogInterface";

const Blog = require('../../db/models/Blog');
import NotFoundError from '../errors/NotFoundError.js';
import sluggify from '../utilities/sluggify.js';

// Get All Posts
async function getPosts() {
  const posts = await Blog.findAll();

  return posts;
}

// Get A Single Post
async function getPost(id: string) {
  const existingPost = await Blog.findByPk(id);

  if (!existingPost) {
    throw new NotFoundError('Post not found');
  }

  return existingPost;
}

// Create A New Post
async function createPost(data: BlogInterface) {
  const newPost = await Blog.create({
    title: data.title,
    slug: sluggify(data.title),
    author: data.author,
    body: data.body,
    category: data.category ?? 'Uncategorized',
    thumbnail: data.thumbnail,
  });

  return newPost;
}

// Update A Blog Post
async function updatePost(data: BlogInterface, id: string) {
  const existingPost = await Blog.findByPk(id);

  await Blog.update(
    {
      title: data.title,
      slug: data.title ? sluggify(data.title) : existingPost.slug,
      author: data.author,
      body: data.body,
      category: data.category ?? 'Uncategorized',
      thumbnail: data.thumbnail,
      is_featured: data.is_featured,
    },
    { where: { id: id } }
  );

  const updatedPost = await Blog.findByPk(id);

  return updatedPost;
}

// Delete A Blog Post 
async function deletePost(id: string) {
    const postToBeDeleted = await Blog.findByPk(id);

    const deleted = await Blog.destroy({where: {id: id}});
    return {deleted, postToBeDeleted};
}

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};
