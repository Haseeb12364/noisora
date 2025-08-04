import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Herosection from './components/herosection'
import Songs from './components/listennow'
import Footer from './components/footer'
import Login from './pages/login';
import Explore from './pages/Explorenow';
import Withpassword from './pages/Withpassword';
import Admindashboard from './pages/AdminDashboard';
import Kpop from "./pages/Kpop"

import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext';
import Userdashboard from './pages/Userdashboard';
// import Memo from './components/memo'
// import PasswordGenerator from './components/PasswordGenerator'


function App() {
  const location = useLocation();
  const hideNavbarAndFooter = ['/admin', '/user']
  const shouldHide = hideNavbarAndFooter.includes(location.pathname)

  return <>
    <div>

      {/* <Navbar /> */}
      {!shouldHide && <Navbar />}



      <Routes>
        <Route path="/admin" element={<Admindashboard />} />
        <Route path="/user" element={<Userdashboard />} />
        <Route path="/Explorenow" element={<Explore />} />
        <Route path="/kpop" element={<Kpop />} />
        <Route path="/" element={
          <>
            <Herosection />
            {/* <Songs /> */}
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/withpassword" element={<Withpassword />} />
      </Routes>
      {/* <Herosection />
      <Songs /> */}
      {/* <LoginForm/> */}
      {/* <Memo /> */}
      {/* <PasswordGenerator /> */}
      {!shouldHide && <Footer />}
      {/* <Footer /> */}
    </div>
    {/* <div className='bg-red-800 text-white h-96 w-full flex items-center justify-center my-20'>HEllo</div> */}
  </>
}

export default App

