import * as express from 'express';
import * as mongoose from 'mongoose';

import auth from './routes/auth';
import posts from './routes/posts';
import users from './routes/users';
import { corsHelper } from './helpers/cors.middleware';

require('dotenv').config();

const app: express.Express = express();

app.use(express.json())

app.use(corsHelper);
app.use(auth);
app.use(posts);
app.use('/users', users);

mongoose.connect(
  'mongodb+srv://max:max@ukeess-test-jmpet.mongodb.net/test?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('db is connected'),
);

app.listen(3030, () => console.log('server is running'));
