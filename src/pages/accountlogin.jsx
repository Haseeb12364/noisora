import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function Login() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-[300px] flex flex-col items-center space-y-5 ">

        
        <img
          src="/musium logo.png" 

          className="w- h-32 object-contain"
        />

        
        <h2 className="text-xl font-semibold text-center">Let’s get you in</h2>

        
        <div className="w-full space-y-2">
          <button className="w-full flex items-center justify-center space-x-2 bg-[#1f1f1f] text-white py-2 rounded-lg   hover:bg-[#2a2a2a]">
            <FaGoogle className="text-red-400" />
            <span>Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 bg-[#1f1f1f] text-white py-2 rounded-lg hover:bg-[#2a2a2a]">
            <FaFacebookF className="text-blue-500" />
            <span>Continue with Facebook</span> 
          </button>

          <button className="w-full flex items-center justify-center space-x-2 bg-[#1f1f1f] text-white py-2 rounded-lg hover:bg-[#2a2a2a]">
            <FaApple className="text-white" />
            <span>Continue with Apple</span>
          </button>
        </div>

        
        <div className="flex items-center justify-center w-full space-x-4">
          <hr className="border-gray-600 flex-1" />
          <span className="text-sm text-gray-400">or</span>
          <hr className="border-gray-600 flex-1" />
        </div>

      
        <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-full transition">
          Log in with a password
        </button>

        
        <p className="text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="#" className="text-cyan-400 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
