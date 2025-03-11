import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlbumInfoPage = () => {
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    lowAudio: "",
    highAudio: "",
    coverImage: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    axios
      .get(`https://backend-music-xg6e.onrender.com/api/v1/albums/${id}`)
      .then((response) => {
        setAlbumInfo(response.data);
        setNewSong({
          ...newSong,
          artist: response.data.data.artistDetails.fullName,
          album: response.data.data.title,
          genre: response.data.data.genreDetails.name,
        });
      })
      .catch((error) => {
        console.error("Error fetching album data:", error);
      });
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  // Handle form submission (to upload the song)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("New Song Data:", newSong);
    // You can perform a POST request here to submit the song data to the API.
  };

  const SongList = (song) => {
    return (
      <div>
        <img src={song.coverImage}></img>
        <h1>{song.title}</h1>
        <p>{song.artist}</p>
        <p>{song.duration}</p>
        <p>{song.audioUrls}</p>
        <p>{song.plays}</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="flex justify-center py-2">
        <h1 className="font-semibold text-2xl text-center">Update Album</h1>
      </div>
      {albumInfo ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex  space-y-2 items-center">
            <img
              className="w-48 h-48 rounded-lg mb-4"
              src={albumInfo.data.coverImage}
              alt="Album Cover"
            />
            <div className="px-4 space-y-1">
              <h1 className="text-xl font-semibold mb-2">
                {albumInfo.data.title.toUpperCase()}
              </h1>
              <p className="text-lg">
                By:
                <span className="font-semibold">
                  {" "}
                  {albumInfo.data.artistDetails.fullName}
                </span>{" "}
              </p>
              <p className="text-lg">
                <span className="font-semibold"></span>{" "}
                {albumInfo.data.genreDetails.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold"></span>{" "}
                {new Date(albumInfo.data.releaseDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-semibold"></span> {albumInfo.data.company}
              </p>
            </div>

            {/* Add Song Button */}
          </div>
          <div className="border border-black">
            <h1>Music's</h1>
            <div>
              {albumInfo?.data?.songs.length ? (
                song(albumInfo.data.songs)
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Add Song
          </button>
        </div>
      ) : (
        <p className="text-center">Loading album data...</p>
      )}

      {/* Modal for Adding Songs */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-lg md:w-full">
            <h2 className="text-xl font-bold mb-4">Add New Song</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Song Title</label>
                <input
                  type="text"
                  name="title"
                  value={newSong.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Artist</label>
                <input
                  type="text"
                  name="artist"
                  value={newSong.artist}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Album</label>
                <input
                  type="text"
                  name="album"
                  value={newSong.album}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={newSong.genre}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Low Audio</label>
                <input
                  type="file"
                  name="lowAudio"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">High Audio</label>
                <input
                  type="file"
                  name="highAudio"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumInfoPage;
