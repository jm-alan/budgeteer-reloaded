import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user } = req;

  const accounts = (await user.getAccounts()).toMappedObject('id');

  res.json({ accounts });
}));

router.post('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;

  for (const key in body) if (key !== 'balance') delete body[key];

  const account = await user.createAccount(body);

  res.json({ account });
}));

router.patch('/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body, params: { id } } = req;

  const account = await user.findAccountByPK(id);

  if (!account) return res.json({ account: null });

  if (!(await user.hasAccount(account))) res.json({ account: null });

  for (const key in body) if (key !== 'balance') delete body[key];

  await account.update(body);

  res.json({ account });
}));

export default router;
