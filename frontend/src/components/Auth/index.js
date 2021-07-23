import { useDispatch } from 'react-redux';

import DemoLogin from './DemoLogin';
import { ClearErrors } from '../../store/errors';

export default function Auth ({ onSubmit, children }) {
  const dispatch = useDispatch();

  const wrappedSubmit = e => {
    e.preventDefault();
    dispatch(ClearErrors());
    onSubmit();
  };

  return (
    <form
      onSubmit={wrappedSubmit}
      className='auth-form'
    >
      {children}
      <DemoLogin />
    </form>
  );
}
