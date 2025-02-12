import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./Skeleton/SidebarSkeleton";

function SideBar() {
  const { selectedUser, getUsers, users, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
    // console.log(users);
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className=" h-full w-20 md:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-200 w-full p-5 pb-2">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h2 className=" hidden md:block font-semibold text-lg">Contacts</h2>
        </div>
        {/* TODO: implement the online user functionalutyt */}

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user: any) => (
          <button
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-200 transition-colors
              
              ${
                //@ts-ignore
                selectedUser?._id === user._id
                  ? "bg-base-200 ring-1 ring-base-300"
                  : ""
              }
            `}
            key={user._id}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative mx-auto md:mx-0">
              <img
                src={user.profilePic || "./src/assets/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 bg-green-500 size-3 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden md:block text-left min-w-0">
              <p className="font-medium truncate text-md">{user.fullName}</p>
              <div className="text-xs text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
