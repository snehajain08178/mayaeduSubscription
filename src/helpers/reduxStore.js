let reduxStoreRef = null;

export function setReduxStoreRef(storeRef) {
  reduxStoreRef = storeRef;
}

export function getReduxStoreRef() {
  return reduxStoreRef;
}

export default {
  setReduxStoreRef,
  getReduxStoreRef,
};
