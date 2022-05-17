interface authState {
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

export type { authState };
