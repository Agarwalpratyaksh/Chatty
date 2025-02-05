import { create } from 'zustand'

type Store = {
  theme: string
  
}

export const useThemeStore = create<Store>()((set) => ({
  theme: localStorage.getItem("chat-theme")|| "coffee",
  setTheme: (theme:string)=>{
    localStorage.setItem("chat-theme",theme)
    set({theme})
  }
  
}))

