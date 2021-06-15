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

export default {
  deepCloneObject,
  redirectTo,
};
