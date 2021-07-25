import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const useHotswap = (key, initialValue, action, ...necessaryArgs) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const mutable = useRef({
    value,
    setValue
  });
  const mutableSetter = value => {
    mutable.current.value = value;
    mutable.current.setValue(value);
  };
  const onSubmitConstructor = (key, { value }) => (on, after) => e => {
    e.preventDefault();
    on();
    const toUpdate = { [key]: value };
    dispatch(action(...necessaryArgs, toUpdate, after));
  };
  return [value, mutableSetter, onSubmitConstructor(key, mutable.current)];
};
