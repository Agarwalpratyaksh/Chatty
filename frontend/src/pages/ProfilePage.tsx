import { Camera, Mail, User } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useState } from "react"

function ProfilePage() {
  const {authUser, isUpdatingProfile, updateProfile} =useAuthStore() as any
  //@ts-ignore
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload =async (e:any)=>{
    const file = e.target.files[0]
    
    if(!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = reader.result as string

      //@ts-ignore
      setSelectedImg(base64Image)
      await updateProfile({profilePic: base64Image})
    }
    console.log(reader)

  

  }


  return (
    <div className="min-h-screen pt-10 space-y-5 ">
      <div className=" bg-base-300 max-w-2xl mx-auto p-6 py-8 rounded-xl space-y-8 ">
        <div className=" text-center ">
          <h2 className="text-primary text-2xl font-bold"> Profile </h2>
          <p className="text-sm font-medium text-primary">Your Profile Information</p>

        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img src={ selectedImg||authUser?.profilePic || './src/avatar.png'} alt="Profile" className="size-32 rounded-full object-cover border-4" />
            <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>



          </div>
          <div>
<p className="text-sm text-primary-content">{isUpdatingProfile?"Updating...":"Click on the camer to update the profile"}</p>
          </div>
          </div>

                  {/* input boxes */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm flex items-center gap-2 ">
                <User className="size-4"/>
                Full Name
              </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border cursor-not-allowed" > {authUser?.fullName}</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm flex items-center gap-2 ">
                <Mail className="size-4"/>
                Email
              </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border cursor-not-allowed" > {authUser?.email}</p>
            </div>
         
        </div>

      </div>
      
<div className="flex flex-col bg-base-300 max-w-2xl mx-auto p-6 py-8 rounded-xl space-y-8">
                  <div className="font-bold text-primary text-xl">
                    Account Information
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-400 pb-2">
                   <span>Member Since</span>
                   <span>{authUser.createdAt.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
</div>

    </div>
  )
}

export default ProfilePage