import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import SideBar from "../components/SideBar";
import { useChatStore } from "../store/useChatStore";

const Home = () => {
  const { selectedUser } = useChatStore();


  return (
    <div className=" h-screen bg-base-200 overflow-y-clip">
      <div className=" py-25 px-4 flex items-center justify-center my-auto">
        <div className="bg-base-100 w-full max-w-6xl h-[calc(100vh-8rem)] rounded 
        shadow-md">
          <div className="h-full flex rounded-lg overflow-hidden">
            <SideBar/>
            {selectedUser?<ChatContainer/>:<NoChatSelected/>}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
