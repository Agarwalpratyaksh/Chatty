import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Setting from "./pages/Setting";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const { theme } = useThemeStore();

  
  
  
  useEffect(() => {
    checkAuth();
    // console.log({authUser})
  }, [checkAuth]);


  // console.log(authUser)
  // console.log({ onlineUsers });


  if (isCheckingAuth && !authUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route path="/setting" element={<Setting />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
