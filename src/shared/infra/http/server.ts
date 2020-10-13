import express from 'express';
import path from 'path';
import cors from 'cors';

import '@shared/infra/typeorm';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  '/uploads',
  express.static(
    path.join(__dirname, '..', '..', '..', '..', 'tmp', 'uploads'),
  ),
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
