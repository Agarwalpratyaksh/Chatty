import { LogOut, MessagesSquare, Settings, User } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";



function Navbar() {

const {authUser,logout} = useAuthStore() as any

  return (
    <header className="w-full py-3 px-8 ">

    <div className="flex justify-between items-center">

        <Link to="/">
      <div className="flex items-center">
        <div className="bg-primary/10 p-3 rounded-2xl ">
        <MessagesSquare className="h-6 w-6 text-primary"/>
      </div>
      <p className="text-xl font-bold text-primary mx-5 ">ChatIt  </p>
      </div>

        </Link>

      <div  className="flex items-center gap-3">


      <Link to={'/setting'} className="btn rounded-2xl btn-soft gap-2 border-0 flex items-center">
         <Settings className="size-5"/>
         <span className="hidden sm:inline">Settings</span>
 
         </Link>

      {authUser && (
        <>
        
         <Link to={'/profile'} className="btn rounded-2xl btn-soft gap-2 border-0 flex items-center">
         <User className="size-5"/>
         {/* <p className="font-semibold text-lg text-primary-content cursor-pointer">Profile</p> */}
         <span className="hidden sm:inline">Profile</span>
 
         </Link>


       <button className="btn rounded-2xl btn-soft gap-2 border-0 flex items-center" onClick={logout}>

         <LogOut className="size-5"/>
         <span className="hidden sm:inline">Logout</span>
        
         </button>
         
 
      
        </>

      )}

     

      </div>

    </div>
    </header>
  );
}

export default Navbar;
