import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

import { BASE_URL } from '../utils';
import { IUser } from '../types';

interface AuthState {
  userProfile: IUser | null;
  allUsers: IUser[] | [];
  addUser: (user: IUser) => void;
  removeUser: () => void;
  fetchAllUsers: () => Promise<void>;
}

const authStore = (set: any): AuthState => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: IUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: response.data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
);

export default useAuthStore;
