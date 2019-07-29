import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

const getError = (field, error) => {
  if (!isEmpty(error) && field && error[field]) {
    return error[field];
  }

  if (isEmpty(field) && !isObject(error)) {
    return error;
  }

  return null;
};

const ErrorBox = ({ field, error }) => {
  return <div style={{ color: 'red' }}>{getError(field, error)}</div>;
};

export default ErrorBox;
