import apiCall from './apiRequest';
import endPoints from './endPoints';

export function fetchUserDetails() {
  return apiCall({
    endpoint: `${endPoints.userDetails}`,
  });
}

export default {
  fetchUserDetails,
};
