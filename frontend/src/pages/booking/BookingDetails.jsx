import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./BookingDetails.css"; // Ensure to customize any additional styles if needed
import { viewBookingApi, viewAllBookings } from "../../apis/Api";

const BookingDetails = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]); // Array to store multiple bookings
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      console.log("Token found, fetching bookings...");
      let userId = JSON.parse(user)["_id"];
      let userRole = JSON.parse(user)["role"];

      fetchUserBookings(userId, userRole);
    } else {
      console.error("Token not found.");
      toast.error("You need to be logged in to view your bookings.");
      navigate("/login"); // Redirect to login if token is missing
    }
  }, [navigate]);

  const fetchUserBookings = async (userId, userRole) => {
    try {
      const response =
        userRole == "user"
          ? await viewBookingApi(userId)
          : await viewAllBookings();
      console.log(response.status);
      if (response.status === 200) {
        console.log("response is:", response.data.data);
        setBookings(response.data.data); // Set bookings data to state
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to fetch booking details. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        toast.error(
          `Failed to fetch booking details. Status: ${error.response.status}, Message: ${error.response.data.message}`
        );
      } else {
        console.error("Error message:", error.message);
        toast.error("An error occurred while fetching the bookings.");
      }
    } finally {
      setLoading(false); // Stop loading regardless of the result
    }
  };

  if (loading) {
    return <div className="text-center">Loading booking details...</div>; // Loading state
  }

  if (bookings.length === 0) {
    return <div className="text-center">No bookings found.</div>; // Case where no bookings are found
  }

  return (
    <div className="container booking-container mt-4">
      <h2 className="text-center mb-4">My Bookings</h2>
      <div className="row">
        {bookings.map((booking) => (
          <div className="col-12 col-md-10 mx-auto mb-3" key={booking._id}>
            <div className="card shadow-sm border-0 booking-card">
              <div className="row g-0">
                <div className="col-md-5">
                  <img
                    src={`http://localhost:5500/venues/${booking.venue.image}`}
                    alt={booking.venue.name}
                    className="img-fluid rounded-start"
                    style={{ maxHeight: "220px", objectFit: "cover" }} // Reduced max height
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">{booking.venue.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Booking ID: {booking._id} | Status: {booking.status}
                    </h6>
                    <p className="card-text">
                      <strong>Check-in:</strong>{" "}
                      {new Date(booking.checkInDate).toLocaleDateString()}
                      <br />
                      <strong>Check-out:</strong>{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                      <br />
                      <strong>Guests:</strong> {booking.numberOfGuests}
                      <br />
                      <strong>Total Price:</strong> ${booking.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDetails;
