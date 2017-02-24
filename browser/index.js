
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


/*------ COMPONENTS/CONTAINERS ------ */
import Root from './components/Root';
import Homepage from './components/Homepage';
import Login from './components/Login';


/*--------- ACTION CREATORS --------- */
import { findOrCreateUser } from './reducers/login';


/*--------- ON-ENTER HOOKS ---------- */
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  } else {
		const user = auth.getProfile();
		const userDetails = {
				name: `${user.given_name} ${user.family_name}`,
				email: user.email
		};
		store.dispatch(findOrCreateUser(userDetails))

ReactDOM.render(
  <Provider store={store}>
		<MuiThemeProvider>
	    <Router history={browserHistory}>
				<Route path="/" component={Root} auth={auth}>
					<Route path="/home" component={Homepage} onEnter={requireAuth}>
					<Route path="/login" component={Login} />
					<IndexRedirect to="/login" />
				</Route>
			</Router>
		</MuiThemeProvider>
  </Provider>,
  document.getElementById('app'));
