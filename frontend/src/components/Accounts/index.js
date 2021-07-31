import SingleAccountPage from './SingleAccountPage';
import AccountsList from './AccountsList';

import './index.css';

export default function Accounts () {
  return (
    <div className='page-container accounts'>
      <AccountsList />
      <SingleAccountPage />
    </div>
  );
}
