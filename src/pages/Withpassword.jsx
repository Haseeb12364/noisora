import { useState } from "react";
// import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [Rememberme, setRememberme] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) {
            alert('enter password and email')
            return;
        }
        const res = await login({ email, password, Rememberme })
 
        console.log(res);

        if (res.success === false) {
            setError(res.message)
        } else {
            setError(null)
        }

        if (res?.email) {
            navigate("/")
        }

    }

    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="w-[300px] flex flex-col items-center space-y-5  ">
                <img
                    src="/musium logo.png"
                    className="w- h-32 object-contain"
                />

                <h2 className="text-xl font-semibold text-center">Login to your account</h2>
                <div className="w-full space-y-2">
                    <input type="email" placeholder="user" name="user" value={email} className=" p-5 w-full flex items-center justify-center space-x-2 bg-[#1f1f1f] text-white py-2 rounded-lg   hover:bg-[#2a2a2a]" onChange={(e) => setEmail(e.target.value)}>
                        {/* <FaGoogle className="text-red-400" /> */}
                    </input>
                    <input type="password" placeholder="enter your password" name="password" value={password} className=" p-5 w-full flex items-center justify-center space-x-2 bg-[#1f1f1f] text-white py-2 rounded-lg hover:bg-[#2a2a2a]" onChange={(e) => setPassword(e.target.value)}>
                        {/* <FaFacebookF className="text-blue-500" /> */}
                        {/* <span>Continue with Facebook</span>  */}
                    </input>
                    {/* <label>
            <input type="cheackbox"checked={Rememberme}
              onChange={() => setRememberme(!Rememberme)}
            className="form-checkbox accent-cyan-500" 
          /> 
          <span> Remberme</span>
         </label> */}
                    <label className="flex items-center space-x-1">
                        {/* <input
                            type=""
                            checked={Rememberme}
                            onChange={() => setRememberme(!Rememberme)}
                            className="form-checkbox accent-cyan-500"
                        /> */}
                        {/* <span>Remember Me</span> */}
                    </label>    
                    {/* <button className="w-full flex items-center justify-center space-x-2 bg-[#1f1f1f] text-white py-2 rounded-lg hover:bg-[#2a2a2a]">
            <FaApple className="text-white" />
            <span>Continue with Apple</span>
          </button> */}
                </div>

                <div className="text-red-500">
                    {error}
                </div>
                <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 rounded-full transition glow-btn" onClick={() => handleLogin()}>
                    Log in
                </button>
                <div className="flex items-center justify-center w-full space-x-4">
                    <hr className="border-white flex-1" />
                    <span className="text-sm text-white">or Continue with</span>
                    <hr className="border-white flex-1" />
                </div>
                <div className="flex">
                    <img className="size-8 cursor-pointer" src="google.png" alt="" />
                    <img  className="size-8 ml-4 cursor-pointer"  src="fb.png" alt="" />
                     <img className="size-8 ml-4 cursor-pointer" src="apple.png" alt="" />
                </div>
                <p className="text-sm text-gray-400">
                    Don’t have an account?{" "}
                    <a href="#" className="text-cyan-400 font-medium hover:underline">
                        Signup
                    </a>
                </p>
            </div>
        </div>
    );
}




