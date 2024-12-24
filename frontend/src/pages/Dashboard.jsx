import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPosts from "../components/DashPosts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row ">
        {/* SIDEBAR - LEFT */}
        <div className="md:w-56">
          <DashSidebar />
        </div>

        {/* INFORMATION - RIGHT */}
        {/* Profile */}
        {tab === "profile" && <DashProfile />}
        {/* Posts */}
        {tab === "posts" && <DashPosts />}
      </div>
    </>
  );
};

export default Dashboard;
