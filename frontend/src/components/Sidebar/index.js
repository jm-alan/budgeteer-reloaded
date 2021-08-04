import AccountsList from '../Accounts/AccountsList';
import NavBar from '../NavBar';

export default function Sidebar () {
  return (
    <div className='sidebar'>
      <NavBar />
      <AccountsList />
    </div>
  );
}
