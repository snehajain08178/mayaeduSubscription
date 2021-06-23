import apiCall from './apiRequest';
import endPoints from './endPoints';

export function login({ payload }) {
  return apiCall({
    method: 'post',
    endpoint: `${endPoints.login}`,
    payload
  });
}

export default {
  login,
};
