import { create } from "zustand";

const useStoreAuth = create((set) => ({
  authenticated: false,
  setAuthenticated: (authenticated) => set({ authenticated }),

  user: null,
  setUser: (user) => set({ user }),


  access_token: false,
  // access_token: JSON.parse(localStorage.getItem('access_token')),
  setAccessToken: (access_token) => set({ access_token }),

  // access_token: (() => {
  //   const token = localStorage.getItem('access_token');
  //   return token ? token : null; // Не намагайтеся парсити його як JSON
  // })(),
  // setAccessToken: (access_token) => {
  //   localStorage.setItem('access_token', access_token); // Зберігайте токен у localStorage
  //   set({ access_token });
  // },

  refresh_token: null,
  // refresh_token: JSON.parse(localStorage.getItem('refresh_token')) | null,
  setRefreshToken: (refresh_token) => set({ refresh_token }),

  token_type: null,
  // token_type: JSON.parse(localStorage.getItem('token_type')) | null,
  setTokenType: (token_type) => set({ token_type }),

  loading: true,
  setLoading: (loading) => set({ loading }),
}));

export default useStoreAuth;
