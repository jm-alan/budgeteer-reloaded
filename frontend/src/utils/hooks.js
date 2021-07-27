import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const useHotswap = (key, initialValue, action, ...necessaryArgs) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const [shouldRebuild, setShouldRebuild] = useState(true);
  const catchDesync = () => {
    setValue(initialValue);
    setShouldRebuild(false);
  };
  shouldRebuild && value !== initialValue && catchDesync();
  const onSubmitConstructor = (key, value) => (on, after) => e => {
    e.preventDefault();
    on();
    dispatch(action(...necessaryArgs, { [key]: value }, after));
  };
  return [value, setValue, onSubmitConstructor(key, value)];
};
