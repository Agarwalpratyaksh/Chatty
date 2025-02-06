import { MessagesSquare } from "lucide-react";

function NoChatSelected() {
  return (
    <div className="w-full flex flex-col flex-1 justify-center items-center">
      <div className="max-w-md text-center space-y-6">
        {/* icon */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="relative ">
            <div className="h-16 w-16 rounded-2xl  flex items-center justify-center bg-primary/10 animate-bounce">
<MessagesSquare className="size-8 text-primary"/>
            </div>
          </div>
        </div>
<h2 className="text-2xl font-bold">

          Welcome to ChatIt !!
</h2>
      <p className=" text-base-content/60">Select a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  );
}

export default NoChatSelected;
