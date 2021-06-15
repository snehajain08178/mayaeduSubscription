export function getToken() {
  return localStorage.getItem('AUTH_ACCESS_TOKEN');
}

export function isTokenAvailable() {
  try {
    const token = getToken();
    return !(!token || token === 'null');
  } catch (e) {
    return false;
  }
}
