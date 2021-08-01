import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CreateAccount } from '../../store/accounts';

export default function NewAccount () {
  const dispatch = useDispatch();

  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState('');

  const validateBalance = ({ target: { value } }) => {
    setBalance(prev => {
      if (
        !value ||
        value.match(/^[0-9]+$/) ||
        value.match(/^[0-9]+\.[0-9]{0,2}$/)
      ) return value;
      return prev;
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(CreateAccount({ name, balance, description }, history));
  };

  return (
    <form
      className='new-account-form'
      onSubmit={onSubmit}
    >
      <div className='new-account subcontainer organizer'>
        <label>
          Account Name
        </label>
        <input
          required
          placeholder='My Account'
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          className='new-account-input name'
        />
      </div>
      <div className='new-account subcontainer organizer'>
        <label className='account-starting-balance-label'>
          Starting Balance $
        </label>
        <input
          required
          placeholder='e.g. 1000, 1000.00'
          value={balance}
          onChange={validateBalance}
          className='new-account-input balance'
        />
      </div>
      <div className='new-account subcontainer organizer'>
        <label>
          Account Description
        </label>
        <textarea
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
          className='new-account-input description'
        />
      </div>
      <button className='new-account submit'>
        Create
      </button>
    </form>
  );
}
