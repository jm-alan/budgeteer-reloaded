import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SelectAccount, DeselectACcount } from '../../store/accounts';

export default function SingleAccountPage () {
  const dispatch = useDispatch();

  const { accountId } = useParams();

  const accountsLoaded = useSelector(state => state.accounts.loaded);
  const account = useSelector(state => state.accounts.current);

  useEffect(() => {
    accountsLoaded && dispatch(SelectAccount(accountId));
    return () => dispatch(DeselectACcount());
  }, [dispatch, accountsLoaded, accountId]);

  return account && (
    <div className='account-header'>
      <h1>{account.name}</h1>
      <h1>{account.balance}</h1>
    </div>
  );
}
