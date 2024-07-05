import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { addSeconds, getTime, formatISO } from 'date-fns';
import { PayloadInterface } from '../../interfaces/PayloadInterface';
import { Request, Response, NextFunction } from 'express';

function generateToken(data: PayloadInterface) {
  const tokenExpiryTime = addSeconds(
    new Date(),
    Number(process.env.PROD_JWT_EXPIRY_TIME)
  );

  const payload = {
    exp: Math.floor(getTime(tokenExpiryTime) / 1000),
    email: data.email,
    id: data.id,
  };

  const token = jwt.sign(payload, process.env.PROD_APP_SECRET as any, {
    issuer: process.env.DEV_JWT_ISSUER,
    // issuer: process.env.PROD_JWT_ISSUER,
  });

  return { token, tokenExpiryTime };
}

function authenticateUser(request: Request, response: Response, next: NextFunction) {
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
      jwt.verify(token, process.env.PROD_APP_SECRET as Secret | GetPublicKeyOrSecret)
    } catch (error: any) {
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


export {
    generateToken,
    authenticateUser
}