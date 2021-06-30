export const fieldNames = {
  NAME: 'institutionName',
  PERSON_TITLE: 'personTitle',
  CONTACT_PERSON: 'personName',
  EMAIL: 'email',
  CONTACT_NUMBER: 'contactNo',
  ADDRESS_1: 'address1',
  ADDRESS_2: 'address2',
  TOWN: 'town',
  COUNTRY: 'country',
  MESSAGE: 'message'
};

export const personTitle = [{ id: 'MR', name: 'Mr' }, { id: 'MS', name: 'Ms' }, { id: 'MRS', name: 'Mrs' }];

function handleChange(event, preValues) {
  const {
    name,
    value
  } = event.target || {};
  return {
    ...preValues,
    [name]: value
  };
}

function handleSelect(event, preValues) {
  const {
    name,
    value
  } = event || {};
  return {
    ...preValues,
    [name]: value
  };
}

export const fields = {
  [fieldNames.NAME]: {
    handleChange,
  },
  [fieldNames.CONTACT_PERSON]: {
    handleChange,
  },
  [fieldNames.PERSON_TITLE]: {
    handleSelect,
  },
  [fieldNames.CONTACT_NUMBER]: {
    handleChange,
  },
  [fieldNames.EMAIL]: {
    handleChange,
  },
  [fieldNames.ADDRESS_1]: {
    handleChange,
  },
  [fieldNames.ADDRESS_2]: {
    handleChange,
  },
  [fieldNames.TOWN]: {
    handleChange,
  },
  [fieldNames.COUNTRY]: {
    handleSelect,
  },
  [fieldNames.MESSAGE]: {
    handleChange
  }
};
