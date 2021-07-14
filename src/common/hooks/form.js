import { useState } from 'react';

const useForm = ({
  initialValues, fields, handleSubmit: _handleSubmit, validate, validateOnBlur
}) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isFormDirty, setFormDirty] = useState(false);

  const handleSubmit = (event, key = '') => {
    if (event) event.preventDefault();

    setFormDirty(true);
    const validationErrors = validate({ values }, key) || {};
    if (!Object.keys(validationErrors).length) {
      _handleSubmit(values, key);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (event, key = '') => {
    const { target: { name } } = event;
    if (event.persist) {
      event.persist();
    }
    const updatedValues = fields[name].handleChange(event, values);
    setValues(updatedValues);
    if (isFormDirty) {
      const validationErrors = validate({ values: updatedValues }, key) || {};
      setErrors(validationErrors);
    }
  };

  const handleToggle = (name) => (value) => {
    const updatedValues = fields[name].handleToggle({ name, value }, values);
    setValues(updatedValues);
    if (isFormDirty) {
      const validationErrors = validate({ values: updatedValues }) || {};
      setErrors(validationErrors);
    }
  };

  const handleSelect = (name) => (value, key) => {
    const updatedValues = fields[name].handleSelect({ name, value }, values);
    setValues(updatedValues);
    if (isFormDirty) {
      const validationErrors = validate({ values: updatedValues }, key) || {};
      setErrors(validationErrors);
    }
  };

  const handleBlur = (key) => {
    if (validateOnBlur) {
      setFormDirty(true);
    }
    if (isFormDirty) {
      const validationErrors = validate({ values }, key) || {};
      setErrors(validationErrors);
    }
  };

  const handleKeyUp = (event, key) => {
    if (event.keyCode === 13) {
      handleSubmit(event, key);
    }
  };

  return {
    values,
    setValues,
    reset: () => {
      setFormDirty(false);
      setErrors({});
      setValues(initialValues);
    },
    isFormDirty,
    errors,
    events: {
      onSubmit: handleSubmit,
      onBlur: handleBlur,
      onChange: handleChange,
      onToggle: handleToggle,
      onKeyUp: handleKeyUp,
      onSelect: handleSelect,
    },
  };
};

export default useForm;
