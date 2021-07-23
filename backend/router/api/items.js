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

  if (!account) return res.status(400).json({ errors: ['An account with that ID belonging to this user was not found in the database.'] });

  const items = (await account.getItems()).toMappedObject('id');

  res.json({ items });
}));

router.post('/:accountId(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body, params: { accountId } } = req;

  if (Object.keys(body).length > 6) return res.sendStatus(400);

  for (const key in body) {
    if (
      !['recurring', 'isIncome', 'amount', 'effectiveDate', 'startDate', 'endDate']
        .some(prop => prop === key)
    ) delete body[key];
  }

  const account = await user.findAccountByPK(accountId);

  if (!account) return res.status(400).json({ errors: ['An account with that ID belonging to this user was not found in the database.'] });

  const item = await account.postItem(body);

  res.json({ item });
}));

router.patch('/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body, params: { id } } = req;

  const item = await user.findItemByPK(id);

  if (!item) return res.status(400).json({ errors: ['An item with that ID belonging to this user was not found in the database.'] });

  for (const key in body) {
    if (
      !['recurring', 'isIncome', 'amount', 'effectiveDate', 'startDate', 'endDate']
        .some(prop => prop === key)
    ) delete body[key];
  }

  await item.update(body);

  res.json({ item });
}));

export default router;
