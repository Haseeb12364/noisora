import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import Button from "./button";
export default function Herosection() {
  const navigate=useNavigate();
  const { user } = useAuth();

  const isLoggedIn = false
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 text-white py-20 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Text Content */}
        <div className="text-center lg:text-left mb-10 lg:mb-0 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover Music Like Never Before
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Stream trending tracks, explore artists, and enjoy your favorite music – all in one place. Welcome to <span className="text-cyan-400 font-semibold">Noisora</span>.
          </p>
<button
  className="bg-aqua text-white font-semibold px-6 py-3 rounded-xl transition duration-300 glow-btn"
  onClick={() => {
    if (user) {
      navigate("/Explorenow");
    } else {
      alert("Please login first to explore.");
    }
  }}
>
  Explore Now
</button>

        </div>
      
        <div className="w-full lg:w-1/2 flex justify-center">
        
          <img
            src="image-hero.png"
            alt="Music Illustration"
            className="rounded-2xl shadow-lg w-80 h-80 object-cover"
          />  
        </div>
     
      </div>
    
    </section>
  );
}
