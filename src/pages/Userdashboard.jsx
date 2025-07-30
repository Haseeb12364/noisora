import Sidebar from "../components/SideBar";
import StatsCard from "../components/StatsCard";
import Topbar from "../components/TopBar";
import UsersTable from "../components/UserTable";
import SongsTable from "../components/SongsTable";
 export default function Userdashboard(){
     return (
        <div className="flex bg-gradient-to-b from-black to-gray-900">
      
        
            <Sidebar/>
            <div className=" flex-1 ml-50 p-6  min-h-screenbg-gradient-to-b from-black to-gray-900" >
                <Topbar/>
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {/* <StatsCard title="Total users" value="1,200" /> */}
                    <StatsCard title="Downloads" value="8" />
                    <StatsCard title="Favourits" value="175" />

                </div>
                
            </div>
        </div>
     )
 }