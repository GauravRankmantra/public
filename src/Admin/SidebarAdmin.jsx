import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Music, Album, Mic, Menu } from 'lucide-react';
import logo from '../assets/img/logo.jpeg';

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='min-h-screen  w-0 fixed bg-gray-800 text-white flex flex-col'>
      <div className='flex items-center justify-between px-6 py-4 md:hidden'>
       
        <button onClick={toggleMenu} className='focus:outline-none '>
          <Menu className='text-black ' />
        </button>
      </div>

      <div className={`md:flex md:flex-col h-screen bg-gray-800 w-64 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className='flex items-center justify-center py-6'>
          <img src={logo} alt="Logo" className='w-24 h-24 rounded-full object-cover' />
        </div>

        <div className='flex-1'>
          <ul className='space-y-4'>
            <li className='hover:bg-gray-700 px-6 py-3 cursor-pointer transition-all duration-200 flex items-center'>
              <Home className='mr-3' />
              <Link to="/admin">Home</Link>
            </li>

            <li className='hover:bg-gray-700 px-6 py-3 cursor-pointer transition-all duration-200 flex items-center'>
              <Users className='mr-3' />
              <Link to="/admin/all-users">All Users</Link>
            </li>

            <li className='hover:bg-gray-700 px-6 py-3 cursor-pointer transition-all duration-200 flex items-center'>
              <Album className='mr-3' />
              <Link to="/admin/albums">Albums</Link>
            </li>

            <li className='hover:bg-gray-700 px-6 py-3 cursor-pointer transition-all duration-200 flex items-center'>
              <Music className='mr-3' />
              <Link to="/admin/songs">Songs</Link>
            </li>

            <li className='hover:bg-gray-700 px-6 py-3 cursor-pointer transition-all duration-200 flex items-center'>
              <Mic className='mr-3' />
              <Link to="/admin/artists">Artist</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
