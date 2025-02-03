import { MessagesSquare, Settings } from "lucide-react";
import { Link } from "react-router";

function Navbar() {
  return (
    <header className="w-full py-3 px-8">

    <div className="flex justify-between items-center">

        <Link to="/">
      <div className="flex items-center">
        <div className="bg-primary/10 p-3 rounded-2xl ">
        <MessagesSquare className="h-6 w-6 text-primary"/>
      </div>
      <p className="text-xl font-bold text-primary mx-5 ">ChatIt  </p>
      </div>

        </Link>

      

      <div className="flex items-center">
        <Settings className="text-primary h-5 w-5"/>
        <p className="px-3 font-bold text-lg text-primary cursor-pointer">Settings</p>

      </div>
    </div>
    </header>
  );
}

export default Navbar;
