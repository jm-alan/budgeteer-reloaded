import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Day ({ date }) {
  const dispatch = useDispatch();

  return (
    <div className='calendar-day'>
      <h1>Placeholder</h1>
    </div>
  );
}
