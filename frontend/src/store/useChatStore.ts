import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type Store = {
  messages: [];
  users: [];
  selectedUser: string | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser : (userId: string) => void
};

export const useChatStore = create<Store>()((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const resp = await axiosInstance.get("/messages/users");
      set({ users: resp.data });
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log("Error in getting users", axiosError);
      if (axiosError.response) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("Error in getting users");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log("Error in getting messages", axiosError);
      if (axiosError.response) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("Error in getting Messgaes");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser : (userId: string) => set({selectedUser: userId}),
}));
