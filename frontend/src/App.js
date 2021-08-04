import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Accounts from './components/Accounts';
import Sidebar from './components/Sidebar';
import { Load } from './store/session';

export default function App () {
  const dispatch = useDispatch();

  const loaded = useSelector(state => state.session.loaded);

  useEffect(() => {
    dispatch(Load());
  }, [dispatch]);

  return loaded && (
    <div id='main-site-container'>
      <Sidebar />
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
  );
}
