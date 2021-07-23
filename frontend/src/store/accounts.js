import csrfetch from './csrfetch';

const LOAD_ALL = 'accounts/ALL';
const UNLOAD = 'accounts/UNLOAD';

const setAccounts = accounts => ({
  type: LOAD_ALL,
  accounts
});

export const GetAccounts = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/accounts/');

  dispatch(setAccounts(accounts));
};

export const UnloadAccounts = () => ({
  type: UNLOAD
});

export default function reducer (
  state = { all: {}, current: null, loaded: false },
  { type, accounts }
) {
  switch (type) {
    case LOAD_ALL:
      return {
        ...state,
        all: {
          ...accounts
        },
        loaded: true
      };
    case UNLOAD:
      return {
        ...state,
        all: {},
        loaded: false
      };
    default:
      return state;
  }
}
