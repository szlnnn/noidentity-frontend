import { create } from "zustand";

interface AuthToken {
  token?: string;
  role?: string;
  login?: string;
}

interface AuthTokenStore {
  authToken: AuthToken;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  setLogin: (login: string) => void;
}

const useAuthToken = create<AuthTokenStore>((set) => ({
  authToken: {},
  setToken: (token) =>
    set((store) => ({ authToken: { ...store.authToken, token } })),
  setRole: (role) =>
    set((store) => ({ authToken: { ...store.authToken, role } })),
  setLogin: (login) =>
    set((store) => ({ authToken: { ...store.authToken, login } })),
}));

export default useAuthToken;
