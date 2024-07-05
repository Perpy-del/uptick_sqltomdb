import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

function createBlogValidator(request: Request, response: Response, next: NextFunction) {
  const schema: Joi.ObjectSchema<any> = Joi.object({
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    body: Joi.string().trim().required(),
    category: Joi.string().trim().optional().allow(''),
    is_featured: Joi.boolean().optional().allow(''),
    thumbnail: Joi.string().trim().optional().allow('')
  });

  const { error } = schema.validate(request.body, { abortEarly: false });

  if (error) {
    console.log(error);
    const errorDetails = error.details.map(detail => {
      const message: string = detail.message.split('"')[2].trim();
      const key: any = detail?.context?.key;

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

module.exports = createBlogValidator;
