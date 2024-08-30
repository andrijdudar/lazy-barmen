import { create } from "zustand";

const useStoreAuth = create((set) => ({

  cookies: null,
  setCookies: (cookies) => set({ cookies }),

  formLogin: false,
  setFormLogin: (formLogin) => set({ formLogin }),

  user: null,
  setUser: (user) => set({ user }),

  access_token: null,
  // access_token: JSON.parse(localStorage.getItem('access_token')) | null,
  setAccessToken: (access_token) => set({ access_token }),

  refresh_token: null,
  // refresh_token: JSON.parse(localStorage.getItem('refresh_token')) | null,
  setRefreshToken: (refresh_token) => set({ refresh_token }),

  token_type: null,
  // token_type: JSON.parse(localStorage.getItem('token_type')) | null,
  setTokenType: (token_type) => set({ token_type }),

}));

export default useStoreAuth;
