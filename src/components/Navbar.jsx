import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaGlobe, FaUserAlt, FaUserPlus, FaHome, FaMusic, FaUser, FaHeadphones, FaDownload, FaShoppingCart, FaHeart, FaHistory, FaListAlt, FaPlusCircle, FaAngleRight } from 'react-icons/fa';
import { RiBaseStationLine } from 'react-icons/ri';
import logo from '../assets/img/logo.jpeg'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>

      <div className="fixed bg-[#1b2039] py-5 px-8 right-0 left-0 top-0 z-[1000]">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-12 w-full lg:w-auto">
            <div className="relative flex items-center w-full max-w-full sm:max-w-[300px]">
              <input
                type="text"
                className="form-control py-2 pl-3 pr-12 text-sm text-[#777] bg-[#fff] rounded-[5px] border-none w-full sm:w-[180px] lg:w-full"
                placeholder="Search Music Here.."
              />
              <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-[36px] flex items-center justify-center bg-[#3bc8e7] rounded-r-[5px] px-3 cursor-pointer">
                <FaSearch size={18} color="#fff" />
              </span>
            </div>

            <div className="hidden lg:flex items-center text-white text-md">
              <span className="text-[#3bc8e7] w-full">Trending Songs :</span>
              <span className="ml-4 min-w-full">
                <a href="#">Dream your moments, Until I Met You, Gimme...</a>
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative text-white capitalize cursor-pointer pr-6 group">
              <span data-bs-toggle="modal" data-target="#lang_modal" className="flex items-center">
                Languages
                <FaGlobe size={20} className="ml-2" />
              </span>
            </div>

            <div className="hidden lg:flex space-x-4">
              <Link to="/register" className="ms_btn bg-[#3bc8e7] text-white text-center py-[8px] px-[20px] rounded-[20px] transition-all duration-400 ease-in-out hover:shadow-lg">Register</Link>
              <Link to="login" className="ms_btn bg-[#3bc8e7] text-white text-center py-[8px] px-[20px] rounded-[20px] transition-all duration-400 ease-in-out hover:shadow-lg">Login</Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-4 ml-4">
            <div className="text-white">
              <FaUserAlt size={20} className="cursor-pointer" title="Login" />
            </div>
            <div className="text-white">
              <FaUserPlus size={24} className="cursor-pointer" title="Signup" />
            </div>
            <button className="flex items-center space-x-4" onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed top-0 bottom-0 z-50 bg-[#1b2039] w-[200px] transition-all duration-300 shadow-lg lg:hidden"
        >
          <div
            onClick={toggleSidebar}
            className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 cursor-pointer w-[55px] h-[55px] bg-[#1b2039] rounded-full text-center flex items-center justify-center"
          >
            <FaAngleRight className="text-[#cdcdcd] text-[20px] ml-6 transition-all duration-500" />
          </div>

          <div className="w-full h-full bg-[#1b2039] flex flex-col items-center pt-10">
            <div className="flex justify-center items-center min-h-[164px]">
              <div className="text-center w-full">
                <a href="index.html">
                  <img src={logo} alt="logo" className="img-fluid" />
                </a>
              </div>
            </div>

            <div className="w-full mt-[50px] mb-[70px] overflow-y-auto max-h-screen custom-scrollbar">
              <ul className="space-y-2">
                <li><a href="index.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaHome className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>discover</span></a></li>
                <li><a href="album.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaMusic className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>albums</span></a></li>
                <li><a href="artist.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaUser className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>artists</span></a></li>
                <li><a href="genres.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaHeadphones className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>genres</span></a></li>
                <li><a href="station.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><RiBaseStationLine className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>Stations</span></a></li>
              </ul>

              <ul className="mt-10 space-y-2">
                <li><a href="download.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaDownload className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>downloads</span></a></li>
                <li><a href="purchase.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaShoppingCart className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>purchased</span></a></li>
                <li><a href="favourite.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaHeart className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>favourites</span></a></li>
                <li><a href="history.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaHistory className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>history</span></a></li>
              </ul>

              <ul className="mt-10 space-y-2">
                <li><a href="feature_playlist.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaListAlt className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>featured playlist</span></a></li>
                <li><a href="add_playlist.html" className="flex justify-center items-center text-[#cdcdcd] text-sm py-2 px-0 w-full hover:bg-[#2cc8e5] hover:text-white relative group"><FaPlusCircle className="w-[25px] h-[25px] inline-block mr-2 group-hover:scale-[1.1] transition-all icon-rotate" /><span className={`${sidebarOpen ? 'block' : 'hidden'} nav_text`}>create playlist</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
          background-color: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: blue;
          border-radius: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: transparent;
        }

        .icon-rotate {
          transition: transform 0.4s ease;
        }

        .icon-rotate:hover {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
}

export default Navbar;
