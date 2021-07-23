import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user } = req;

  const items = (await user.getItems()).toMappedObject('id');

  res.json({ items });
}));

router.get('/:accountId(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { accountId } } = req;

  const account = await user.findAccountByPK(accountId);

  if (!account) res.status(400).json({ errors: ['An account with that ID belonging to this user was not found in the database.'] });

  const items = (await account.getItems()).toMappedObject('id');

  res.json({ items });
}));

export default router;
