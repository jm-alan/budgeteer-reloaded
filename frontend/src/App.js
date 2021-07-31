import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Accounts from './components/Accounts';
import NavBar from './components/NavBar';
import csrfetch from './store/csrfetch';
import { RestoreUser } from './store/session';

export default function App () {
  const dispatch = useDispatch();

  const loaded = useSelector(state => state.session.loaded);

  useEffect(() => {
    csrfetch.captureDispatch(dispatch);
    csrfetch.restoreCSRF();
    dispatch(RestoreUser());
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <div id='main-site-container'>
        <Switch>
          <Route exact path='/accounts/'>
            <Accounts />
          </Route>
          <Route path='/accounts/:accountId/'>
            <Accounts />
          </Route>
          <Route path='/home/'>
            <Home />
          </Route>
          <Route>
            <Redirect to='/home/' />
          </Route>
        </Switch>
      </div>
    </>
  );
}
