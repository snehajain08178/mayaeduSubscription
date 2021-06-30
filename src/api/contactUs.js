import apiCall from './apiRequest';
import endPoints from './endPoints';

export function saveContactUs({ payload }) {
  return apiCall({
    endpoint: `${endPoints.contactUs}`,
    payload,
    method: 'post',
  });
}

export default {
  saveContactUs,
};
