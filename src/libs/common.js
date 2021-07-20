import moment from 'moment';

export function deepCloneObject(object = {}) {
  const stringifiedobject = JSON.stringify(object);
  return JSON.parse(stringifiedobject);
}

export function removeBlankFromObject(object = {}) {
  const _object = {};
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      _object[key] = object[key];
    }
  });
  return _object;
}

export function redirectTo(history, location, query) {
  let redirect = location;
  if (query) {
    redirect = `${location}${query}`;
  }
  history.push(redirect);
}

export function stringEllipisis(string = '', limit) {
  if (string && string.length > limit) {
    return `${string.substr(0, limit)} ...`;
  }
  return string;
}

export function subscriptionDateFormat(
  date,
  checkKey,
  defaultKey = 'freeTrial',
  dateFormat = 'MM-DD-YYYY'
) {
  if (defaultKey === checkKey) {
    return moment(date).utcOffset(0).format(dateFormat);
  }
  return moment(date).format(dateFormat);
}

export function generateRandomPassword() {
  const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const smallLetters = 'acdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '@#$%^&*';
  let password = '';
  for (let i = 0; i < 3; i += 1) {
    const generateCaptial = capitalLetters[Math.floor(Math.random() * 25)];
    const generateSmall = smallLetters[Math.floor(Math.random() * 25)];
    const generateNumber = numbers[Math.floor(Math.random() * 9)];
    const generateSpecial = special[Math.floor(Math.random() * 6)];
    password =
      password +
      generateCaptial +
      generateSmall +
      generateNumber +
      generateSpecial;
  }
  return password;
}

export default {
  deepCloneObject,
  redirectTo,
};
