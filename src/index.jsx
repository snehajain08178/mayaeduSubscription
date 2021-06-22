import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import ErrorBoundary from 'components/ErrorBoundary';
import initStore from 'redux/store';
import routes from 'routes/routes';
import { ConnectedRouter } from 'connected-react-router';
import Notification from './components/Notifications';

import './scss/styles.scss';
import history from './libs/history';
import coreuiIcons from './assets/coreuiIcons';

const initialState = {};
const store = initStore(initialState, history);

React.icons = coreuiIcons;

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Notification />
      <ConnectedRouter history={ history }>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
