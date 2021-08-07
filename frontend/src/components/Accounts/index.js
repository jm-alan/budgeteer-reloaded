import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import HotswapInput from '../UsefulTools/HotswapInput';
import DestroyAccount from './DestroyAccount';
import Calendar from './Calendar';
import { SetModal } from '../../store/modal';
import { ShowModal } from '../../store/UX';
import { UpdateAccount, SelectAccount, DeselectACcount } from '../../store/accounts';
import { useHotswap } from '../../utils/hooks';

import './index.css';

export default function Accounts () {
  const dispatch = useDispatch();

  const history = useHistory();

  const { accountId } = useParams();

  const account = useSelector(state => state.accounts.current) || null;
  const allLoaded = useSelector(state => state.accounts.allLoaded);
  const currentLoaded = useSelector(state => state.accounts.currentLoaded);

  const [name, hotswapSetName, hotswapSubmitName] =
    useHotswap('name', account && account.name, UpdateAccount, account && account.id);
  const [balance, hotswapSetBalance, hotswapSubmitBalance] =
    useHotswap('balance', account && account.balance, UpdateAccount, account && account.id);

  const popDelete = () => {
    dispatch(SetModal(DestroyAccount));
    dispatch(ShowModal());
  };

  useEffect(() => {
    accountId !== undefined && allLoaded && dispatch(SelectAccount(accountId));
    return () => dispatch(DeselectACcount());
  }, [dispatch, allLoaded, accountId]);

  useEffect(() => {
    accountId !== undefined && allLoaded && currentLoaded && !account && history.push('/accounts/');
  }, [accountId, allLoaded, currentLoaded, account, history]);

  useEffect(() => {
    if (account) {
      hotswapSetName(account.name);
      hotswapSetBalance(account.balance);
    }
  }, [account, hotswapSetName, hotswapSetBalance]);

  return account && (
    <div className='page-container accounts'>
      <div className='account-container'>
        <div className='account-header'>
          <HotswapInput
            contents={name}
            fallback={n => <h1>{n}</h1>}
            maxLength={100}
            setContents={hotswapSetName}
            onSubmitConstructor={hotswapSubmitName}
          />
          <HotswapInput
            contents={balance}
            fallback={bal => <h1>{bal}</h1>}
            maxLength={100}
            setContents={hotswapSetBalance}
            onSubmitConstructor={hotswapSubmitBalance}
          />
          <button
            className='account-delete'
            onClick={popDelete}
          >
            Delete Account
          </button>
        </div>
        <Calendar />
      </div>

    </div>
  );
}
