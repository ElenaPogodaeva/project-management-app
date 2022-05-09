import { authAction, authState, authActionType } from '../types/auth';

const initialState: authState = {
  nickname: null,
  isAuth: false,
};

// eslint-disable-next-line default-param-last
const authReducer = (state: authState = initialState, action: authAction): authState => {
  switch (action.type) {
    case authActionType.LOGIN:
      return { ...state, isAuth: true, nickname: action.payload };
    case authActionType.LOGOUT:
      return { ...state, isAuth: false, nickname: null };
    default:
      return state;
  }
};

export default authReducer;
