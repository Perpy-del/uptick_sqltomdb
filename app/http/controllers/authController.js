const service = require('../../services/authService');

async function createUser(request, response) {
  try {
    const result = await service.registerUser(request.body);

    response.json({ data: result });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function signInUser(request, response) {
  try {
    const result = await service.login(request.body);

    response.json({ data: result })

  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

function protectedRoute(request, response) {
  response.status(200).json({
    status: 'Success',
    message: 'Route is protected',
  });
}

module.exports = {
  createUser,
  signInUser,
  protectedRoute,
};
