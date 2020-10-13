import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';

import '@shared/infra/typeorm';

interface ValidationErrorProps {
  [key: string]: string[];
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadConfig.uploadsFolder));
app.use(routes);

routes.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof ValidationError) {
      const errors: ValidationErrorProps = {};

      err.inner.forEach(error => {
        errors[error.path] = error.errors;
      });

      return response.status(400).json({
        message: 'Validation fails',
        errors,
      });
    }

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
