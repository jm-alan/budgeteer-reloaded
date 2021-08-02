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
    reload();
  };

  const backward = () => {
    const now = dateRef.current.getMonth();
    dateRef.current.setMonth(now === 0 ? 11 : now - 1);
    reload();
  };

  const datesKV = Object.entries(dateRef.current.toEnumeratedMonthObject());

  useEffect(() => {
    setResolvedRect(true);
  }, []);

  return (
    <div ref={calendarRef} className='calendar-container'>
      {resolvedRect && datesKV.map(kv => (
        <Day calendarRef={calendarRef.current} key={kv[0]} date={kv[0]} weekday={kv[1]} />
      ))}
    </div>
  );
}
