import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Layout from "./Layout";
import HomeAdmin from "./Admin/HomeAdmin";
import AllUser from "./Admin/AllUser";
import Album from "./Admin/Albums";
import AlbumInfoPage from "./Admin/AlbumInfoPage";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout for admin panel */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<HomeAdmin />} />{" "}
          {/* Default page for /admin */}
          <Route path="all-users" element={<AllUser />} />
          <Route path="albums" element={<Album />} />
          <Route path="album/:id" element={<AlbumInfoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
