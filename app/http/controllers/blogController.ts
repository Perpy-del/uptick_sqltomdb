// import * as service from '../../services/blogService.js';
// import { Request, Response } from 'express';

// async function getAllBlogPosts(request: Request, response:Response): Promise<void> {
//   try {
//     const results = await service.getPosts();

//     response.json({ data: results });
//   } catch (error: any) {
//     console.log('Error querying database: ', error);

//     response
//       .status(error.statusCode || 500)
//       .json({ data: { error: `${error.message}` } });
//   }
// }

// async function getSinglePost(request: Request, response:Response): Promise<void> {
//   try {
//     const result = await service.getPost(request.params.id);

//     response.json({ data: result });
//   } catch (error: any) {
//     console.log('Error querying database: ', error);

//     response
//       .status(error.statusCode || 500)
//       .json({ data: { error: `${error.message}` } });
//   }
// }

// async function createBlogPost(request: Request, response: Response): Promise<void> {
//   try {
//     const result = await service.createPost(request.body);

//     response.json({ data: result });
//   } catch (error: any) {
//     console.log('Error querying database: ', error);

//     response
//       .status(error.statusCode || 500)
//       .json({ data: { error: `${error.message}` } });
//   }
// }

// async function updateBlogPost(request: Request, response: Response): Promise<void> {
//   try {
//     const result = await service.updatePost(request.body, request.params.id);

//     response.json({ data: result });
//   } catch (error: any) {
//     console.log('Error querying database: ', error);

//     response
//       .status(error.statusCode || 500)
//       .json({ data: { error: `${error.message}` } });
//   }
// }

// async function deleteBlogPost(request: Request, response: Response): Promise<void> {
//   try {
//     const result = await service.deletePost(request.params.id);

//     response.json({
//       message: 'Blog post deleted successfully',
//       numberOfDeletedItem: result.deleted,
//       deletedBlog: result.postToBeDeleted,
//     });
//   } catch (error: any) {
//     console.log('Error querying database: ', error);

//     response
//       .status(error.statusCode || 500)
//       .json({ data: { error: `${error.message}` } });
//   }
// }

// export {
//   getAllBlogPosts,
//   getSinglePost,
//   createBlogPost,
//   updateBlogPost,
//   deleteBlogPost,
// };
