import { TearDown } from './modal';
import { HideModal } from './UX';

import csrfetch from './csrfetch';

const LOAD_ALL = 'accounts/ALL';
const UNLOAD = 'accounts/UNLOAD';
const CREATE = 'accounts/CREATE';
const UPDATE = 'accounts/UPDATE';
const DELETE = 'accounts/DELETE';
const SELECT = 'accounts/SELECT';
const DESELECT = 'accounts/DESELECT';

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

export const SelectAccount = accountId => ({
  type: SELECT,
  accountId
});

export const DeselectACcount = () => ({
  type: DESELECT
});

export const GetAccounts = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/accounts/');
  dispatch(setAccounts(accounts));
};

export const CreateAccount = (newAccount, history) => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/', newAccount);
  dispatch(createAccount(account));
  dispatch(TearDown());
  dispatch(HideModal());
  history.push(`/accounts/${account.id}`);
};

export const UpdateAccount = (accountId, data, after) => async dispatch => {
  const { account } = await csrfetch.patch(`/api/accounts/${accountId}/`, data);
  dispatch(updateAccount(account));
  setTimeout(after, 250);
};

export const DeleteAccount = (accountId) => async dispatch => {
  await csrfetch.delete(`/api/accounts/${accountId}/`);
  dispatch(deleteAccount(accountId));
};

export const UnloadAccounts = () => ({
  type: UNLOAD
});

export default function reducer (
  state = {
    all: {},
    current: null,
    allLoaded: false,
    currentLoaded: false
  },
  { type, accountId, account, accounts }
) {
  switch (type) {
    case SELECT:
      return {
        ...state,
        current: state.all[accountId],
        currentLoaded: true
      };
    case DESELECT:
      return {
        ...state,
        current: null,
        currentLoaded: false
      };
    case LOAD_ALL:
      return {
        ...state,
        all: {
          ...accounts
        },
        allLoaded: true
      };
    case CREATE:
      return {
        ...state,
        all: {
          ...state.all,
          [account.id]: account
        },
        current: account
      };
    case UPDATE:
      return {
        ...state,
        all: {
          ...state.all,
          [account.id]: account
        },
        current: state.current && (
          state.current.id === account.id
            ? account
            : state.current
        )
      };
    case DELETE:
      delete state.all[accountId];
      return {
        ...state,
        all: {
          ...state.all
        }
      };
    case UNLOAD:
      return {
        ...state,
        all: {},
        allLoaded: false
      };
    default:
      return state;
  }
}
