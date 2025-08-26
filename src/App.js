import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Herosection from "./components/herosection";
import Footer from "./components/footer";
import Songs from "./components/listennow";

import Login from "./pages/login";
import Explore from "./pages/Explorenow";
import Withpassword from "./pages/Withpassword";
import Admindashboard from "./pages/AdminDashboard";
import Userdashboard from "./pages/Userdashboard";
import Artists from "./pages/Artists";
import ArtistSongs from "./pages/Artistssongs";
import Trendingsongs from "./pages/Trendingsongs";
import Playlists from "./pages/Playlists";
import Boys from "./pages/Boys";

function App() {
  const location = useLocation();

  const hideNavbarAndFooter = ["/login", "/withpassword", "/admin"];
  const shouldHide = hideNavbarAndFooter.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <div>
        {/* ✅ Navbar */}
        {!shouldHide && <Navbar />}

        {/* ✅ Routes */}
        <Routes>
          {/* Dynamic Routing */}
          <Route path="/boys/:slug" element={<Boys />} />
          <Route path="/artist/:slug" element={<ArtistSongs />} />

          {/* Main Pages */}
          <Route path="/" element={<Herosection />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/Explorenow" element={<Explore />} />
          <Route path="/Trendingsongs" element={<Trendingsongs />} />
          <Route path="/artist/:slug/songs" element={<ArtistSongs />} />
          <Route path="/playlists" element={<Playlists />} />

          {/* Auth & Dashboards */}
          <Route path="/login" element={<Login />} />
          <Route path="/withpassword" element={<Withpassword />} />
          <Route path="/admin" element={<Admindashboard />} />
          <Route path="/user" element={<Userdashboard />} />
        </Routes>

        {/* ✅ Footer */}
        {!shouldHide && <Footer />}

        {/* ✅ Persistent Player */}
        <Songs />
      </div>
    </>
  );
}

export default App;
