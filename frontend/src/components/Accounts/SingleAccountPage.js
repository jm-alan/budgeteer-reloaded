import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SelectAccount, DeselectACcount } from '../../store/accounts';

export default function SingleAccountPage () {
  const dispatch = useDispatch();

  const { accountId } = useParams();

  const account = useSelector(state => state.accounts.current);

  useEffect(() => {
    dispatch(SelectAccount(accountId));
    return () => dispatch(DeselectACcount());
  }, [dispatch, accountId]);

  return account && <h1>ACCOUNT LOADED</h1>;
}
