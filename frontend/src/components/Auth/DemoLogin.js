import { useDispatch } from 'react-redux';

import { LogIn } from '../../store/session';

export default function DemoLogin () {
  const dispatch = useDispatch();

  const demoLogin = () => dispatch(LogIn('demo@website.io', 'password'));

  return (
    <button type='button' onClick={demoLogin}>
      Demo User
    </button>
  );
}
