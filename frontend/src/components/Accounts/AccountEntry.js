import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AccountEntry ({ account }) {
  const history = useHistory();

  const currentAccount = useSelector(state => state.accounts.current);

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
      <span className='account-entry-name'>
        {account.name}
      </span>
    </div>
  );
}
