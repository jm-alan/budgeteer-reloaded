import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HotswapInput from '../UsefulTools/HotswapInput';
import { UpdateAccount } from '../../store/accounts';
import { useHotswap } from '../../utils/hooks';

export default function AccountEntry ({ account }) {
  const history = useHistory();

  const currentAccount = useSelector(state => state.accounts.current);

  const [name, hotswapSetName, hotswapSubmitName] =
    useHotswap('name', account.name, UpdateAccount, account.id);

  const goToAccount = () => history.push(`/accounts/${account.id}/`);

  return (
    <div
      className={`single-account-container${
        currentAccount && currentAccount.id === account.id
          ? ' selected'
          : ''
      }`}
      onClick={goToAccount}
    >
      <HotswapInput
        type='textarea'
        contents={name}
        maxLength={100}
        setContents={hotswapSetName}
        onSubmitConstructor={hotswapSubmitName}
      />
    </div>
  );
}
