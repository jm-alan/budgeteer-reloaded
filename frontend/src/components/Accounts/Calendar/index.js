import { useState, useEffect, useRef } from 'react';

import Day from './Day';

export default function Calendar () {
  const [, reload] = useState();
  const [resolvedRect, setResolvedRect] = useState(false);

  const dateRef = useRef(new Date());
  const calendarRef = useRef(null);

  const forward = () => {
    const now = dateRef.current.getMonth();
    dateRef.current.setMonth(now === 11 ? 0 : now + 1);
    reload(_ => !_);
  };

  const backward = () => {
    const now = dateRef.current.getMonth();
    dateRef.current.setMonth(now === 0 ? 11 : now - 1);
    reload(_ => !_);
  };

  const datesKV = Object.entries(dateRef.current.toEnumeratedMonthObject());

  useEffect(() => {
    setResolvedRect(true);
  }, []);

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
