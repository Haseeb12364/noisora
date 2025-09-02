import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Herosection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Show modal only on mobile screens after 3 seconds if not logged in
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // mobile breakpoint
    if (!user && isMobile) {
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-100 text-black dark:from-black dark:to-gray-900 dark:text-white py-20 px-4 lg:px-20 transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Text Content */}
        <div className="text-center lg:text-left mb-10 lg:mb-0 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover Music Like Never Before
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Stream trending tracks, explore artists, and enjoy your favorite music – all in one place. Welcome to <span className="text-cyan-500 dark:text-cyan-400 font-semibold">Noisora</span>.
          </p>
          <button
            className="glow-btn dark:bg-white outline-black dark:text-black font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md hover:scale-105"
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
        
        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="image-hero.png"
            alt="Music Illustration"
            className="rounded-2xl shadow-lg w-80 h-80 object-cover border dark:border-gray-700 border-gray-300"
          />  
        </div>
      </div>

      {/* Professional Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-lg"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
              Login Required
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
              To continue exploring <span className="text-cyan-500 font-semibold">Noisora</span>, please log in to your account.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/login")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
