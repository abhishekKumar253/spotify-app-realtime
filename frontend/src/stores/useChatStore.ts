import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface ChatStore {
  users: any[];
  isLoading: boolean;
  error: string | null;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;

  fetchUsers: () => Promise<void>;
}

export const userChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  onlineUsers: new Set(),
  userActivities: new Map(),

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/users');
      set({ users: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));
