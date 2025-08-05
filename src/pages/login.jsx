import { TfiAngleLeft } from "react-icons/tfi";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"
export default function Login() {
  const { login } = useAuth()

  return (
    <>
      <Link to={"/"}>
      <div className="">        <TfiAngleLeft className="text-2xl cursor-pointer  text-white  m-3" /></div>

      </Link>
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex items-center gap-2 mb-6">
        </div>
        <div className="w-[300px] flex flex-col items-center space-y-5  ">

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
            <hr className="border-white flex-1" />
            <span className="text-sm text-white">or</span>
            <hr className="border-white flex-1" />
          </div>
          {/* <link to="/withpassword" className="glow-btn" > Login with password </link> */}
          <Link
            to="/Withpassword"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 rounded-full text-center"
          >
            Log in with a password
          </Link>


          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <a href="#" className="text-cyan-400 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
