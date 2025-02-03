import { Eye, EyeOff, Key, Mail, MessagesSquare, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function SignUp() {


  const [ showPassword, setShowPassword] = useState(false)

  //@ts-ignore
  const {signup, isSigningUp} = useAuthStore()




  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })  


  function validateForm(){
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true
  }


  function handleForm(e: any) {

    console.log("handleform")
    e.preventDefault()

    const success = validateForm()
    if(success == true){
      signup(formData)
    
    }

   
  }

  return (
    <>

    
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center items-center w-full p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">

          </div>
          <div className="bg-primary/10 p-3 rounded-2xl ">
            <MessagesSquare className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primary pt-5">
            Create Account
          </h2>
          <h2 className="text-md font-light text-primary py-3 pb-7">
            Get Started with your free account
          </h2>

          {/* form*/}
          <form className="space-y-6" onSubmit={handleForm}>
            <div className="form-control">
              <label className="label">
                <span className="text-md font-bold text-primary label-text">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered min-w-lg pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => {setFormData({ ...formData, fullName: e.target.value })
                  console.log(formData)
                }}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md font-bold text-primary label-text">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered min-w-lg pl-10`}
                  placeholder="johndoe@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-md font-bold text-primary label-text">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword? "text":"password"}
                  className={`input input-bordered min-w-lg pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={()=>{setShowPassword(!showPassword)}}>
                  { showPassword ? (
                    <Eye/>
                  ):(<EyeOff/>)
                }
                </button>


      
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6">Create your account</button>
          </form>
          <p className="text-sm font-light  py-5 mb-10">Already have an account ? 
            <Link to={'/login'}>
            
            <span className="text-primary ml-2">Sign In</span>
            </Link>
          </p>
        </div>
        

        <AuthImagePattern title="Welcome to ChatIt" subtitle="Chat with your friends and family"/>
        
      </div>
    </>
  );
}

export default SignUp;
