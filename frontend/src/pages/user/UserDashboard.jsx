import React, { useEffect, useState } from "react";
import {
  FaVenue,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import "./UserDashboard.css";
import {
  getAllCategorys,
  getVenuesByCategory,
  getAllVenues,
} from "../../apis/Api";
import VenueCard from "../../components/VenueCard";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("categorys");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("12345");
  const [categorys, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetchCategorys();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      fetchAllVenues(); // Fetch all venues when "All Categories" is selected
    } else if (selectedCategory) {
      fetchVenues(selectedCategory); // Fetch venues by specific category
    } else {
      setVenues([]);
    }
  }, [selectedCategory]);

  const fetchCategorys = async () => {
    try {
      const response = await getAllCategorys();
      setCategorys(response.data.data);
      toast.success("Categories fetched successfully");
    } catch (error) {
      console.error(
        "Error fetching categories:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch categories");
    }
  };

  const fetchVenues = async (categoryId) => {
    try {
      const response = await getVenuesByCategory(categoryId);
      setVenues(response.data.data);
      toast.success("Venues fetched successfully");
    } catch (error) {
      console.error(
        "Error fetching venues:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch venues");
    }
  };

  const fetchAllVenues = async () => {
    try {
      const response = await getAllVenues(); // Assuming this API exists to fetch all venues
      setVenues(response.data.data);
      toast.success("All venues fetched successfully");
    } catch (error) {
      console.error(
        "Error fetching all venues:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch all venues");
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category._id || "all");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, firstName, lastName, email };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.slice(0, 5));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        {activeSection === "categorys" && (
          <div className="section">
            <h2 className="section-title">Available Categories</h2>
            <Carousel autoplay>
              {categorys.map((category) => (
                <div key={category._id} className="carousel-item">
                  <img
                    src={`http://localhost:5500/categorys/${category.image}`}
                    alt={category.name}
                    className="carousel-image"
                  />
                  <div className="carousel-caption">
                    <h3>{category.name}</h3>
                    <button
                      className="button"
                      onClick={() => handleSelectCategory(category)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>

            {/* Dropdown to filter venues by category */}
            <div className="filter-section">
              <label htmlFor="categorySelect">Select Category: </label>
              <select
                id="categorySelect"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categorys.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Display venues using the VenueCard component */}
            <div className="venues-section">
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <VenueCard key={venue._id} venueInformation={venue} />
                ))
              ) : (
                <p>No venues available for the selected category.</p>
              )}
            </div>
          </div>
        )}

        {activeSection === "accountSettings" && (
          <div className="section">
            <h2 className="section-title">Account Settings</h2>
            <form className="form" onSubmit={handleSubmit}>
              <label className="label">First Name:</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
              <label className="label">Last Name:</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
              <label className="label">Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
              <label className="label">Password:</label>
              <input
                type="text"
                placeholder="Enter your password (Max 5 characters)"
                value={password}
                onChange={handlePasswordChange}
                className="input"
                maxLength={5}
              />
              <button type="submit" className="button">
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
