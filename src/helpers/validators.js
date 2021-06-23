/* eslint-disable */
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const numberRegex = new RegExp(/^[0-9]*$/);
const passwordRegex = new RegExp(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)
const nameRegex = new RegExp(/^([a-zA-Z\s\'\-\.\‘\’])*$/)
const upperCase = new RegExp(/[A-Z]+/)
const lowerCase = new RegExp(/[a-z]+/)
const specialCharacters = new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
const numberExistRegex = new RegExp(/[0-9]+/);

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

export function validateName(value = '') {
  return nameRegex.test(value);
}

export function validateUpperCase(value = '') {
  return upperCase.test(value);
}

export function validateLowerCase(value = '') {
  return lowerCase.test(value);
}

export function validateSpecialCharacters(value = '') {
  return specialCharacters.test(value);
}

export function validateNumberExist(value = '') {
  return numberExistRegex.test(value);
}

export default {
  validateEmail,
  validateNumber,
  validateRequire,
  validatePassword,
  validateName,
  validateUpperCase,
  validateLowerCase,
  validateSpecialCharacters,
  validateNumberExist
};
