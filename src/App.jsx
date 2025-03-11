import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SidebarAdmin from "./Admin/SidebarAdmin";
import HomeAdmin from "./Admin/HomeAdmin";
import AllUser from "./Admin/AllUser";

import Album from "./Admin/Albums"
import AlbumInfoPage from "./Admin/AlbumInfoPage";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <div className="md:w-64 bg-gray-800 text-white flex-none">
          <SidebarAdmin />
        </div>

        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="admin/all-users" element={<AllUser />} />
            <Route path="admin/albums" element ={<Album/>}/>
            <Route path="/admin/album/:id" element={<AlbumInfoPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
