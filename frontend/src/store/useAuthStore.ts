import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

type Store = {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: any[];
  socket: any;

  checkAuth: () => Promise<void>;
  signup: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { profilePic: string }) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const useAuthStore = create<Store>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("error in checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("User created successfully");
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        console.log("error in Signup", error);
        toast.error(axiosError.response.data.message);
      } else {
        console.log("error in Signup", error);
        toast.error("Error in Signup");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: { email: string; password: string }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        console.log("error in login", error);
        toast.error(axiosError.response.data.message);
      } else {
        console.log("error in login", error);
        toast.error("Error in login");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
      get().disconnectSocket();
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        console.log("error in Logout", error);
        toast.error(axiosError.response.data.message);
      } else {
        console.log("error in Logout", error);
        toast.error("Error in Logout");
      }
    }
  },

  updateProfile: async (data: { profilePic: string }) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post("/auth/updateProfile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        console.log("error in updateProfile", error);
        toast.error(
          axiosError.response.data.message || "Error in uploading profile"
        );
      } else {
        console.log("error in updateProfile", error);
        toast.error("Error in updateProfile");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },



  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;



    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
