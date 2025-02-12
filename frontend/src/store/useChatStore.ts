import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

type User = {
  createdAt: Date;
  email: string;
  fullName: string;
  profilePic: string | null;
  updatedAt: Date;
  __v?: any;
  _id?: any;
};
type Store = {
  messages: [];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  sendMessage: (messageData: any) => Promise<void>;
  subscribeToMessage: () => void;
  unsubscribeToMessage: () => void;
};

export const useChatStore = create<Store>()((set, get) => ({
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

    // await new Promise<void>((resolve, reject) => {
    //   setTimeout(() => {
    //    resolve();
    //   }, 10000);
    // })

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

  setSelectedUser: (user: User | null) => set({ selectedUser: user }),

  sendMessage: async (messageData: any) => {
    try {
      const { selectedUser, messages } = get();

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      );
      //@ts-ignore
      set({ messages: [...messages, res.data] });
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log("Error in sending message", axiosError);

      toast.error("Error in sending message");
    }
  },

  subscribeToMessage: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();

    // console.log("selectedUser",selectedUser)

    //@ts-ignore
    socket.on("newMessage", (message) => {
      // console.log("message",message)
      const isMessageSentFromSelectedUser = message.senderId == selectedUser._id
      if(!isMessageSentFromSelectedUser) return;
      //@ts-ignore
      set({ messages: [...get().messages, message] });
    });
  },

  unsubscribeToMessage: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },


}));
