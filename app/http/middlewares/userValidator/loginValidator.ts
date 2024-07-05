import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

function loginValidator(request: Request, response: Response, next: NextFunction) {
    const schema: Joi.ObjectSchema<any> = Joi.object({
      email: Joi.string().trim().required().email(),
      password: Joi.string().trim().required().min(6).max(50),
    });
  
    const { error } = schema.validate(request.body, { abortEarly: false });
  
    if (error) {
      console.log(error);
      const errorDetails = error.details.map(detail => {
        const message = detail.message.split('"')[2].trim();
        const key: any = detail.context?.key;
  
        return { [key]: `The ${key} field ${message}` };
      });
  
      return response.status(422).json({
        data: {
          error: {
            title: 'Validation Error',
            message: errorDetails,
          },
        },
      });
    }
  
    next();
  }
  
export default loginValidator;
  