import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const useHotswap = (key, initialValue, action) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const mutable = useRef({
    [key]: {
      value,
      setValue
    }
  });
  const setConstructor = key => value => {
    mutable.current[key] = value;
    mutable.current[key].setValue(value);
  };
  const onSubmitConstructor = (key, { value }) => (on, after) => e => {
    e.preventDefault();
    on();
    const toUpdate = { [key]: value };
    dispatch(action(toUpdate, after));
  };
  return [value, setConstructor(key), onSubmitConstructor(key, mutable.current[key])];
};
