import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeAdmin = () => {
  // States to hold data
  const [albums, setAlbums] = useState([]);
  const [top15, setTop15] = useState([]);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);

  // States to control the "View More" functionality
  const [showMoreAlbums, setShowMoreAlbums] = useState(false);
  const [showMoreFeaturedAlbums, setShowMoreFeaturedAlbums] = useState(false);
  const [showMoreArtists, setShowMoreArtists] = useState(false);
  const [showMoreTop15, setShowMoreTop15] = useState(false);

  useEffect(() => {
    axios
      .get("https://backend-music-xg6e.onrender.com/api/v1/albums")
      .then((response) => {
        setAlbums(response.data);
      });

    axios
      .get("https://backend-music-xg6e.onrender.com/api/v1/song/top15")
      .then((response) => {
        setTop15(response.data);
      });

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
            className="bg-white rounded-lg shadow-lg w-64 h-80 flex-shrink-0 p-4"
            style={{ minWidth: "16rem", minHeight: "20rem" }}
          >
            <img
              src={
                item?.coverImage
                  ? item.coverImage
                  : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-photo%2Fclose-up-microphone-recording-studio-with-singer-singing-background_19805581.htm&psig=AOvVaw1eKNPsnr68Ai1WDyHRNvA-&ust=1741798354028000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjy7tW-gowDFQAAAAAdAAAAABAJ"
              }
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
              <p className="text-sm text-gray-500">
                By {item?.artist?.fullName}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* All Albums Section */}

      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-4">Top 15 Songs</h2>
          <button
            onClick={() => setShowMoreTop15(!showMoreTop15)}
            className="text-blue-500 underline"
          >
            {showMoreTop15 ? "View Less" : "View More"}
          </button>
        </div>
        <div className="overflow-hidden">
          {top15.data?.length ? (
            renderCards(top15.data, "top15", showMoreTop15)
          ) : (
            <p>Loading albums...</p>
          )}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-4">All Albums</h2>
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

      {/* Featured Artists Section */}
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
            renderCards(featuredArtists, "featuredArtists", showMoreArtists)
          ) : (
            <p>Loading featured artists...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeAdmin;
