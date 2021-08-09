import { TearDown } from './modal';
import { HideModal } from './UX';

import csrfetch from './csrfetch';

const LOAD_ALL = 'accounts/ALL';
const LOAD_CALENDAR = 'accounts/CALENDAR';
const LOAD_ITEMS = 'accounts/ITEMS';
const UNLOAD = 'accounts/UNLOAD';
const UNLOAD_ITEMS = 'accounts/UNLOAD_ITEMS';
const CREATE = 'accounts/CREATE';
const UPDATE = 'accounts/UPDATE';
const DELETE = 'accounts/DELETE';
const SELECT = 'accounts/SELECT';
const DESELECT = 'accounts/DESELECT';
const VIEW_CALENDAR = 'accounts/VIEW_CALENDAR';
const VIEW_ITEMS = 'accounts/VIEW_ITEMS';
const RESOLVE_BALANCE = 'accounts/RESOLVE_BALANCE';

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

const loadCalendarItems = (date, items) => ({
  type: LOAD_CALENDAR,
  date,
  items
});

const loadItems = items => ({
  type: LOAD_ITEMS,
  items
});

export const ResolveBalance = (date, balance) => ({
  type: RESOLVE_BALANCE,
  date,
  balance
});

export const UnloadItems = () => ({
  type: UNLOAD_ITEMS
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

export const GetItemsByDate = (date, accountId) => async dispatch => {
  const { items } = await csrfetch.get(`/api/accounts/${accountId}/items/${date}/`);
  dispatch(loadCalendarItems(date, items));
};

export const GetAllAccountItems = accountId => async dispatch => {
  const { items } = await csrfetch.get(`/api/accounts/${accountId}/items/`);
  dispatch(loadItems(items));
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
  dispatch(TearDown());
  dispatch(HideModal());
};

export const UnloadAccounts = () => ({
  type: UNLOAD
});

export default function reducer (
  state = {
    all: {},
    calendar: {},
    current: null,
    allLoaded: false,
    currentLoaded: false,
    viewMode: null
  },
  { type, accountId, account, accounts, items, date, balance }
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
        currentLoaded: false,
        viewMode: null
      };
    case RESOLVE_BALANCE:
      return {
        ...state,
        calendar: {
          ...state.calendar,
          [date]: {
            ...state.calendar[date],
            balance
          }
        }
      };
    case VIEW_CALENDAR:
      return {
        ...state,
        viewMode: 'calendar'
      };
    case VIEW_ITEMS:
      return {
        ...state,
        viewMode: 'items'
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
        },
        current: null
      };
    case LOAD_ITEMS:
      return {
        ...state,
        calendar: items
      };
    case LOAD_CALENDAR:
      return {
        ...state,
        calendar: {
          ...state.calendar,
          [date]: {
            items,
            balance: null
          }
        }
      };
    case UNLOAD_ITEMS:
      return {
        ...state,
        calendar: {}
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
