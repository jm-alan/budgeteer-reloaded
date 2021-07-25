import { useHistory } from 'react-router';

import HotswapInput from '../UsefulTools/HotswapInput';
import { UpdateAccount } from '../../store/accounts';
import { useHotswap } from '../../utils/hooks';

import './index.css';

export default function SingleAccount ({ account }) {
  const history = useHistory();

  const [name, hotswapSetName, hotswapSubmitName] =
    useHotswap('name', account.name, UpdateAccount, account.id);

  const goToAccount = () => history.push(`/accounts/${account.id}/`);

  return (
    <div
      className='single-account-container'
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
