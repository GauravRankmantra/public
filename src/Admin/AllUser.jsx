import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUser = () => {
  // State to store users data
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
    isVerified: false,
    popularity: "",
    isFeatured: false,
    coverImage: null,
  });

  useEffect(() => {
    axios
      .get("https://backend-music-xg6e.onrender.com/api/v1/admin/users")
      .then((response) => {
        const sortedUsers = response.data.allUsers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setUsers(sortedUsers);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  // Function to handle delete confirmation
  const handleDelete = (userId) => {
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(
        `https://backend-music-xg6e.onrender.com/api/v1/admin/user/${selectedUser}`
      )
      .then((response) => {
        // After successful deletion, refetch the users
        setUsers(users.filter((user) => user._id !== selectedUser));
        setShowDeleteModal(false);
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  // Function to open the edit modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setShowEditModal(true);
  };

  // Function to save the edited user role
  const saveChanges = () => {
    axios
      .put(
        `https://backend-music-xg6e.onrender.com/api/v1/admin/user/${selectedUser._id}`,
        {
          role,
        }
      )
      .then((response) => {
        // Update the role in the list after a successful update
        const updatedUsers = users.map((user) =>
          user._id === selectedUser._id ? { ...user, role } : user
        );
        setUsers(updatedUsers);
        setShowEditModal(false);
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update the state based on input type
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleFileChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      coverImage: e.target.files[0], // Set file object to coverImage
    }));
  };

  const addUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("role", userData.role);
    formData.append("isVerified", userData.isVerified);
    formData.append("popularity", userData.popularity);

    if (userData.role === "artist") {
      formData.append("isFeatured", userData.isFeatured);
    }

    if (userData.coverImage) {
      formData.append("coverImage", userData.coverImage);
    }

    try {
      const response = await axios.post(
        "https://backend-music-xg6e.onrender.com/api/v1/user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("User registered successfully!");
        setShowAddModel(false); // Close the modal
        setUsers((prevUsers) => [response.data.user, ...prevUsers]);
      } else {
        alert("Failed to register user.");
      }
    } catch (error) {
      console.error("Error while registering user:", error);
      alert("There was an error registering the user.");
    }
  };

  const handelAddNew = () => {
    setShowAddModel(true);
  };

  return (
    <div className="p-4">
      <div className="flex space-x-3 my-2">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <button
          onClick={() => handelAddNew()}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-md"
          >
            <div className="flex p-2 justify-center items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={user.coverImage}
              ></img>
              <div className="px-2">
                <p className="font-semibold text-2xl">{user.fullName}</p>
                <p className="text-gray-500">{user.email}</p>
                <p>
                  Role: <span className="font-semibold">{user.role}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(user)}
                className="bg-blue-700 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-800 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <p>
              <strong>Name: </strong>
              {selectedUser.fullName}
            </p>
            <p>
              <strong>Email: </strong>
              {selectedUser.email}
            </p>
            <div className="mt-4">
              <label htmlFor="role" className="block font-semibold">
                Role:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="artist">Artist</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={saveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New User</h3>
            <form onSubmit={addUser}>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                />
              </div>
              <div>
                <label>Role</label>
                <select
                  name="role"
                  value={userData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="user">User</option>
                  <option value="artist">Artist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label>Is Verified</label>
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={userData.isVerified}
                  onChange={handleInputChange}
                  className="ml-2"
                />
              </div>
              <div>
                <label>Popularity</label>
                <input
                  type="number"
                  name="popularity"
                  value={userData.popularity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                />
              </div>

              {userData.role === "artist" && (
                <div>
                  <label>Is Featured</label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={userData.isFeatured}
                    onChange={handleInputChange}
                    className="ml-2"
                  />
                </div>
              )}

              <div>
                <label>Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded mb-2"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModel(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
