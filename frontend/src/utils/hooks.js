import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const useHotswap = (key, initialValue, action, ...necessaryArgs) => {
  const dispatch = useDispatch();
  const [shouldRebuild, setShouldRebuild] = useState(true);
  const [value, setValue] = useState(initialValue);
  shouldRebuild && value !== initialValue && setValue(initialValue);
  const mutable = useRef({ value, setValue });
  const mutableSetter = value => {
    mutable.current.value = value;
    mutable.current.setValue(value);
    setShouldRebuild(false);
  };
  const onSubmitConstructor = (key, { value }) => (on, after) => e => {
    e.preventDefault();
    on();
    const toUpdate = { [key]: value };
    dispatch(action(...necessaryArgs, toUpdate, after));
  };
  return [value, mutableSetter, onSubmitConstructor(key, mutable.current)];
};
