import * as express from 'express';

import { getUsers, editUser, deleteUser, getTargetUser } from '../controllers/user.controller';
import { validateAuth } from '../helpers/verifyToken';

const router = express.Router();

router.get('/',validateAuth, getUsers);

router.get('/:id',validateAuth, getTargetUser);

router.patch('/:id',validateAuth, editUser);

router.delete('/:id',validateAuth, deleteUser);

export default router;