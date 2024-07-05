import { Schema, model, Document, Model } from "mongoose";
interface BlogAttributes {
  blogId: string;
  title: string;
  slug: string;
  author: string;
  body: string;
  is_featured?: boolean;
  category?: string;
  thumbnail?: string;
}

// Extend Mongoose's Document interface to include the blog attributes
interface BlogDocument extends Document, BlogAttributes {}

// Extend Mongoose's Model interface to include custom methods or statics if needed
interface BlogModel extends Model<BlogDocument> {}

// Define the blog schema
const blogSchema = new Schema<BlogDocument, BlogModel>(

  {
    blogId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog: BlogModel = model<BlogDocument, BlogModel>('Blog', blogSchema);

export default Blog;