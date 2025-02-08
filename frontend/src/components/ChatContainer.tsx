import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../lib/utils";
import MessagesSkeleton from "./Skeleton/MessagesSkeleton";

function ChatContainer() {
  const { selectedUser, messages, getMessages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex  flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />

        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex  flex-1 flex-col overflow-auto">
      <ChatHeader />
      <div className="overflow-y-auto flex-1 px-4">
        {messages.map((message: any) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full border-2 border-zinc-700">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.profilePic || "./src/avatar.png"
                      : selectedUser?.profilePic || "./src/avatar.png"
                  }
                  alt="Profile Pic"
                />
              </div>
            </div>

            <div className="chat-header">
              <time className="text-xs opacity-50">
                
                {formatTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col items-center">
              {message.image && (
                <img
                  src={message?.image}
                  alt="Image"
                  className="sm:max-w-[200px] my-1.5 rounded-lg"
                />
              )}
              {message.text && <p>{message?.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatContainer;
