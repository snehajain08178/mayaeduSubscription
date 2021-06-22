export function cloneDeep(collection) {
  return JSON.parse(JSON.stringify(collection));
}

export function findObjectIndex(params = {}) {
  const array = params.array || [];
  const byKey = params.byKey || 'id';
  const valueToFind = params.forValue;

  for (let index = 0; index < array.length; index += 1) {
    const value = array[index][byKey];
    if (value && (value === valueToFind)) {
      return index;
    }
  }
  return -1;
}

export function checkForSelectedAll({ items = [], selectedRowsIds = [], keyToMatch = '_id' }) {
  let isCheckedAll = false;
  const filtered = items.filter((listItem) => selectedRowsIds.includes(listItem[keyToMatch]));
  if (items.length && filtered.length === items.length) {
    isCheckedAll = true;
  }
  return isCheckedAll;
}

export function getFileObject({ fileObject = {}, id = null, isProcessing = false }) {
  let fileName = '';
  let size = '';
  if (fileObject && fileObject.name) {
    fileName = fileObject.name;
    size = fileObject.size;
  }
  return {
    fileName,
    size,
    id,
    isProcessing,
  };
}

export function getCardNumberFormat(month, year) {
  let number = '';
  if (parseInt(month, 10) < 10) {
    number = `0${String(month)} / ${year}`;
  } else {
    number = `${String(month)} / ${year}`;
  }
  return number;
}

export default {
  cloneDeep,
  getFileObject,
  getCardNumberFormat
};
