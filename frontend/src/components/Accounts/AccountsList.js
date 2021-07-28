import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountEntry from './AccountEntry';
import Loading from '../UsefulTools/Loading';
import { GetAccounts, UnloadAccounts } from '../../store/accounts';

export default function AccountsList () {
  const dispatch = useDispatch();

  const accounts = useSelector(state => Object.values(state.accounts.all));
  const loaded = useSelector(state => state.accounts.loaded);

  useEffect(() => {
    dispatch(GetAccounts());
    return () => dispatch(UnloadAccounts());
  }, [dispatch]);

  return (
    <div className='account-list-sidebar'>
      <button className='new-account'>
        + New Account
      </button>
      {loaded
        ? accounts.map((account, idx) => (
          <AccountEntry account={account} key={idx} />
        ))
        : <Loading />}
    </div>
  );
}
