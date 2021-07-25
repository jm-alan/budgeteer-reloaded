import csrfetch from './csrfetch';

const LOAD_ALL = 'accounts/ALL';
const UNLOAD = 'accounts/UNLOAD';
const CREATE = 'accounts/CREATE';
const UPDATE = 'accounts/UPDATE';
const DELETE = 'accounts/DELETE';

const setAccounts = accounts => ({
  type: LOAD_ALL,
  accounts
});

const createAccount = account => ({
  type: CREATE,
  account
});

const updateAccount = account => ({
  type: UPDATE,
  account
});

const deleteAccount = accountId => ({
  type: DELETE,
  accountId
});

export const GetAccounts = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/accounts/');
  dispatch(setAccounts(accounts));
};

export const CreateAccount = newAccount => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/', newAccount);
  dispatch(createAccount(account));
};

export const UpdateAccount = (accountId, data) => async dispatch => {
  const { account } = await csrfetch.patch(`/api/accounts/${accountId}/`, data);
  dispatch(updateAccount(account));
};

export const DeleteAccount = accountId => async dispatch => {
  await csrfetch.delete(`/api/accounts/${accountId}/`);
  dispatch(deleteAccount(accountId));
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
