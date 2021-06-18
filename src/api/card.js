import apiCall from './apiRequest';
import endPoints from './endPoints';

export function fetchCard() {
  return apiCall({
    endpoint: `${endPoints.card}`,
  });
}

export function deleteCard(payload) {
  return apiCall({
    endpoint: `${endPoints.card}`,
    method: 'delete',
    payload
  });
}

export function updateCard(payload) {
  return apiCall({
    endpoint: `${endPoints.card}`,
    method: 'put',
    payload
  });
}

export default {
  fetchCard,
};
