import React from "react";
import SidebarAdmin from "./Admin/SidebarAdmin";
import { Outlet } from "react-router-dom";
 
const Layout = () => {
  return (
<div className="flex min-h-screen">
      {/* Sidebar */}
<div className="md:w-64 bg-gray-800 text-white flex-none">
<SidebarAdmin />
</div>
 
      {/* Main Content */}
<div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
<Outlet /> {/* This will render the nested routes */}
</div>
</div>
  );
};
 
export default Layout;