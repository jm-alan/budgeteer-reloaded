import { Router } from 'express';
import asyncHanlder from 'express-async-handler';

import createToken from '../../utils/createToken';
import { User } from '../../db/models';
import { environment, jwtConfig } from '../../config';

const router = Router();

router.post('/', asyncHanlder(async (req, res) => {
  const { body } = req;
  const user = await User.SignUp(body);
  const token = createToken(user.id);
  const isProduction = environment === 'production';
  res.cookie('token', token, {
    maxAge: jwtConfig.expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  });
  res.json({ user });
}));

export default router;
