interface authState {
  nickname: string | null;
  isAuth: boolean;
}

// eslint-disable-next-line no-shadow
export enum authActionType {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

interface loginAction {
  type: authActionType.LOGIN;
  payload: string;
}

interface logoutAction {
  type: authActionType.LOGOUT;
}

type authAction = loginAction | logoutAction;

export type { authAction, authState };
