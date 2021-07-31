import { useDispatch, useSelector } from 'react-redux';
import { DeleteAccount } from '../../store/accounts';

export default function DestroyAccount () {
  const dispatch = useDispatch();

  const currentAccount = useSelector(state => state.accounts.current);

  const onConfirm = () => dispatch(DeleteAccount(currentAccount.id));

  return currentAccount && (
    <div className='delete-confirm'>
      <h3>
        Are you you sure you want to delete {currentAccount.name}?
      </h3>
      <h3>
        This CANNOT be undone!
      </h3>
      <button onClick={onConfirm}>
        Confirm Delete
      </button>
    </div>
  );
}
