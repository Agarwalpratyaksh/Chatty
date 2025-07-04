import { create } from 'zustand'

type Store = {
  theme: string,
  setTheme: (theme: string) => void
  
}

export const useThemeStore = create<Store>()((set) => ({
  theme: localStorage.getItem("chat-theme")|| "Night",
  setTheme: (theme:string)=>{
    localStorage.setItem("chat-theme",theme)
    set({theme})
  }
  
}))

