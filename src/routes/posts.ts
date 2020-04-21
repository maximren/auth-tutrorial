import * as express from 'express';

import { validateAuth } from '../helpers/verifyToken';
import { getPosts } from '../controllers/posts.controller';

const router = express.Router();

router.get('/posts', validateAuth, getPosts)


export default router;
