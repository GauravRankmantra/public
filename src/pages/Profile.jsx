import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logo.jpeg";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
const Profile = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="bg-[#14182A] w-full h-screen">
        <div className="w-6/12 mx-auto  py-10 ">
          <h1 className="text-center text-2xl text-white mt-20 mb-5">
            Edit Profile
          </h1>
          <div>
            <div className="bg-[#1c223b] p-10 shadow-2xl rounded-xl">
              <form>
                <div className="flex justify-center  mb-6">
                  <label
                    htmlFor="image"
                    className="cursor-pointer relative bg-gray-400 h-36 w-36 rounded-full flex items-center justify-center text-gray-600 text-lg hover:bg-gray-500 transition duration-200"
                    style={{
                      backgroundImage: image ? `url(${image})` : null,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!image && <span>151 x 151</span>}
                    <input
                      type="file"
                      id="image"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mb-6">
                  <div>
                    <label className="text-cyan-400 text-lg" htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value="Bella Scott"
                      className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-cyan-400 text-lg" htmlFor="email">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value="bella.scott@dummymail.com"
                      className="w-full p-2 mt-1 bg-gray-50 text-gray-500  rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="col-span-2 w-6/12 m-auto flex flex-col items-center">
                    <label
                      className="text-cyan-400 text-lg"
                      htmlFor="password"
                    >
                      Your Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      value="*****"
                      className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    type="submit"
                    className="bg-cyan-500 text-white py-2 px-10 rounded-3xl hover:bg-cyan-600 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-600 text-white py-2 px-10 rounded-3xl hover:bg-gray-700 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 text-white py-2 px-10 rounded-3xl hover:bg-red-700 transition duration-200"
                  >
                    LogOut
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-gray-900 to-gray-400   text-gray-400 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          <div>
            <img src={logo} className="w-40 h-24"></img>
            <h3 className="footer-title relative text-cyan-400 text-xl mb-2">Music Template</h3>
            <p className="text-white leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div>
            <h3 className="footer-title relative text-cyan-400  text-xl mb-2">Useful Links</h3>
            <ul className="text-gray-100 space-y-4">
              <li className="cursor-pointer hover:text-gray-300">Albums</li>
              <li className="cursor-pointer  hover:text-gray-300">Artists</li>
              <li className="cursor-pointer  hover:text-gray-300">
                Top Albums
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title relative text-cyan-400 text-xl mb-2">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter and get the latest updates and offers.
            </p>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-2 mb-4 bg-gray-100 text-gray-300 rounded focus:outline-none"
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-2 mb-4 bg-gray-100 text-gray-300 rounded focus:outline-none"
            />
            <button className="w-6/12 bg-cyan-500 text-white py-2 rounded-3xl hover:bg-cyan-600 transition duration-200">
              Sign Me Up
            </button>
          </div>

          <div>
            <h3 className="footer-title relative text-cyan-400 text-xl mb-2 space-y-4">Contact Us</h3>
            <p className="text-gray-300">
              <strong>Call Us:</strong> (+1) 202-555-0176, (+1) 2025-5501
            </p>
            <p className="text-gray-300">
              <strong>Email Us:</strong> demo@mail.com, dummy@mail.com
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Walk In:</strong> 598 Old House Drive, London
            </p>
            <div>
              <h3 className="text-cyan-400 text-xl mb-2">Follow Us</h3>

              <div className="flex space-x-3">
                <a href="#" className="bg-cyan-500 p-2 w-10 h-10 rounded">
                  <FontAwesomeIcon icon={faFacebookF} className="text-white" />
                </a>
                <a href="#" className="bg-cyan-500 p-2 w-10 h-10  rounded">
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-white" />
                </a>
                <a href="#" className="bg-cyan-500 p-2 w-10 h-10  rounded">
                  <FontAwesomeIcon icon={faTwitter} className="text-white" />
                </a>
                <a href="#" className="bg-cyan-500 p-2 w-10 h-10  rounded">
                  <FontAwesomeIcon
                    icon={faGooglePlusG}
                    className="text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Profile;
