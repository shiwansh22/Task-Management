import { create } from "zustand";
import { saveAccessToken, clearTokens } from "@/src/lib/auth";

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  login: (token) => {
    saveAccessToken(token);
    set({ isAuthenticated: true });
  },

  logout: () => {
    clearTokens();
    set({ isAuthenticated: false });
  },
}));
