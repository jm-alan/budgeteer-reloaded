import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user } = req;

  const accounts = await user.getAccounts();

  res.json({ accounts });
}));

router.post('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;

  for (const key in body) if (key !== 'balance') delete body[key];

  const account = await user.createAccount(body);

  res.json({ account });
}));

export default router;
