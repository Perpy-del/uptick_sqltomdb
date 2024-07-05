const User = require('../../db/models/user');
const BadUserRequestError = require('../errors/BadUserRequestError');
const hash = require('../utilities/hash');
const middleware = require('../http/middlewares/authMiddleware');

async function registerUser(userData) {
  const existingUser = await User.findOne({where: { email: userData.email}});

  if (existingUser) {
    throw new BadUserRequestError("User already exists. Please log in")
  }

  if (userData.password !== userData.confirmPassword) {
    throw new BadUserRequestError("Password and Confirm Password do not match")
  }

  const passwordHash = await hash.hashPassword(userData.password);

  const newUser = await User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: passwordHash,
    confirmPassword: passwordHash
  })

  const {id, firstName, lastName, email, createdAt, updatedAt, deletedAt} = newUser;
  const data = {id, firstName, lastName, email, createdAt, updatedAt, deletedAt};

  return data
}

async function login(userData) {
  const existingUser = await User.findOne({ where: { email: userData.email } });

  if (!existingUser) {
    throw new BadUserRequestError("User credentials does not exist in our database")
  }

  const passwordCorrect = await hash.comparePassword(userData.password, existingUser.password)

  if (!passwordCorrect) {
    throw new BadUserRequestError("User credentials does not exist in our database")
  }

  const payload = {email: existingUser.email, id: existingUser.id}

  const { token, tokenExpiryTime } = middleware.generateToken(payload)

  const data = {
    id: existingUser.id,
    email: existingUser.email,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    createdAt: existingUser.createdAt,
    updatedAt: existingUser.updatedAt,
    deletedAt: existingUser.deletedAt,
    token: token,
    tokenExpiresAt: tokenExpiryTime
  }

  return data;
}

module.exports = {
    registerUser,
    login
}