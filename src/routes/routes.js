import { LogoutRequired, LoginRequired } from 'components/RouteWrappers';
import App from 'app/App';

import Home from 'views/Home';
import Login from 'views/Login';
import endpoints from './endpoints';
import SignUp from '../views/SignUp';
import LogoutContainer from '../layouts/LogoutContainer';
import Plans from '../views/Plans';
import LoginContainer from '../layouts/LoginContainer';
import Profile from '../views/Profile';
import withPropProvider from '../common/providers/withPropProvider';
import UpdateCard from '../views/Payment/UpdateCard';
import Payment from '../views/Payment';

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
            component: withPropProvider(LoginContainer, {
              isSignUp: true,
            }),
            exact: true,
            routes: [
              {
                component: Home,
              },
            ],
          },
        ],
      },
      {
        path: endpoints.login,
        exact: true,
        component: LogoutRequired,
        routes: [
          {
            component: withPropProvider(LoginContainer, {
              isLogin: true,
            }),
            exact: true,
            routes: [
              {
                component: Login,
              },
            ],
          },
        ],
      },
      {
        path: endpoints.signup,
        exact: true,
        component: LogoutRequired,
        routes: [
          {
            component: withPropProvider(LoginContainer, {
              isSignUp: true,
            }),
            exact: true,
            routes: [
              {
                component: SignUp,
              },
            ],
          },
        ],
      },
      {
        path: endpoints.plans,
        component: LoginRequired,
        routes: [
          {
            path: endpoints.plans,
            component: LogoutContainer,
            exact: true,
            routes: [
              {
                component: Plans,
              },
            ],
          },
        ],
      },
      {
        path: endpoints.profile,
        component: LoginRequired,
        routes: [
          {
            path: endpoints.profile,
            component: LogoutContainer,
            exact: true,
            routes: [
              {
                component: Profile,
              },
            ],
          },
        ],
      },
      {
        path: endpoints.profile,
        component: LoginRequired,
        routes: [
          {
            path: endpoints.profile,
            component: LogoutContainer,
            exact: true,
            routes: [
              {
                component: Profile,
              },
            ],
          },
        ],
      },
      {
        path: endpoints.payment,
        component: LoginRequired,
        routes: [
          {
            path: endpoints.payment,
            component: LogoutContainer,
            exact: true,
            routes: [
              {
                component: Payment,
              },
            ],
          },
        ],
      },
      {
        path: endpoints.updateCard,
        component: LoginRequired,
        routes: [
          {
            path: endpoints.updateCard,
            component: LogoutContainer,
            exact: true,
            routes: [
              {
                component: UpdateCard,
              },
            ],
          },
        ],
      },
    ],
  },
];
