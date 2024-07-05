import { BlogInterface } from '../interfaces/BlogInterface';

import Blog, { BlogAttributes } from '../models/Blog.js';
import NotFoundError from '../errors/NotFoundError.js';
import sluggify from '../utilities/sluggify.js';
import { randomUUID } from 'crypto';

// Get All Posts
async function getPosts(): Promise<Array<BlogAttributes | null>> {
  const posts: Array<BlogAttributes | null> = await Blog.find();

  return posts;
}

// Get A Single Post
async function getPost(blogId: string): Promise<BlogAttributes | null> {
  const existingPost: BlogAttributes | null = await Blog.findOne({ blogId: blogId });

  if (!existingPost) {
    throw new NotFoundError('Post not found');
  }

  return existingPost;
}

// Create A New Post
async function createPost(data: BlogInterface): Promise<BlogAttributes> {
  const newPost: BlogAttributes = await Blog.create({
    blogId: randomUUID(),
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
async function updatePost(data: BlogInterface, blogId: string): Promise<BlogAttributes | null> {
  const existingPost: BlogAttributes | null = await Blog.findOne({ blogId });

  if (!existingPost) {
    throw new NotFoundError('Post Not Found');
  }

  const updatedPost: BlogAttributes | null = await Blog.findOneAndUpdate(
    { blogId },
    {
      title: data.title,
      slug: data.title ? sluggify(data.title) : existingPost?.slug,
      author: data.author,
      body: data.body,
      category: data.category ?? 'Uncategorized',
      thumbnail: data.thumbnail,
      is_featured: data.is_featured,
    },
    { new: true }
  );

  return updatedPost;
}

// Delete A Blog Post
async function deletePost(blogId: string) {
  const postToBeDeleted: BlogAttributes | null = await Blog.findOne({ blogId });

  const deleted = await Blog.deleteOne({ blogId });
  return { deleted, postToBeDeleted };
}

export { getPosts, getPost, createPost, updatePost, deletePost };
