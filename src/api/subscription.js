import apiCall from './apiRequest';
import endPoints from './endPoints';

export function fetchSubscriptionDetails() {
  return apiCall({
    endpoint: `${endPoints.subscription}/details`,
  });
}

export function createSubscription(payload) {
  return apiCall({
    method: 'post',
    endpoint: `${endPoints.transactionSubscription}`,
    payload,
  });
}

export default {
  fetchSubscriptionDetails,
};
