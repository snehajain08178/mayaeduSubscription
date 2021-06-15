/* eslint-disable */
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const numberRegex = new RegExp(/^[0-9]*$/);
const passwordRegex = new RegExp(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)


export function validateEmail(value = '') {
  return emailRegex.test(value);
}

export function validateNumber(value = '') {
  return numberRegex.test(value);
}

export function validateRequire(value = '') {
  return value && !!value.trim();
}

export function validatePassword(value = '') {
  return passwordRegex.test(value);
}

export default {
  validateEmail,
  validateNumber,
  validateRequire,
  validatePassword,
};
