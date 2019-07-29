import * as constants from './constants';
import * as authConstants from './authConstants';

const ACTION_TYPE_PREFIX = 'APP';

/**
 * Helper function for wrapping a constant with a prefix in order to avoid potential naming conflicts.
 * Example: addActionTypePrefix('LOGIN') => 'APP@LOGIN'.
 */
export const addActionTypePrefix = actionType =>
  `${ACTION_TYPE_PREFIX}@${actionType}`;

/**
 * Helper function which wraps all constants with a prefix.
 * Calls {@function addActionTypePrefix}
 */
const actionTypePrefixes = constants =>
  Object.keys(constants).reduce(
    (previousValues, currentValue) =>
      addActionTypePrefix(constants[currentValue]),
    {}
  );

export default actionTypePrefixes({ ...constants, ...authConstants });
