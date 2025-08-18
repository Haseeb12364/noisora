import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Herosection from './components/herosection'
import Footer from './components/footer'
import Login from './pages/login';
import Explore from './pages/Explorenow';
import Withpassword from './pages/Withpassword';
import Admindashboard from './pages/AdminDashboard';
import AtifAslam from "./pages/atifaslam";

import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext';
import Userdashboard from './pages/Userdashboard';
import Artists from './pages/Artists';
import Trendingsongs from './pages/Trendingsongs';
import Songs from './components/listennow';
import AfsanaKhan from "./pages/afsanakhan";
import Arijitsingh from './pages/arijitsingh';
import Shubh from './pages/Shubh';
import Neha from './pages/nehakakr';
import Ali from './pages/alizafar';
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function App() {
  const location = useLocation();
  const hideNavbarAndFooter = ['/admin', '/login'];
  const shouldHide = hideNavbarAndFooter.includes(location.pathname);

  return (
    <>
      <div>
        {!shouldHide && <Navbar />}

        <Routes>
          <Route path="/admin" element={<Admindashboard />} />
          <Route path="/user" element={<Userdashboard />} />
          <Route path="/Explorenow" element={<Explore />} />

          <Route path="/artist/atifaslam" element={<AtifAslam />} />
          <Route path="/artist/afsanakhan" element={<AfsanaKhan />} />
          <Route path="/artist/arijitsingh" element={<Arijitsingh />} />
          <Route path="/artist/Shubh" element={<Shubh />} />
          <Route path="/artist/nehakaakr" element={<Neha />} />
                    <Route path="/artist/alizafar" element={<Ali />} />



          <Route path="/artists" element={<Artists />} />
          <Route path="/Trendingsongs" element={<Trendingsongs />} />
          <Route path="/" element={
            <>
              <Herosection />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/withpassword" element={<Withpassword />} />
        </Routes>

        {!shouldHide && <Footer />}

        <Songs />
      </div>
    </>
  );
}

export default App;    