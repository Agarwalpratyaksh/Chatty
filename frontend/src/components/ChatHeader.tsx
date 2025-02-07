import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const {onlineUsers} = useAuthStore()
  console.log(selectedUser)
  return (
    <div className="w-full p-2.5 px-5 border-b border-base-200 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* avatar image */}
          <div className="avatar">
            <div className="size-10 relative rounded-full">
              <img
                src={
                  //@ts-ignore
                  selectedUser?.profilePic || "./src/avatar.png"
                }
                alt="profilePic"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-xs text-base-content">{onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}</p>
          </div>
        </div>
        <div onClick={()=>{setSelectedUser(null)}} className="hover:bg-base-200 rounded-full p-1">
            <X/>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
