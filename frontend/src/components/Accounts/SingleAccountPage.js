import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import HotswapInput from '../UsefulTools/HotswapInput';
import { useHotswap } from '../../utils/hooks';
import { UpdateAccount, SelectAccount, DeselectACcount } from '../../store/accounts';

export default function SingleAccountPage () {
  const dispatch = useDispatch();

  const { accountId } = useParams();

  const accountsLoaded = useSelector(state => state.accounts.loaded);
  const account = useSelector(state => state.accounts.current);

  const [name, hotswapSetName, hotswapSubmitName] =
    useHotswap('name', account && account.name, UpdateAccount, account && account.id);
  const [balance, hotswapSetBalance, hotswapSubmitBalance] =
    useHotswap('balance', account && account.balance, UpdateAccount, account && account.id);

  useEffect(() => {
    accountsLoaded && dispatch(SelectAccount(accountId));
    return () => dispatch(DeselectACcount());
  }, [dispatch, accountsLoaded, accountId]);

  return account && (
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
    </div>
  );
}
