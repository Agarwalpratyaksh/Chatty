import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Loader2, Send, X } from "lucide-react";
import toast from "react-hot-toast";

function ChatInput() {
    const [ loading, setLoading ] = useState(false);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();



  const handleImageChange = (e: any) => {
      const file = e.target.files[0];
    //   console.log(file)
      if(!file.type.startsWith('image/')) {
          toast.error("Please select an image file");
          return;
      }

      const reader = new FileReader();
    //   console.log(reader)
      reader.onloadend = () => {
          //@ts-ignore
          
          setImagePreview(reader.result);
          
        }
        reader.readAsDataURL(file);
        // console.log(reader)

  }
  const removePreview = () => {
    setImagePreview(null);
    //@ts-ignore
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("form submitted", text, imagePreview);
    if (!text.trim() && !imagePreview) return;

    try {
        setLoading(true);
        await sendMessage(
            {
                text,
                image: imagePreview
            }
        );

        setLoading(false);

        // console.log(text, imagePreview);
        // clearform
        setText("");
        setImagePreview(null);
        //@ts-ignore
        if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
        console.log("Failed to send message", error);
    }
  };

  return (
    <div className="p-4 w-full ">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 rounded-lg object-cover border border-zinc-700"
            />

            <button
              className="absolute -top-1.5 -right-1.5 bg-base-300
              flex items-center justify-center rounded-full"
              onClick={removePreview} 
              disabled={loading}
            >
              <X className="size-5 rounded-full p-0.5" />
            </button>
          </div>
        </div>
      )}

      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-1 gap-2 ">
          <input
            type="text"
            className="w-full input input-sm sm:input-md rounded-lg"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here ......"
          />

          {/* todo: add functionality here */}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* todo:add functionality */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}

            onClick={
                //@ts-ignore
                () => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>

          <button
            type="submit"
            className="btn btn-circle btn-sm sm:btn-md"
            disabled={(!text.trim() && !imagePreview)|| loading}
            
          >
            {loading ? (<Loader2 className="animate-spin"/>): (<Send size={20} />)}
            
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
