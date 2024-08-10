import supertest from 'supertest';
import app from '../index';
import User from '../models/User';
import mongoose from 'mongoose';
import * as hash from '../utilities/hash';
import { randomUUID } from 'crypto';

// TODO: to be improved
describe('User Register', () => {
  let createdId: mongoose.Schema.Types.ObjectId | null = null;
  let createdUserId: String | null = null;

  it('should create a new user', async () => {
    // Assign
    const uniqueEmail = `kennyjones${Date.now()}@xyz.com`; // Generate unique email so that the test passes every time
    const requestObject = {
      firstName: 'Kenny',
      lastName: 'Jones',
      email: uniqueEmail,
      password: 'Hello123',
      confirmPassword: 'Hello123',
    };

    // Act
    const response = await supertest(app)
      .post('/api/create-user')
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert
    const responseData = response.body.data;
    expect(responseData).toEqual(
      expect.objectContaining({
        firstName: requestObject.firstName,
        lastName: requestObject.lastName,
        email: requestObject.email,
      })
    );

    expect(responseData._id).toBeDefined();
    expect(responseData.userId).toBeDefined();
    expect(responseData.createdAt).toBeDefined();
    expect(responseData.updatedAt).toBeDefined();

    // Store the created user's ID for cleanup
    createdUserId = responseData.userId;
    createdId = responseData._id;
  }, 10000);

  it('should throw an error if the user already exists', async () => {
    // Assign
    const requestObject = {
      firstName: 'George',
      lastName: 'Cameroon',
      email: `cameroongeorge${Date.now()}@xyz.com`,
      password: 'Hello123',
      confirmPassword: 'Hello123',
    };

    // Act - Create the user for the first time
    const firstResponse = await supertest(app)
      .post('/api/create-user')
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect(200);

    createdId = firstResponse.body.data._id;

    // Act - Try to create the user again with the same email
    const secondResponse = await supertest(app)
      .post('/api/create-user')
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect(400); // Expecting a 400 Bad Request

    // Assert
    expect(secondResponse.body.data).toHaveProperty('error');
    expect(secondResponse.body.data.error).toBe(
      'User already exists. Please log in'
    );
  });

  afterEach(async () => {
    if (createdId) {
      console.log(`Attempting to delete user with ID: ${createdId}`);
      await mongoose.connection
        .collection('users')
        .deleteOne({ _id: createdId });
      createdId = null;
      createdUserId = null;
    }
  });
});

describe('User Login and Update', () => {
  let createdId: string | null = null;
  let createdUserId: string | null = null;
  let authToken: string | null = null;
  let userCreatedAt: any | null = null;
  const userPassword = 'Hello123';

  beforeEach(async () => {
    const passwordHash = await hash.hashPassword(userPassword);

    // Create a user in the database to test login
    const user = await User.create({
      userId: randomUUID(),
      firstName: 'George',
      lastName: 'Cameroon',
      email: 'testlogin@xyz.com',
      password: passwordHash,
      confirmPassword: passwordHash,
    });

    userCreatedAt = user.createdAt;
    createdId = user._id as string | null;
    createdUserId = user.userId as string | null;
  }, 15000);

  afterEach(async () => {
    if (createdUserId) {
      await User.deleteOne({ _id: createdId });
      createdId = null;
      createdUserId = null;
    }
  }, 10000);

  it('should log in successfully with correct credentials', async () => {
    // Assign
    const requestObject = {
      email: 'testlogin@xyz.com',
      password: userPassword,
    };

    // Act
    const response = await supertest(app)
      .post('/api/signin')
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert
    const responseData = response.body.data;

    // Check static fields
    expect(responseData.email).toEqual('testlogin@xyz.com');
    expect(responseData.firstName).toEqual('George');
    expect(responseData.lastName).toEqual('Cameroon');

    // Check dynamic fields
    expect(typeof responseData.token).toBe('string');
    expect(typeof responseData.userId).toBe('string');
    expect(typeof responseData.id).toBe('string');
    expect(new Date(responseData.tokenExpiresAt).toString()).not.toBe(
      'Invalid Date'
    );
    expect(new Date(responseData.createdAt).toString()).not.toBe(
      'Invalid Date'
    );
    expect(new Date(responseData.updatedAt).toString()).not.toBe(
      'Invalid Date'
    );

    userCreatedAt = responseData.createdAt;
    createdId = responseData._id;
    createdUserId = responseData.userId;
    authToken = responseData.token;
  });

  it('should return a 400 error if the user does not exist', async () => {
    // Assign
    const requestObject = {
      email: 'nonexistentuser@xyz.com',
      password: 'wrongPassword',
    };

    // Act
    const response = await supertest(app)
      .post('/api/signin')
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect(400); // Expecting a 400 error

    // Assert
    expect(response.body.data).toHaveProperty('error');
    expect(response.body.data.error).toBe(
      'User credentials does not exist in our database'
    );
  });

  it('should return a 400 error if the password is incorrect', async () => {
    // Assign
    const requestObject = {
      email: 'testlogin@xyz.com',
      password: 'wrongPassword',
    };

    // Act
    const response = await supertest(app)
      .post('/api/signin')
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect(400); // Expecting a 400 error

    // Assert
    expect(response.body.data).toHaveProperty('error');
    expect(response.body.data.error).toBe(
      'User credentials does not exist in our database'
    );
  });

  it('should update the user details based on the specified data', async () => {
    const updatedUser = {
      firstName: 'Kehinde',
    };

    const response = await supertest(app)
      .put(`/api/user/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedUser)
      .expect('Content-Type', /json/)
      .expect(200);

    const responseData = response.body.data;

    expect(responseData.email).toEqual('testlogin@xyz.com');
    expect(responseData.firstName).toEqual('Kehinde');
    expect(responseData.lastName).toEqual('Cameroon');

    expect(new Date(responseData.createdAt).toString()).not.toBe(
      'Invalid Date'
    );
    expect(new Date(responseData.updatedAt).toString()).not.toBe(
      'Invalid Date'
    );
    expect(typeof responseData.userId).toBe('string');
    expect(typeof responseData.id).toBe('string');
  });
});
