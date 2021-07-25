import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleAccount from './SingleAccount';
import { GetAccounts, UnloadAccounts } from '../../store/accounts';

export default function Accounts () {
  const dispatch = useDispatch();

  const accounts = useSelector(state => Object.values(state.accounts.all));
  const loaded = useSelector(state => state.accounts.loaded);

  useEffect(() => {
    dispatch(GetAccounts());
    return () => dispatch(UnloadAccounts());
  }, [dispatch]);

  return loaded && (
    <div className='account-list-sidebar'>
      {accounts.map((account, idx) => (
        <SingleAccount account={account} key={idx} />
      ))}
    </div>
  );
}
