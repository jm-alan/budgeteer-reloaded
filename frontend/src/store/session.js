import csrfetch from './csrfetch';
import { TearDown } from './modal';
import { HideModal } from './UX';

const SET_USER = 'session/SET';

const setSession = (user = null) => ({
  type: SET_USER,
  user
});

export const Load = () => async dispatch => {
  const { user } = await csrfetch.get('/api/session/');
  await csrfetch.restoreCSRF();
  csrfetch.captureDispatch(dispatch);
  dispatch(setSession(user));
};

export const LogIn = (identification, password) => async dispatch => {
  const { user } = await csrfetch.post('/api/session/', { identification, password });
  dispatch(setSession(user));
  if (user) {
    dispatch(TearDown());
    dispatch(HideModal());
  }
};

export const SignUp = (username, email, password) => async dispatch => {
  const { user } = await csrfetch.post('/api/users/', { username, email, password });
  dispatch(setSession(user));
  if (user) {
    dispatch(TearDown());
    dispatch(HideModal());
  }
};

export const LogOut = () => async dispatch => {
  await csrfetch.delete('/api/session/');
  dispatch(setSession());
};

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case SET_USER:
      return { user, loaded: true };
    default:
      return state;
  }
}
