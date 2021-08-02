import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user } = req;

  res.json({ accounts: (await user.getAccounts()).toMappedObject('id') });
}));

router.get('/:accountId(\\d+)/items/:date(\\d+)/:month(\\d+)/:year(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { accountId, date, month, year } } = req;

  res.json({
    items: (await user.getItems({
      where: {
        [Op.or]: [
          {
            effectiveFullDate: `${date}/${month}/${year}`,
            recurring: false
          },
          {
            effectiveDate: date,
            recurring: true
          }
        ],
        accountId
      }
    })).toMappedObject('id')
  });
}));

router.post('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;

  for (const key in body) if (!['name', 'balance', 'description'].some(validKey => key === validKey)) delete body[key];

  res.json({ account: await user.createAccount(body) });
}));

router.patch('/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body, params: { id } } = req;

  const account = await user.findAccountByPK(id);
  if (!account) return res.json({ account: null });

  for (const key in body) if (!['name', 'balance', 'description'].some(validKey => key === validKey)) delete body[key];
  await account.update(body);

  res.json({ account });
}));

router.delete('/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id } } = req;

  const account = await user.findAccountByPK(id);
  if (!account) return res.status(400).json({ errors: ['An account with that ID belonging to this user was not found in the database.'] });
  await account.destroy();

  res.sendStatus(200);
}));

export default router;
