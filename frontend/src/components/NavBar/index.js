import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import { SetModal } from '../../store/modal';
import { LogOut } from '../../store/session';
import { ShowModal } from '../../store/UX';

import './index.css';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const popLogin = () => {
    dispatch(SetModal(LoginForm));
    dispatch(ShowModal());
  };

  const popSignup = () => {
    dispatch(SetModal(SignupForm));
    dispatch(ShowModal());
  };

  const logOut = () => dispatch(LogOut());

  useEffect(() => {
    const hideMenu = () => setShowMenu(false);
    showMenu && document.addEventListener('click', hideMenu);
    return () => document.removeEventListener('click', hideMenu);
  });

  return (
    <div className='nav-position-container'>
      <div
        className={`nav-menu${showMenu ? ' expand' : ''}`}
      >
        <div
          className='nav'
          onClick={() => !showMenu && setShowMenu(true)}
        >
          Me
          {user
            ? (
              <>
                <NavLink to='/users/me/'>
                  My Profile
                </NavLink>
                <button onClick={logOut}>
                  Log Out
                </button>
              </>
              )
            : (
              <>
                <button onClick={popLogin}>
                  Log In
                </button>
                <button onClick={popSignup}>
                  Sign Up
                </button>
              </>
              )}
        </div>
      </div>
    </div>
  );
}
