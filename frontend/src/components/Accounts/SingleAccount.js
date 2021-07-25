import HotswapInput from '../UsefulTools/HotswapInput';
import { UpdateAccount } from '../../store/accounts';
import { useHotswap } from '../../utils/hooks';

export default function SingleAccount ({ account }) {
  const [name, hotswapSetName, hotswapSubmitName] =
    useHotswap('name', account.name, UpdateAccount, account.id);
  const [description, hotswapSetDescription, hotswapSubmitDescription] =
    useHotswap('description', account.description, UpdateAccount, account.id);
  const [balance, hotswapSetBalance, hotswapSubmitBalance] =
    useHotswap('balance', account.balance, UpdateAccount, account.id);

  return (
    <div className='single-account-container'>
      <HotswapInput
        contents={name}
        setContents={hotswapSetName}
        onSubmitConstructor={hotswapSubmitName}
      />
      <HotswapInput
        type='textarea'
        contents={description}
        setContents={hotswapSetDescription}
        onSubmitConstructor={hotswapSubmitDescription}
      />
      <HotswapInput
        contents={balance}
        setContents={hotswapSetBalance}
        onSubmitConstructor={hotswapSubmitBalance}
      />
    </div>
  );
}
