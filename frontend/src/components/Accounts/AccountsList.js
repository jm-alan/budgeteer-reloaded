import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountEntry from './AccountEntry';
import Loading from '../UsefulTools/Loading';
import NewAccount from './NewAccount';
import { GetAccounts, UnloadAccounts } from '../../store/accounts';
import { ShowModal } from '../../store/UX';
import { SetModal } from '../../store/modal';

export default function AccountsList () {
  const dispatch = useDispatch();

  const accounts = useSelector(state => Object.values(state.accounts.all));
  const allLoaded = useSelector(state => state.accounts.allLoaded);

  const popNewAccount = () => {
    dispatch(SetModal(NewAccount));
    dispatch(ShowModal());
  };

  useEffect(() => {
    dispatch(GetAccounts());
    return () => dispatch(UnloadAccounts());
  }, [dispatch]);

  return (
    <div className='account-list-sidebar'>
      <button
        onClick={popNewAccount}
        className='new-account'
      >
        + New Account
      </button>
      {allLoaded
        ? accounts.map((account, idx) => (
          <AccountEntry account={account} key={idx} />
        ))
        : <Loading />}
    </div>
  );
}
