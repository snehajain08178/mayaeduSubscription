import superagent from 'superagent';
import config from 'config';
import { getToken } from 'libs/auth';
import { getReduxStoreRef } from '../helpers/reduxStore';
import { API_ERROR_INVALID_TOKEN } from '../redux/store/constants';

/*
 * @function "call" common method that makes api requests
 * @param {object} "request" stores the request 'method','endpoint', 'payload', 'query',
 * 'token' as keys...'
 */
export default function call({
  method = 'get',
  url,
  endpoint,
  payload,
  query,
  token,
  type = 'application/json'
}) {
  const { API } = config;
  const store = getReduxStoreRef();
  const _url = url || `${API.BASE_URL}/${endpoint}`;
  const _apiRequest = superagent(method, _url);

  if (API.WEB_API_KEY) {
    _apiRequest.set('apiKey', API.WEB_API_KEY);
  }

  return (
    new Promise((resolve, reject) => {
      _apiRequest
        .set('Authorization', `${token || getToken()}`)
        .set('Content-Type', type)
        .send(payload)
        .query(query)
        .then(resolve)
        .catch((error) => {
          const errorBody = (error.response && error.response.body) || {};
          if (errorBody && errorBody.code === 'UNAUTHORIZED') {
            store.dispatch({ type: API_ERROR_INVALID_TOKEN });
          }
          reject(errorBody);
        });
    })
  );
}
