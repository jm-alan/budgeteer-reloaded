import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function NewAccount () {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState('');

  return (
    <form className='new-account-form'>
      <input
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        className='new-account-input name'
      />
    </form>
  );
}
