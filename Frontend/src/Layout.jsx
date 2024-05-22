import React from "react";
import Navbar from "./components/Header/Navbar";// Import the Navbar component
import { Outlet } from "react-router-dom";// Import Outlet from react-router-dom for nested routes
import Sidebar from "./components/Header/Sidebar";// Import the Sidebar component

function Layout() {
    return (
        <>
          {/* Render the Navbar component at the top */}
            <Navbar />
            
            {/* Main container that holds the Sidebar and the content */}
            
            <div className="sm:flex flex-none">
                <div className="">
                      {/* Sidebar container */}
                    <Sidebar />
                </div>
                {/* Content container where nested routes will be rendered */}
                <div className="sm:flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
