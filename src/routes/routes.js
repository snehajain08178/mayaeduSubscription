import { LogoutRequired, LoginRequired } from 'components/RouteWrappers';
import App from 'app/App';

import Home from 'views/Home';
import Login from 'views/Login';
import endpoints from './endpoints';
import SignUp from '../views/SignUp';
import Header from '../layouts/Header';
import LogoutContainer from '../layouts/LogoutContainer';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: LogoutRequired,
        exact: true,
        routes: [
          {
            path: '/',
            component: LogoutContainer,
            exact: true,
            routes: [
              {
                component: Home
              }
            ]
          },
        ]
      },
      {
        path: endpoints.login,
        exact: true,
        component: LogoutRequired,
        routes: [
          {
            component: Login,
            exact: true
          }
        ]
      },
      {
        path: endpoints.signup,
        exact: true,
        component: LogoutRequired,
        routes: [
          {
            component: SignUp,
            exact: true
          }
        ]
      },
      {
        path: endpoints.dashboard,
        component: LoginRequired,
        routes: [
          {
            path: endpoints.dashboard,
            component: Header,
            exact: true,
            routes: [
              {
                component: Home
              }
            ]
          },
        ]
      },
    ]
  }
];
