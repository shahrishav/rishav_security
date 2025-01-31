import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { viewProfileApi, updateProfileApi } from "../../apis/Api";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found, fetching profile...");
      fetchUserProfile();
    } else {
      console.error("Token not found.");
      toast.error("You need to be logged in to view your profile.");
      navigate("/login"); // Redirect to login if token is missing
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await viewProfileApi();
      if (response.status === 200) {
        const userData = response.data.user;
        setUser(userData);
        setFirstName(userData.fname || userData.fullname.split(" ")[0]);
        setLastName(userData.lname || userData.fullname.split(" ")[1]);
        setEmail(userData.email);
        setPhone(userData.phone);
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to fetch profile details. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        toast.error(
          `Failed to fetch profile details. Status: ${error.response.status}, Message: ${error.response.data.message}`
        );
      } else {
        console.error("Error message:", error.message);
        toast.error("An error occurred while fetching the profile.");
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        fname: `${firstName}`,
        lname: `${lastName}`,
        email,
        phone,
      };
      await updateProfileApi(updatedUser);
      toast.success("Profile updated successfully!");
      navigate("/user"); // Redirect to dashboard after update
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        toast.error(
          `Failed to update profile. Status: ${error.response.status}, Message: ${error.response.data.message}`
        );
      } else {
        console.error("Error message:", error.message);
        toast.error("An error occurred while updating the profile.");
      }
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <form className="profile-form" onSubmit={handleUpdateProfile}>
        <label className="profile-label">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="profile-input"
        />

        <label className="profile-label">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="profile-input"
        />

        <label className="profile-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="profile-input"
        />

        <label className="profile-label">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="profile-input"
        />

        <button type="submit" className="profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
