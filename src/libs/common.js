export function deepCloneObject(object = {}) {
  const stringifiedobject = JSON.stringify(object);
  return JSON.parse(stringifiedobject);
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

export default {
  deepCloneObject,
  redirectTo,
};
