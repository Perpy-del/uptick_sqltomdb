import supertest from 'supertest';
import app from '../index';
import Blog from '../models/Blog';

// TODO: to be improved
describe('blogs API', () => {
  let authToken: string;
  let createdPostId: string;
  let createdId: string;

  beforeAll(async () => {
    // Obtain an authorization token before running the tests
    const loginResponse = await supertest(app)
      .post('/api/signin')
      .send({
        email: 'kayjones@xyz.com',
        password: 'Goat123',
      })
      .expect(200);

    // Extract the token from the response
    authToken = loginResponse.body.data.token;
  }, 25000);

  it('gets all blog posts', async () => {
    // Assign
    const responseObject = {
      _id: expect.any(String),
      blogId: expect.any(String),
      title: expect.any(String),
      slug: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      thumbnail: expect.any(String),
    };

    // Act
    const response = await supertest(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert
    expect(response.body.data).toEqual(
      expect.arrayContaining([expect.objectContaining(responseObject)])
    );
  });

  it('gets a single blog based on the id specified', async () => {
    // Assign
    const responseObject = {
      _id: expect.any(String),
      blogId: expect.any(String),
      title: expect.any(String),
      slug: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      thumbnail: expect.any(String),
      __v: expect.any(Number),
      is_featured: expect.any(Boolean),
      category: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    // Act
    const response = await supertest(app)
      .get('/api/post/4b85788c-9ae3-4a00-8553-ca9ba035d4ea')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert
    expect(response.body.data).toEqual(expect.objectContaining(responseObject));
  });

  it('gets a single blog based on the id specified and returns a 404 if not found', async () => {
    //Assign
    const responseObject = {
      error: expect.any(String),
    };

    // Act
    const response = await supertest(app)
      .get('/api/post/5cc2ffb9-cd12-4693-bcf7-6bdb3e299ae7')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);

    // Assert
    expect(response.body.data).toEqual(expect.objectContaining(responseObject));
  });

  it('should create a new post based on the specified data', async () => {
    // Assign
    const requestObject = {
      author: 'Shayne Holbie',
      title: 'Hac Habitasse Platea Dictumst Morbi Vestibulum Velit',
      body: 'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
      is_featured: false,
      category: 'Technology',
      thumbnail: 'http://dummyimage.com/105x210.png/5fa2dd/ffffff',
    };

    // Act
    const response = await supertest(app)
      .post('/api/posts/create')
      .set('Authorization', `Bearer ${authToken}`)
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert
    const responseData = response.body.data;
    expect(responseData).toEqual(
      expect.objectContaining({
        author: requestObject.author,
        title: requestObject.title,
        body: requestObject.body,
        is_featured: requestObject.is_featured,
        category: requestObject.category,
        thumbnail: requestObject.thumbnail,
        slug: 'hac-habitasse-platea-dictumst-morbi-vestibulum-velit',
      })
    );

    expect(responseData._id).toBeDefined();
    expect(responseData.blogId).toBeDefined();
    expect(responseData.createdAt).toBeDefined();
    expect(responseData.updatedAt).toBeDefined();

    createdPostId = responseData.blogId;
    createdId = responseData._id;
  });

  it('should update an existing post based on the specified data', async () => {
    const updateData = {
      title: 'Updated Title',
      body: 'Updated Body Content',
      is_featured: true,
      blogId: createdPostId,
      category: 'Techbology',
    };

    const response = await supertest(app)
      .put(`/api/post/${createdPostId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect('Content-Type', /json/)
      .expect(200);

    // Extract relevant fields from the response
    const responseData = response.body.data;

    // Assert
    expect(responseData).toEqual(
      expect.objectContaining({
        _id: createdId,
        blogId: createdPostId,
        title: updateData.title,
        body: updateData.body,
        is_featured: updateData.is_featured,
        author: 'Shayne Holbie',
        category: updateData.category,
      })
    );

    // You can further check the updatedAt field to ensure it was updated
    expect(new Date(responseData.updatedAt).getTime()).toBeGreaterThan(
      new Date(responseData.createdAt).getTime()
    );
    expect(responseData.createdAt).toBeDefined();
    expect(responseData.slug).toBeDefined();
    expect(responseData.thumbnail).toBeDefined();
  });
});

describe('delete a blog post specified with the blogId', () => {
  let authToken: string;
  let blogId: string;

  beforeAll(async () => {
    // Create a blog post that will be deleted
    const blog = new Blog({
      blogId: 'some-uuid',
      title: 'Sample Blog Title',
      slug: 'sample-blog-title',
      author: 'Author Name',
      body: 'This is a sample blog post body.',
      thumbnail: 'http://dummyimage.com/sample.png',
      is_featured: false,
      category: 'Technology',
    });

    await blog.save();
    blogId = blog.blogId;

    // Obtain an authorization token
    const loginResponse = await supertest(app)
      .post('/api/signin')
      .send({
        email: 'kayjones@xyz.com',
        password: 'Goat123',
      })
      .expect(200);

    authToken = loginResponse.body.data.token;
  });

  it('should delete the specified blog post', async () => {
    const response = await supertest(app)
      .delete(`/api/post/${blogId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    // Verify the response
    expect(response.body).toHaveProperty('deletedBlog');
    expect(response.body.numberOfDeletedItem.acknowledged).toBe(true);

    const deletedPost = await Blog.findOne({ blogId });
    expect(deletedPost).toBeNull();
  });


});
