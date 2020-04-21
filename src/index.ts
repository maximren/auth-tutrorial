import * as express from 'express';
import * as mongoose from 'mongoose';

import auth from './routes/auth';
import posts from './routes/posts';

require('dotenv').config();

const app: express.Express = express();

app.use(express.json())

app.use(auth)
app.use(posts)

mongoose.connect(
  process.env.DATABASE_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('db is connected'),
);

app.listen(3000, () => console.log('server is running'));
