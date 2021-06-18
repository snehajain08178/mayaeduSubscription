import apiCall from './apiRequest';
import endPoints from './endPoints';

export function fetchCard() {
  return apiCall({
    endpoint: `${endPoints.card}`,
  });
}

export default {
  fetchCard,
};
