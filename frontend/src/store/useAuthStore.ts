import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data:{fullName: string, email: string, password: string}) => {

    set({isSigningUp: true})
    try {
        const res  = await axiosInstance.post("/auth/signup",data)
        set({authUser: res.data})
        toast.success("User created successfully")
    } catch (error) {
      const axiosError = error as AxiosError<any>
      if(axiosError.response){
        
        console.log("error in Signup",error)
        toast.error(axiosError.response.data.message )

      }else{
        console.log("error in Signup",error)
        toast.error("Error in Signup")

      }
    }
    finally{
        set({isSigningUp: false})
    }
  },

  login: async(data:{email:string, password: string})=>{
    set({isLoggingIn: true})
    try {

        const res = await axiosInstance.post("/auth/login",data)
        set({authUser: res.data})
        
    } catch (error) {
      const axiosError = error as AxiosError<any>
      if(axiosError.response){
        
        console.log("error in login",error)
        toast.error(axiosError.response.data.message )

      }else{
        console.log("error in login",error)
        toast.error("Error in login")
        
      }

    }finally{
        set({isLoggingIn: false})
    }
  },

  logout: async()=>{
    try {
        
        await axiosInstance.post("/auth/logout")
        set({authUser: null})
        toast.success("Logout successfully")

    } catch (error) {
      const axiosError = error as AxiosError<any>
      if(axiosError.response){
        
        console.log("error in Logout",error)
        toast.error(axiosError.response.data.message )

      }else{
        console.log("error in Logout",error)
        toast.error("Error in Logout")

      }

    }
  },


  updateProfile: async (data:{profilePic: string})=>{
    set({isUpdatingProfile: true})
    try {
        const res = await axiosInstance.post("/auth/updateProfile",data)
        set({authUser: res.data})
        toast.success("Profile updated successfully")
    } catch (error) {
      const axiosError = error as AxiosError<any>
      if(axiosError.response){
        
        console.log("error in updateProfile",error)
        toast.error(axiosError.response.data.message || "Error in uploading profile" )

      }else{
        console.log("error in updateProfile",error)
        toast.error("Error in updateProfile")

      }
    }finally{
        set({isUpdatingProfile: false})
    }
  }


}));
