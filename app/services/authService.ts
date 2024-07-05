import BadUserRequestError from '../errors/BadUserRequestError.js';
import * as  hash from '../utilities/hash.js';
import * as  middleware from '../http/middlewares/authMiddleware.js';
import { UserInterface } from '../interfaces/UserInterface.js';
import User, { UserAttributes } from '../models/User.js';
import { PayloadInterface } from '../interfaces/PayloadInterface.js';
import { randomUUID } from 'crypto';

async function registerUser(userData: UserAttributes) {
  const existingUser: UserAttributes | null = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new BadUserRequestError("User already exists. Please log in")
  }

  if (userData.password !== userData.confirmPassword) {
    throw new BadUserRequestError("Password and Confirm Password do not match")
  }

  const passwordHash: string = await hash.hashPassword(userData.password);

  const newUser = await User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: passwordHash,
    confirmPassword: passwordHash
  })

  const { _id, userId, firstName, lastName, email, createdAt, updatedAt } = newUser;
  const data = { userId, _id, firstName, lastName, email, createdAt, updatedAt };

  return data
}

async function login(userData: UserInterface) {
  const existingUser: UserInterface | null = await User.findOne({ email: userData.email });

  if (!existingUser) {
    throw new BadUserRequestError("User credentials does not exist in our database")
  }

  const passwordCorrect: Boolean = await hash.comparePassword(userData.password, existingUser.password)

  if (!passwordCorrect) {
    throw new BadUserRequestError("User credentials does not exist in our database")
  }

  const payload: PayloadInterface = {email: existingUser.email, id: existingUser.userId}

  const { token, tokenExpiryTime } = middleware.generateToken(payload)

  const data = {
    id: existingUser._id,
    userId: existingUser.userId,
    email: existingUser.email,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    createdAt: existingUser.createdAt,
    updatedAt: existingUser.updatedAt,
    token: token,
    tokenExpiresAt: tokenExpiryTime
  }

  return data;
}

export {
    registerUser,
    login
}