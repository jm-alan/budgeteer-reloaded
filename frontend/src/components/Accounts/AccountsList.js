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

  const user = useSelector(state => state.session.user);
  const accounts = useSelector(state => state.accounts.all);
  const allLoaded = useSelector(state => state.accounts.allLoaded);

  const popNewAccount = () => {
    dispatch(SetModal(NewAccount));
    dispatch(ShowModal());
  };

  useEffect(() => {
    user && dispatch(GetAccounts());
    return () => dispatch(UnloadAccounts());
  }, [dispatch, user]);

  return user && (
    <div className='account-list-sidebar'>
      <button
        onClick={popNewAccount}
        className='new-account'
      >
        + New Account
      </button>
      {allLoaded
        ? Object.values(accounts).map((account, idx) => (
          <AccountEntry account={account} key={idx} />
        ))
        : <Loading />}
    </div>
  );
}
