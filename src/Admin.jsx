import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarAdmin from "./Admin/SidebarAdmin";

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SidebarAdmin />} />
        
      </Routes>
    </div>
  );
};

export default Admin;
