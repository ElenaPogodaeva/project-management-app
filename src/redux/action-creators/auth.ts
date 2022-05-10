import { Dispatch } from 'react';
import { authActionType } from '../types/auth';

const logout = () => {
  return { type: authActionType.LOGOUT };
};

// eslint-disable-next-line import/prefer-default-export
export { logout };
