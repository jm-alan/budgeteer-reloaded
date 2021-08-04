import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetItemsByDate, UnloadItemsByDate } from '../../../store/accounts';

export default function Day ({ weekday, date, calendarRef, balance }) {
  const dispatch = useDispatch();

  const items = useSelector(state => state.accounts.currentItems[date]) ?? null;
  const currentAccount = useSelector(state => state.accounts.current);

  const [resolvedParentRect, setResolvedParentRect] = useState(false);
  const [top, setInnerTop] = useState(null);
  const [bottom, setInnerBottom] = useState(null);
  const [left, setInnerLeft] = useState(null);
  const [right, setInnerRight] = useState(null);
  const [width, setInnerWidth] = useState(null);
  const [height, setInnerHeight] = useState(null);
  const [detailMode, setDetailMode] = useState(false);

  const freezeRef = useRef(null);

  // const itemList = items && Object.values(items);

  // if (itemList) {
  //   for (let i = 0; i < itemList.length; i++) {
  //     balance += +itemList[i].amount;
  //   }
  // }

  const displayDate = date.slice(3, 5);

  const onClickDay = e => {
    const calendarRect = calendarRef.getBoundingClientRect();
    e.stopPropagation();
    setDetailMode(true);
    setInnerTop(calendarRect.top - 5);
    setInnerBottom(calendarRect.bottom + 10);
    setInnerLeft(calendarRect.left);
    setInnerRight(calendarRect.right);
    setInnerWidth(calendarRect.width);
    setInnerHeight(calendarRect.height);
  };

  useEffect(() => {
    currentAccount && dispatch(GetItemsByDate(date, currentAccount.id));
    return () => dispatch(UnloadItemsByDate(date));
  }, [dispatch, currentAccount, date]);

  useEffect(() => {
    const tearDown = () => {
      const parentRect = freezeRef.current.getBoundingClientRect();
      setDetailMode(false);
      setInnerTop(parentRect.top);
      setInnerBottom(parentRect.bottom);
      setInnerLeft(parentRect.left);
      setInnerRight(parentRect.right);
      setInnerWidth(parentRect.width);
      setInnerHeight(parentRect.height);
    };
    if (detailMode) document.addEventListener('click', tearDown);
    return () => document.removeEventListener('click', tearDown);
  }, [detailMode, setDetailMode]);

  useEffect(() => {
    const parentRect = freezeRef.current.getBoundingClientRect();
    setInnerTop(parentRect.top);
    setInnerBottom(parentRect.bottom);
    setInnerLeft(parentRect.left);
    setInnerRight(parentRect.right);
    setInnerWidth(parentRect.width);
    setInnerHeight(parentRect.height);
    setResolvedParentRect(true);
  }, []);

  return (
    <div
      ref={freezeRef}
      className='calendar-freeze'
      style={{
        gridColumnStart: weekday + 1
      }}
    >
      {(resolvedParentRect && items && (
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
        <div className='day-loading'>
          <div className='calendar-date'>{displayDate}</div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
