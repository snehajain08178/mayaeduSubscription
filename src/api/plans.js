import apiCall from './apiRequest';
import endPoints from './endPoints';

export function fetchPlans() {
  return apiCall({
    endpoint: `${endPoints.plans}`,
  });
}

export default {
  fetchPlans,
};
