import { Navigate, Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import ProfilePage from "./pages/ProfilePage"
import Setting from "./pages/Setting"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"

interface AuthStore {
  authUser: any;
  checkAuth: () => void;
  isCheckingAuth : boolean
}

function App() {

  const {authUser, checkAuth,isCheckingAuth} = useAuthStore() as AuthStore
 
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser)


  if(isCheckingAuth && !authUser){
    return(
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element={authUser?<Home/>:<Navigate to={"/login"} />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to={"/login"} />} />
      <Route path="/setting" element={<Setting/>} />

   
    </Routes>

    <Toaster/>
    
    
    </>
  )
}

export default App
