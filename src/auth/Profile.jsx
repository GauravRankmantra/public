import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../asset/logo.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Profile = () => {
  const location = useLocation();

  const [oldpass, setoldpass] = useState(localStorage.getItem("pass"));
  const [password, setPassword] = useState(oldpass);
  const [confirmPassword, setConfirmPassword] = useState(oldpass);
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://dummyimage.com/151x151"
  );

  const handleSave = async () => {
    console.log("pass inside handelsave", password);
    if (password !== confirmPassword) {
      console.log("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);
      const token = await localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(
        "https://backend-music-xg6e.onrender.com/user/update",
        {
          password: password,
          confirmPassword: confirmPassword,
          email: email,
          name: name,
          user: user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response?.data?.data.user));
        localStorage.setItem("pass", password);

        const updatedUser = response.data.user;
        setName(updatedUser.name);
        setEmail(updatedUser.email);
        setoldpass(localStorage.getItem("pass"));
        setPassword(localStorage.getItem("pass"));
        setConfirmPassword(localStorage.getItem("pass"));
      } else {
        console.log("Failed to update the password", "error");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      fetch("https://backend-music-xg6e.onrender.com/api/images/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setProfileImage(data.data.secure_url);
            alert("Image uploaded successfully!");
          } else {
            alert("Error uploading image.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error uploading image.");
        });
    }
  };

  const toggleDropdown = (event) => {
    event.preventDefault();
    setDropdownOpen(!dropdownOpen);
    console.log(dropdownOpen);
  };

  const handleSettingClick = (event) => {
    event.preventDefault();
    console.log("Settings clicked");
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
    console.log("Logout clicked");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in. Please log in to view your profile.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserData(user);
      setName(user.name);
      setEmail(user.email);
    } else {
      setError("No user data available");
      toast.error("No user data found. Please log in again.");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div class="ms_main_wrapper ms_profile">
        <div class="ms_sidemenu_wrapper">
          <div class="ms_nav_close">
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
          <div class="ms_sidemenu_inner">
            <div class="ms_logo_inner">
              <div class="ms_logo">
                <Link to="/">
                  <img src={logo} alt="" class="img-fluid" />
                </Link>
              </div>
              <div class="ms_logo_open">
                <Link to="/">
                  <img src={logo} alt="" class="img-fluid" />
                </Link>
              </div>
            </div>
            <div class="ms_nav_wrapper">
              <ul>
                <li>
                  <a href="index.html" class="active" title="Discover">
                    <span class="nav_icon">
                      <span class="icon icon_discover"></span>
                    </span>
                    <span class="nav_text">discover</span>
                  </a>
                </li>
                <li>
                  <Link to="/album" title="Albums">
                    <span class="nav_icon">
                      <span class="icon icon_albums"></span>
                    </span>
                    <span class="nav_text">albums</span>
                  </Link>
                </li>
                <li>
                  <a href="artist.html" title="Artists">
                    <span class="nav_icon">
                      <span class="icon icon_artists"></span>
                    </span>
                    <span class="nav_text">artists</span>
                  </a>
                </li>
                <li>
                  <a href="genres.html" title="Genres">
                    <span class="nav_icon">
                      <span class="icon icon_genres"></span>
                    </span>
                    <span class="nav_text">genres</span>
                  </a>
                </li>
                <li>
                  <a href="top_track.html" title="Top Tracks">
                    <span class="nav_icon">
                      <span class="icon icon_tracks"></span>
                    </span>
                    <span class="nav_text">top tracks</span>
                  </a>
                </li>
                <li>
                  <a href="free_music.html" title="Free Music">
                    <span class="nav_icon">
                      <span class="icon icon_music"></span>
                    </span>
                    <span class="nav_text">free music</span>
                  </a>
                </li>
                <li>
                  <a href="stations.html" title="Stations">
                    <span class="nav_icon">
                      <span class="icon icon_station"></span>
                    </span>
                    <span class="nav_text">stations</span>
                  </a>
                </li>
              </ul>
              <ul class="nav_downloads">
                <li>
                  <a href="download.html" title="Downloads">
                    <span class="nav_icon">
                      <span class="icon icon_download"></span>
                    </span>
                    <span class="nav_text">downloads</span>
                  </a>
                </li>
                <li>
                  <a href="purchase.html" title="Purchased">
                    <span class="nav_icon">
                      <span class="icon icon_purchased"></span>
                    </span>
                    <span class="nav_text">purchased</span>
                  </a>
                </li>
                <li>
                  <a href="favourite.html" title="Favourites">
                    <span class="nav_icon">
                      <span class="icon icon_favourite"></span>
                    </span>
                    <span class="nav_text">favourites</span>
                  </a>
                </li>
                <li>
                  <a href="history.html" title="History">
                    <span class="nav_icon">
                      <span class="icon icon_history"></span>
                    </span>
                    <span class="nav_text">history</span>
                  </a>
                </li>
              </ul>
              <ul class="nav_playlist">
                <li>
                  <a href="feature_playlist.html" title="Featured Playlist">
                    <span class="nav_icon">
                      <span class="icon icon_fe_playlist"></span>
                    </span>
                    <span class="nav_text">featured playlist</span>
                  </a>
                </li>
                <li>
                  <a href="add_playlist.html" title="Create Playlist">
                    <span class="nav_icon">
                      <span class="icon icon_c_playlist"></span>
                    </span>
                    <span class="nav_text">create playlist</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="padder_top80">
          <div className="ms_header">
            <div className="ms_top_left">
              <div className="ms_top_search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Music Here.."
                />
                <span className="search_icon">
                  <img src="assets/images/svg/search.svg" alt="" />
                </span>
              </div>
              <div className="ms_top_trend">
                <span>
                  <a href="#" className="ms_color">
                    Trending Songs :
                  </a>
                </span>
                <span className="top_marquee">
                  <a href="#">
                    Dream your moments, Until I Met You, Gimme Some Courage,
                    Dark Alley (+8 More)
                  </a>
                </span>
              </div>
            </div>
            <div className="ms_top_right">
              <div className="ms_top_lang">
                <span data-toggle="modal" data-target="#lang_modal">
                  languages <img src="assets/images/svg/lang.svg" alt="" />
                </span>
              </div>
              <div className="ms_top_btn">
                <a href="upload.html" className="ms_btn ms_upload_btn">
                  upload
                </a>
                <a className="ms_admin_name">
                  <span className="hello-bella-hide">
                    Hello {userData.name}
                  </span>
                  <span className="ms_pro_name" onClick={toggleDropdown}>
                    {name[0]}
                  </span>
                </a>
                {dropdownOpen && (
                  <ul className="pro_dropdown_menu">
                    <li>
                      <a href="profile.html">Profile</a>
                    </li>
                    <li>
                      <a href="manage_acc.html" target="_blank">
                        Pricing Plan
                      </a>
                    </li>
                    <li>
                      <a href="blog.html" target="_blank">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={handleSettingClick}>
                        Setting
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={handleLogoutClick}>
                        Logout
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div class="ms_profile_wrapper">
            <h1>Edit Profile</h1>
            <div class="ms_profile_box">
              <div className="ms_pro_img">
                <img
                  id="profile-image"
                  src={profileImage}
                  alt="Profile"
                  className="img-fluid"
                />

                <div className="pro_img_overlay">
                  <i
                    className="fa_icon edit_icon"
                    onClick={() =>
                      document.getElementById("image-input").click()
                    }
                  ></i>
                </div>

                <input
                  type="file"
                  id="image-input"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div class="ms_pro_form">
                <div class="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    style={{ color: "black" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    style={{ color: "black" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Your Password *</label>
                  <input
                    type="text"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: "black" }}
                    value={password}
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="text"
                    name="confirmPassword"
                    value={confirmPassword}
                    class="form-control"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div class="pro-form-btn text-center marger_top15">
                  <button onClick={handleSave} class="ms_btn">
                    Save
                  </button>

                  <button class="ms_btn">Cancel</button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    class="ms_btn"
                    style={{ backgroundColor: "red" }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ms_footer_wrapper">
          <div class="ms_footer_logo">
            <a href="index.html">
              <img src="https://dummyimage.com/126x97" alt="" />
            </a>
          </div>
          <div class="ms_footer_inner">
            <div class="row">
              <div class="col-lg-3 col-md-6">
                <div class="footer_box">
                  <h1 class="footer_title">music template</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat duis
                    aute irure dolor.
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="footer_box footer_app">
                  <h1 class="footer_title">Download our App</h1>
                  <p>
                    Go Mobile with our app.
                    <br /> Listen to your favourite songs at just one click.
                    Download Now !
                  </p>
                  {/* <a href="#" class="foo_app_btn"><img src="assets/images/google_play.jpg" alt="" class="img-fluid" /></a>
                        <a href="#" class="foo_app_btn"><img src="assets/images/app_store.jpg" alt="" class="img-fluid" /></a>
                        <a href="#" class="foo_app_btn"><img src="assets/images/windows.jpg" alt="" class="img-fluid" /></a> */}
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="footer_box footer_subscribe">
                  <h1 class="footer_title">subscribe</h1>
                  <p>
                    Subscribe to our newsletter and get latest updates and
                    offers.
                  </p>
                  <form>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <div class="form-group">
                      <a href="#" class="ms_btn">
                        sign me up
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="footer_box footer_contacts">
                  <h1 class="footer_title">contact us</h1>
                  <ul class="foo_con_info">
                    <li>
                      <div class="foo_con_icon">
                        <img src="assets/images/svg/phone.svg" alt="" />
                      </div>
                      <div class="foo_con_data">
                        <span class="con-title">Call us :</span>
                        <span>(+1) 202-555-0176, (+1) 2025-5501</span>
                      </div>
                    </li>
                    <li>
                      <div class="foo_con_icon">
                        <img src="assets/images/svg/message.svg" alt="" />
                      </div>
                      <div class="foo_con_data">
                        <span class="con-title">email us :</span>
                        <span>
                          <a href="#">demo@mail.com </a>,{" "}
                          <a href="#">dummy@mail.com</a>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div class="foo_con_icon">
                        <img src="assets/images/svg/add.svg" alt="" />
                      </div>
                      <div class="foo_con_data">
                        <span class="con-title">walk in :</span>
                        <span>598 Old House Drive, London</span>
                      </div>
                    </li>
                  </ul>
                  <div class="foo_sharing">
                    <div class="share_title">follow us :</div>
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-google-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="ms_copyright">
              <div class="footer_border"></div>
              <p>
                Copyright &copy; 2022{" "}
                <a href="#">The Miraculous Music Template</a>. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>

        <div class="ms_player_wrapper">
          <div class="ms_player_close">
            <i class="fa fa-angle-up" aria-hidden="true"></i>
          </div>
          <div class="player_mid">
            <div class="audio-player">
              <div id="jquery_jplayer_1" class="jp-jplayer"></div>
              <div
                id="jp_container_1"
                class="jp-audio"
                role="application"
                aria-label="media player"
              >
                <div class="player_left">
                  <div class="ms_play_song">
                    <div class="play_song_name">
                      <a href="javascript:void(0);" id="playlist-text">
                        <div class="jp-now-playing flex-item">
                          <div class="jp-track-name"></div>
                          <div class="jp-artist-name"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="play_song_options">
                    <ul>
                      <li>
                        <a href="#">
                          <span class="song_optn_icon">
                            <i class="ms_icon icon_download"></i>
                          </span>
                          download now
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="song_optn_icon">
                            <i class="ms_icon icon_fav"></i>
                          </span>
                          Add To Favourites
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="song_optn_icon">
                            <i class="ms_icon icon_playlist"></i>
                          </span>
                          Add To Playlist
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="song_optn_icon">
                            <i class="ms_icon icon_share"></i>
                          </span>
                          Share
                        </a>
                      </li>
                    </ul>
                  </div>
                  <span class="play-left-arrow">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </span>
                </div>

                <div class="jp_queue_wrapper">
                  <span class="que_text" id="myPlaylistQueue">
                    <i class="fa fa-angle-up" aria-hidden="true"></i> queue
                  </span>
                  <div id="playlist-wrap" class="jp-playlist">
                    <div class="jp_queue_cls">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <h2>queue</h2>
                    <div class="jp_queue_list_inner">
                      <ul>
                        <li>&nbsp;</li>
                      </ul>
                    </div>
                    <div class="jp_queue_btn">
                      <a
                        href="javascript:;"
                        class="ms_clear"
                        data-toggle="modal"
                        data-target="#clear_modal"
                      >
                        clear
                      </a>
                      <a
                        href="clear_modal"
                        class="ms_save"
                        data-toggle="modal"
                        data-target="#save_modal"
                      >
                        save
                      </a>
                    </div>
                  </div>
                </div>
                <div class="jp-type-playlist">
                  <div class="jp-gui jp-interface flex-wrap">
                    <div class="jp-controls flex-item">
                      <button class="jp-previous" tabIndex="0">
                        <i class="ms_play_control"></i>
                      </button>
                      <button class="jp-play" tabIndex="0">
                        <i class="ms_play_control"></i>
                      </button>
                      <button class="jp-next" tabIndex="0">
                        <i class="ms_play_control"></i>
                      </button>
                    </div>
                    <div class="jp-progress-container flex-item">
                      <div class="jp-time-holder">
                        <span
                          class="jp-current-time"
                          role="timer"
                          aria-label="time"
                        >
                          &nbsp;
                        </span>
                        <span
                          class="jp-duration"
                          role="timer"
                          aria-label="duration"
                        >
                          &nbsp;
                        </span>
                      </div>
                      <div class="jp-progress">
                        <div class="jp-seek-bar">
                          <div class="jp-play-bar">
                            <div class="bullet"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="jp-volume-controls flex-item">
                      <div class="widget knob-container">
                        <div class="knob-wrapper-outer">
                          <div class="knob-wrapper">
                            <div class="knob-mask">
                              <div class="knob d3">
                                <span></span>
                              </div>
                              <div class="handle"></div>
                              <div class="round">
                                <img
                                  src="assets/images/svg/volume.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          {/* <input></input> */}
                        </div>
                      </div>
                    </div>
                    <div class="jp-toggles flex-item">
                      <button class="jp-shuffle" tabindex="0" title="Shuffle">
                        <i class="ms_play_control"></i>
                      </button>
                      <button class="jp-repeat" tabindex="0" title="Repeat">
                        <i class="ms_play_control"></i>
                      </button>
                    </div>
                    <div class="jp_quality_optn custom_select">
                      <select>
                        <option>quality</option>
                        <option value="1">HD</option>
                        <option value="2">High</option>
                        <option value="3">medium</option>
                        <option value="4">low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ms_register_popup">
        <div id="myModal" class="modal  centered-modal" role="dialog">
          <div class="modal-dialog register_dialog">
            <div class="modal-content">
              <button type="button" class="close" data-dismiss="modal">
                <i class="fa_icon form_close"></i>
              </button>
              <div class="modal-body">
                <div class="ms_register_img">
                  <img
                    src="assets/images/register_img.png"
                    alt=""
                    class="img-fluid"
                  />
                </div>
                <div class="ms_register_form">
                  <h2>Register / Sign Up</h2>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      class="form-control"
                    />
                    <span class="form_icon">
                      <i class="fa_icon form-user" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      class="form-control"
                    />
                    <span class="form_icon">
                      <i class="fa_icon form-envelope" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      class="form-control"
                    />
                    <span class="form_icon">
                      <i class="fa_icon form-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      class="form-control"
                    />
                    <span class="form_icon">
                      <i class=" fa_icon form-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <a href="#" class="ms_btn">
                    register now
                  </a>
                  <p>
                    Already Have An Account?{" "}
                    <a
                      href="#myModal1"
                      data-toggle="modal"
                      class="ms_modal hideCurrentModel"
                    >
                      login here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="myModal1" class="modal  centered-modal" role="dialog">
          <div class="modal-dialog login_dialog">
            <div class="modal-content">
              <button type="button" class="close" data-dismiss="modal">
                <i class="fa_icon form_close"></i>
              </button>
              <div class="modal-body">
                <div class="ms_register_img">
                  <img
                    src="assets/images/register_img.png"
                    alt=""
                    class="img-fluid"
                  />
                </div>
                <div class="ms_register_form">
                  <h2>login / Sign in</h2>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      class="form-control"
                    />
                    <span class="form_icon">
                      <i class="fa_icon form-envelope" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      class="form-control"
                    />
                    <span class="form_icon">
                      <i class="fa_icon form-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="remember_checkbox">
                    <label>
                      Keep me signed in
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <a href="#" class="ms_btn">
                    login now
                  </a>
                  <div class="popup_forgot">
                    <a href="#">Forgot Password ?</a>
                  </div>
                  <p>
                    Don't Have An Account?{" "}
                    <a
                      href="#myModal"
                      data-toggle="modal"
                      class="ms_modal1 hideCurrentModel"
                    >
                      register here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ms_lang_popup">
        <div id="lang_modal" class="modal  centered-modal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <button type="button" class="close" data-dismiss="modal">
                <i class="fa_icon form_close"></i>
              </button>
              <div class="modal-body">
                <h1>language selection</h1>
                <p>Please select the language(s) of the music you listen to.</p>
                <ul class="lang_list">
                  <li>
                    <label class="lang_check_label">
                      English
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      hindi
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      punjabi
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      French
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      German
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      Spanish
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      Chinese
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      Japanese
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      Arabic
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                  <li>
                    <label class="lang_check_label">
                      Italian
                      <input type="checkbox" name="check" />
                      <span class="label-text"></span>
                    </label>
                  </li>
                </ul>
                <div class="ms_lang_btn">
                  <a href="#" class="ms_btn">
                    apply
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ms_clear_modal">
        <div id="clear_modal" class="modal  centered-modal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <button type="button" class="close" data-dismiss="modal">
                <i class="fa_icon form_close"></i>
              </button>
              <div class="modal-body">
                <h1>Are you sure you want to clear your queue?</h1>
                <div class="clr_modal_btn">
                  <a href="#">clear all</a>
                  <a href="#">cancel</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ms_save_modal">
        <div id="save_modal" class="modal  centered-modal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <button type="button" class="close" data-dismiss="modal">
                <i class="fa_icon form_close"></i>
              </button>
              <div class="modal-body">
                <h1>Log in to start sharing your music!</h1>
                <div class="save_modal_btn">
                  <a href="#">
                    <i class="fa fa-google-plus-square" aria-hidden="true"></i>{" "}
                    continue with google{" "}
                  </a>
                  <a href="#">
                    <i class="fa fa-facebook-square" aria-hidden="true"></i>{" "}
                    continue with facebook
                  </a>
                </div>
                <div class="ms_save_email">
                  <h3>or use your email</h3>
                  <div class="save_input_group">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      class="form-control"
                    />
                  </div>
                  <div class="save_input_group">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      class="form-control"
                    />
                  </div>
                  <button class="save_btn">Log in</button>
                </div>
                <div class="ms_dnt_have">
                  <span>Dont't have an account ?</span>
                  <a
                    href="javascript:;"
                    class="hideCurrentModel"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
