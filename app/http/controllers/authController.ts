import * as service from '../../services/authService.js';
import { Request, Response } from 'express';

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

    response.json({ data: result })

  } catch (error: any) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function updateOneUser(request: Request, response: Response): Promise<void> {
  try {
    const result = await service.updateUser(request.body, request.params.userId);

    response.json({ data: result })

  } catch (error: any) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
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
  protectedRoute,
};
