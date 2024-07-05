const service = require('../../services/blogService');

async function getAllBlogPosts(request, response) {
  try {
    const results = await service.getPosts();

    response.json({ data: results });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function getSinglePost(request, response) {
  try {
    const result = await service.getPost(request.params.id);

    response.json({ data: result });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function createBlogPost(request, response) {
  try {
    const result = await service.createPost(request.body);

    response.json({ data: result });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function updateBlogPost(request, response) {
  try {
    const result = await service.updatePost(request.body, request.params.id);

    response.json({ data: result });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function deleteBlogPost(request, response) {
  try {
    const result = await service.deletePost(request.params.id);

    response.json({
      message: 'Blog post deleted successfully',
      numberOfDeletedItem: result.deleted,
      deletedBlog: result.postToBeDeleted,
    });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

module.exports = {
  getAllBlogPosts,
  getSinglePost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
