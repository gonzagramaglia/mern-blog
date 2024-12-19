import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    console.log("location: " + JSON.stringify(location)); // {"pathname":"/dashboard","search":"?tab=profile","hash":"","state":null,"key":"m429pcb9"}
    console.log("location.search: " + location.search); // ?tab=profile
    const urlParams = new URLSearchParams(location.search);
    console.log("urlParams: " + urlParams); // tab=profile
    const tabFromUrl = urlParams.get("tab");
    console.log("tabFromUrl: " + tabFromUrl); // profile
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row ">
        {/* Sidebar */}
        <div className="md:w-56">
          <DashSidebar />
        </div>

        {/* Information */}
        {tab === "profile" && <DashProfile />}
      </div>
    </>
  );
};

export default Dashboard;
