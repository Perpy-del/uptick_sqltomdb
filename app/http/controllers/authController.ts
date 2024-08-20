import * as service from '../../services/authService.js';
import { Request, Response } from 'express';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { client } from '../../../config/s3.js';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function createUser(request: Request, response: Response): Promise<void> {
  try {
    const result = await service.registerUser(request.body);

    response.json({ data: result });
  } catch (error: any) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function signInUser(request: Request, response: Response): Promise<void> {
  try {
    const result = await service.login(request.body);

    response.json({ data: result });
  } catch (error: any) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function updateOneUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const result = await service.updateUser(
      request.body,
      request.params.userId
    );

    response.json({ data: result });
  } catch (error: any) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function uploadUserImage(request: Request, response: Response) {
  try {
    const userId = request.body.userId as string;
    if (!request.file) {
      throw new Error('No file uploaded.');
    }

    const image = request.file?.buffer;
    const originalName = request.file?.originalname;

    // Upload image to S3
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME as string,
      Key: originalName,
      Body: image,
      ContentType: request.file?.mimetype,
    });

    await client.send(command);

    const getCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME as string,
      Key: originalName
    })
    // Get image URL or path
    
    const url = await getSignedUrl(client, getCommand, { expiresIn: 86400 });
    
    const imageUrl = url;

    // Update user with image URL
    const result = await service.userImage(imageUrl, userId);

    response.json({ data: result });
  } catch (error: any) {
    console.error('Error:', error);
    response.status(error.statusCode || 500).json({ error: error.message });
  }
}

function protectedRoute(request: Request, response: Response): void {
  response.status(200).json({
    status: 'Success',
    message: 'Route is protected',
  });
}

export {
  createUser,
  signInUser,
  updateOneUser,
  uploadUserImage,
  protectedRoute,
};
