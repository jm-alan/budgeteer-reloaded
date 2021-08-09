import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { UnloadItems } from '../../../store/accounts';

import Day from './Day';

export default function Calendar () {
  const dispatch = useDispatch();

  const [, _] = useState();
  const [resolvedRect, setResolvedRect] = useState(false);

  const reload = () => _($ => !$);

  const dateRef = useRef(new Date());
  const calendarRef = useRef(null);

  const forward = () => {
    const now = dateRef.current.getMonth();
    dateRef.current.setMonth(now === 11 ? 0 : now + 1);
    dispatch(UnloadItems());
    reload();
  };

  const backward = () => {
    const now = dateRef.current.getMonth();
    dateRef.current.setMonth(now === 0 ? 11 : now - 1);
    dispatch(UnloadItems());
    reload();
  };

  const datesKV = Object.entries(dateRef.current.toEnumeratedMonthObject());

  useEffect(() => {
    setResolvedRect(true);
    return () => dispatch(UnloadItems());
  }, [dispatch]);

  return (
    <>
      <div className='calendar-header'>
        <button
          className='calendar-control backward'
          onClick={backward}
        >
          Prev
        </button>
        <button
          className='calendar-control forward'
          onClick={forward}
        >
          Next
        </button>
      </div>
      <div ref={calendarRef} className='calendar-container'>
        {resolvedRect && datesKV.map(kv => (
          <Day calendarRef={calendarRef.current} key={kv[0]} date={kv[0]} weekday={kv[1]} />
        ))}
      </div>
    </>
  );
}
