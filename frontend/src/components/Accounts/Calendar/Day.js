import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetItemsByDate } from '../../../store/accounts';

const previousDateSelectGenerator = (date, previousDate) => state => {
  const prev = state.accounts.calendar[`${date.slice(0, 2)}/${previousDate}/${date.slice(6)}`] || null;
  return prev && prev.balance;
};

export default function Day ({ weekday, date, calendarRef }) {
  const displayDate = date.slice(3, 5);
  const dispatch = useDispatch();

  const previousDate = displayDate > 10 ? displayDate - 1 : `0${displayDate - 1}`;
  const previousDateSelector = previousDateSelectGenerator(date, previousDate);

  const prevBalance = useSelector(previousDateSelector);
  const items = useSelector(state => state.accounts.calendar[date]) ?? null;
  const currentAccount = useSelector(state => state.accounts.current);
  const currentId = currentAccount && currentAccount.id;

  const [top, setInnerTop] = useState(null);
  const [bottom, setInnerBottom] = useState(null);
  const [left, setInnerLeft] = useState(null);
  const [right, setInnerRight] = useState(null);
  const [width, setInnerWidth] = useState(null);
  const [height, setInnerHeight] = useState(null);
  const [detailMode, setDetailMode] = useState(false);
  const [resolvedParentRect, setResolvedParentRect] = useState(false);

  const freezeRef = useRef(null);

  const onClickDay = e => {
    e.stopPropagation();
    setDetailMode(true);
  };

  useEffect(() => {
    const tearDown = () => setDetailMode(false);
    const scale = () => {
      let parentRect;
      if (detailMode) {
        parentRect = calendarRef.getBoundingClientRect();
        setInnerTop(parentRect.top - 5);
        setInnerBottom(parentRect.bottom + 10);
      } else {
        parentRect = freezeRef.current.getBoundingClientRect();
        setInnerTop(parentRect.top);
        setInnerBottom(parentRect.bottom);
      }
      setInnerLeft(parentRect.left);
      setInnerRight(parentRect.right);
      setInnerWidth(parentRect.width);
      setInnerHeight(parentRect.height);
      if (!resolvedParentRect) setResolvedParentRect(true);
    };
    if (detailMode) {
      window.addEventListener('resize', scale);
      document.addEventListener('click', tearDown);
    }
    scale();
    return () => {
      window.removeEventListener('resize', scale);
      document.removeEventListener('click', tearDown);
    };
  }, [detailMode, resolvedParentRect, calendarRef]);

  useEffect(() => {
    if (displayDate === '01' || !!prevBalance) dispatch(GetItemsByDate(date, currentId));
  }, [dispatch, date, currentId, displayDate, prevBalance]);

  return (
    <div
      ref={freezeRef}
      className='calendar-freeze'
      style={{
        gridColumnStart: weekday + 1
      }}
    >
      {displayDate && resolvedParentRect && (
        (items && (
          <div
            className={`calendar-day${
            detailMode
              ? ' detail'
              : ''
          }`}
            style={{ top, bottom, left, right, width, height }}
            onClick={onClickDay}
          >
            <div className='calendar-date'>{displayDate}</div>
            <div className='calendar-items'>
              <h1>Placeholder</h1>
            </div>
          </div>
        )) || (
          <div
            className='day-loading'
            style={{ top, bottom, left, right, width, height }}
          >
            <div className='calendar-date'>{displayDate}</div>
            <h1>Loading...</h1>
          </div>
        ))}
    </div>
  );
}
