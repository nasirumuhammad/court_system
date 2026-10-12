import { create } from "zustand";

import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
} from "../services/auth.service";

const useAuthStore = create((set) => ({
  // State
  user: null,
  isAuthenticated: false,

  // Used for login/logout actions
  isLoading: false,

  // Used only when the app first loads
  isCheckingAuth: true,

  // Login
  login: async (credentials) => {
    set({ isLoading: true });

    try {
      await loginService(credentials);

      const { user } = await getCurrentUser();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await logoutService();
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  // Runs when the app starts
  checkAuth: async () => {
    
    try {
      const { user } = await getCurrentUser();

      set({
        user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));

export default useAuthStore;