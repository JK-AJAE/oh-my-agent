import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { User } from '@/types/world';

const USER_STORAGE_KEY = 'worldcraft_user';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

interface UserActions {
  login: (displayName: string, avatarEmoji: string) => void;
  logout: () => void;
  loadUser: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (displayName, avatarEmoji) => {
    const user: User = {
      id: nanoid(),
      displayName,
      avatarEmoji,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    set({ user, isLoggedIn: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    set({ user: null, isLoggedIn: false });
  },

  loadUser: () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (!stored) return;
      const user = JSON.parse(stored) as User;
      if (user.id && user.displayName && user.avatarEmoji) {
        set({ user, isLoggedIn: true });
      }
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },
}));
