import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Albums = () => {
  // States to hold data
  const [albums, setAlbums] = useState([]);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [artist, setArtist] = useState([]);
  const [genre, setGenre] = useState([]);
  const [artistSuggestions, setArtistSuggestions] = useState([]);
  const [genreSuggestions, setGenreSuggestions] = useState([]);
  // States to control the "View More" functionality
  const [showMoreAlbums, setShowMoreAlbums] = useState(false);
  const [showMoreFeaturedAlbums, setShowMoreFeaturedAlbums] = useState(false);
  const [showMoreArtists, setShowMoreArtists] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [gen, setGen] = useState();
  const [art, setArt] = useState();
  const [albumData, setAlbumData] = useState({
    title: "",
    artist: "",
    genre: "",
    company: "",
    coverImage: null,
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "artist") {
      const filteredArtists = artist.data.filter((art) =>
        art.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setArtistSuggestions(filteredArtists);
    }

    // Filter genre suggestions based on user input
    if (name === "genre") {
      const filteredGenres = genre.filter((gen) =>
        gen.name.toLowerCase().includes(value.toLowerCase())
      );
      setGenreSuggestions(filteredGenres);
    }
  };
  const handleArtistSelect = (selectedArtist) => {
    setAlbumData({ ...albumData, artist: selectedArtist.fullName });
    setArt(selectedArtist._id);
    setArtistSuggestions([]);
  };

  const handleGenreSelect = (selectedGenre) => {
    setAlbumData({ ...albumData, genre: selectedGenre.name });
    setGen(selectedGenre._id);
    setGenreSuggestions([]);
  };
  const handleFileChange = (e) => {
    setAlbumData((prevState) => ({
      ...prevState,

      coverImage: e.target.files[0],
    }));
  };
  const handleCreateAlbum = async () => {
    if (Object.values(albumData).some((field) => field === "")) {
      alert("Please fill in all fields.");
      return;
    }
    albumData.artist = art;
    albumData.genre = gen;
    const formData = new FormData();
    formData.append("title", albumData.title);
    formData.append("artist", albumData.artist);
    formData.append("genre", albumData.genre);
    formData.append("company", albumData.company);
    formData.append("coverImage", albumData.coverImage);

    try {
      const response = await axios.post(
        "https://backend-music-xg6e.onrender.com/api/v1/albums",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        const id = response.data._id;

        navigate(`/admin/album/${id}`);
      }
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };
  useEffect(() => {
    axios
      .get("https://backend-music-xg6e.onrender.com/api/v1/albums")
      .then((response) => {
        setAlbums(response.data);
      });

    // Fetch featured albums
    axios
      .get(
        "https://backend-music-xg6e.onrender.com/api/v1/albums/featureAlbums"
      )
      .then((response) => {
        setFeaturedAlbums(response.data);
      });

    // Fetch featured artists
    axios
      .get(
        "https://backend-music-xg6e.onrender.com/api/v1/user/featuredArtists"
      )
      .then((response) => {
        setFeaturedArtists(response.data);
      });
    axios
      .get("https://backend-music-xg6e.onrender.com/api/v1/user/artist")
      .then((response) => {
        setArtist(response.data);
      });
    axios
      .get("https://backend-music-xg6e.onrender.com/api/v1/genre")
      .then((response) => {
        setGenre(response.data);
      });
  }, []);

  const renderCards = (data, type, showMore) => {
    const layoutClasses = showMore
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      : "flex space-x-4 overflow-x-auto scrollbar-hide";

    return (
      <div className={layoutClasses}>
        {data.map((item) => (
          <div
            key={item?._id}
            className="bg-white rounded-lg shadow-lg w-64 h-80 flex-shrink-0 p-4 cursor-pointer"
            style={{ minWidth: "16rem", minHeight: "20rem" }}
            onClick={() => navigate(`/admin/album/${item?._id}`)} // Navigate to the respective album page
          >
            <img
              src={item?.coverImage}
              alt={item?.title}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            {type == "featuredArtists" ? (
              <h3 className="text-lg font-semibold">{item?.fullName}</h3>
            ) : (
              <p></p>
            )}
            <h3 className="text-lg font-semibold">{item?.title}</h3>
            {type == "top15" ? (
              <p className="text-sm text-gray-500">By {item?.artist}</p>
            ) : (
              <p className="text-sm text-gray-500 py-2">
                By: <span className="font-bold">{item?.artist?.fullName}</span>
              </p>
            )}
            <hr className="h-2" />
            <div className="flex justify-between mt-3">
              <button className="bg-red-500 text-xs text-white p-2 rounded-2xl">
                Delete
              </button>
              <button className="bg-blue-500 text-xs text-white p-2 rounded-2xl">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12 shadow-2xl p-5">
      <section>
        <div className="flex justify-between items-center">
          <div className="flex my-5">
            <h2 className="text-3xl font-bold mb-4">All Albums</h2>
            <button
              onClick={() => setShowDialog(true)}
              className="bg-green-700 text-white px-2 text-sm rounded-xl shadow-2xl ml-3"
            >
              Add New Album
            </button>
          </div>

          <button
            onClick={() => setShowMoreAlbums(!showMoreAlbums)}
            className="text-blue-500 underline"
          >
            {showMoreAlbums ? "View Less" : "View More"}
          </button>
        </div>
        <div className="overflow-hidden">
          {albums?.allAlbums?.length ? (
            renderCards(albums.allAlbums, "Allalbum", showMoreAlbums)
          ) : (
            <p>Loading albums...</p>
          )}
        </div>
      </section>

      {/* Featured Albums Section */}
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-4">Featured Albums</h2>
          <button
            onClick={() => setShowMoreFeaturedAlbums(!showMoreFeaturedAlbums)}
            className="text-blue-500 underline"
          >
            {showMoreFeaturedAlbums ? "View Less" : "View More"}
          </button>
        </div>
        <div className="overflow-hidden">
          {featuredAlbums.length ? (
            renderCards(featuredAlbums, "album", showMoreFeaturedAlbums)
          ) : (
            <p>Loading featured albums...</p>
          )}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-4">Featured Artists</h2>
          <button
            onClick={() => setShowMoreArtists(!showMoreArtists)}
            className="text-blue-500 underline"
          >
            {showMoreArtists ? "View Less" : "View More"}
          </button>
        </div>
        <div className="overflow-hidden">
          {featuredArtists.length ? (
            renderCards(featuredArtists, "artist", showMoreArtists)
          ) : (
            <p>Loading featured artists...</p>
          )}
        </div>
      </section>
      {/* Modal for album information */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Album</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Album Title"
                className="w-full p-2 border rounded-lg"
                value={albumData.title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="artist"
                placeholder="Artist"
                className="w-full p-2 border rounded-lg"
                value={albumData.artist}
                onChange={handleInputChange}
              />
              {/* Dropdown for artist suggestions */}
              {artistSuggestions.length > 0 && (
                <ul className="border h-20 overflow-hidden rounded-lg p-2 w-full bg-white">
                  {artistSuggestions.map((artist) => (
                    <li
                      key={artist._id}
                      className="cursor-pointer p-1 hover:bg-gray-200"
                      onClick={() => handleArtistSelect(artist)}
                    >
                      {artist.fullName}
                    </li>
                  ))}
                </ul>
              )}

              <input
                type="text"
                name="genre"
                placeholder="Genre"
                className="w-full p-2 border rounded-lg"
                value={albumData.genre}
                onChange={handleInputChange}
              />
              {/* Dropdown for genre suggestions */}
              {genreSuggestions.length > 0 && (
                <ul className="border rounded-lg p-2 w-full bg-white">
                  {genreSuggestions.map((genre) => (
                    <li
                      key={genre._id}
                      className="cursor-pointer p-1 hover:bg-gray-200"
                      onClick={() => handleGenreSelect(genre)}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="text"
                name="company"
                placeholder="Company"
                className="w-full p-2 border rounded-lg"
                value={albumData.company}
                onChange={handleInputChange}
              />
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Exit
              </button>
              <button
                onClick={handleCreateAlbum}
                className="bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
