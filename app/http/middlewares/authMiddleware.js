const jwt = require('jsonwebtoken');
const { addSeconds, getTime, formatISO } = require('date-fns');

function generateToken(data) {
  const tokenExpiryTime = addSeconds(
    new Date(),
    process.env.DEV_JWT_EXPIRY_TIME
  );

  const payload = {
    exp: Math.floor(getTime(tokenExpiryTime) / 1000),
    email: data.email,
    id: data.id,
  };

  const token = jwt.sign(payload, process.env.DEV_APP_SECRET, {
    // issuer: process.env.DEV_JWT_ISSUER,
    issuer: process.env.DEV_JWT_ISSUER,
  });

  return { token, tokenExpiryTime };
}

function authenticateUser(request, response, next) {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
        return response.status(401).json({
            data: {
                error: {
                    title: 'Authentication Error',
                    message: 'Please authenticate to continue'
                }
            }
        })
    }

    const token = authorizationHeader.split(' ')[1]

    try {
      jwt.verify(token, process.env.DEV_APP_SECRET)
    } catch (error) {
      return response.status(401).json({
        data: {
          error: {
            title: 'Authentication Error',
            message: 'Please authenticate to continue',
            errorMessage: `${error.message}`
          }
        }
      })
    }

    next();
}


module.exports = {
    generateToken,
    authenticateUser
}