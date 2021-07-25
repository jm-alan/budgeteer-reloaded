import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SingleAccount from './SingleAccount';
import SingleAccountPage from './SingleAccountPage';
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
    <div className='page-container accounts'>
      <div className='account-list-sidebar'>
        <button className='new-account'>
          + New Account
        </button>
        {accounts.map((account, idx) => (
          <SingleAccount account={account} key={idx} />
        ))}
      </div>
      <div className='account-container'>
        <Route path='/accounts/:accountId/'>
          <SingleAccountPage />
        </Route>
      </div>
    </div>
  );
}
