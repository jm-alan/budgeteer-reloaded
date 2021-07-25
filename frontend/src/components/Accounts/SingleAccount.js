import HotswapInput from '../UsefulTools/HotswapInput';
import { UpdateAccount } from '../../store/accounts';
import { useHotswap } from '../../utils/hooks';

import './index.css';

export default function SingleAccount ({ account }) {
  const [name, hotswapSetName, hotswapSubmitName] =
    useHotswap('name', account.name, UpdateAccount, account.id);

  return (
    <div className='single-account-container'>
      <HotswapInput
        contents={name}
        setContents={hotswapSetName}
        onSubmitConstructor={hotswapSubmitName}
      />
    </div>
  );
}
