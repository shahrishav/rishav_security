import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../../apis/Api";
import { toast } from "react-toastify";
import KhaltiCheckout from "khalti-checkout-web";
import "./VenueBooking.css";
// import { khaltiImg } from "../../../public/assets/icons/khalti.png";

const BookingPage = () => {
  const { venueId, venuePrice } = useParams(); // Get the venueId from the URL params
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    totalPrice: 0,
  });
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState("wallet"); // State for radio buttons

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleBooking = async () => {
    console.log(selectedOption);
    if (selectedOption == "wallet") {
      handleKhaltiPayment();
    } else {
      finishBooking("pending");
    }
  };

  const finishBooking = async (status) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const data = {
        userId: userData["_id"], // Assuming user ID is stored in localStorage after login
        venueId,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        numberOfGuests: bookingDetails.numberOfGuests,
        totalPrice: calculateTotalPrice(), // Implement a function to calculate the total price
        status: status,
      };
      await createBooking(data);
      navigate("/user"); // Navigate to user dashboard or a success page after booking
    } catch (err) {
      setError("Booking failed. Please try again.");
      console.error(err);
    }
  };

  const calculateTotalPrice = () => {
    const pricePerNight = venuePrice; // Assuming a price per night
    const nights =
      (new Date(bookingDetails.checkOutDate) -
        new Date(bookingDetails.checkInDate)) /
      (1000 * 60 * 60 * 24);
    return nights * pricePerNight * bookingDetails.numberOfGuests;
  };

  const handleKhaltiPayment = () => {
    let config = {
      publicKey: "test_public_key_0800545e039d45368cab4d1b2fb93d01",
      productIdentity: "1234567890",
      productName: "Cart Items",
      productUrl: "http://example.com/cart",
      eventHandler: {
        onSuccess(payload) {
          console.log("Khalti success payload:", payload);
          toast.success("Payment Successful!");
          handleBooking("Booked");
        },
        onError(error) {
          console.log("Khalti error:", error);
          toast.error("Payment Failed. Please try again.");
        },
        onClose() {
          console.log("Khalti widget is closing");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };

    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 100 });
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">Complete Your Booking</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div className="booking-form">
        <div>
          <label>Check-In Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={bookingDetails.checkInDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Check-Out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={bookingDetails.checkOutDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Number of Guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            value={bookingDetails.numberOfGuests}
            onChange={handleInputChange}
          />
        </div>

        {/* Radio Buttons with Images */}
        <div className="radio-options">
          <label>
            <input
              type="radio"
              value="wallet"
              checked={selectedOption === "wallet"}
              onChange={handleRadioChange}
            />
            <img
              src="/assets/icons/khalti.png"
              alt="wallet "
              className="radio-image"
            />
            Pay with Khalti
          </label>
          <label>
            <input
              type="radio"
              value="visit"
              checked={selectedOption === "visit"}
              onChange={handleRadioChange}
            />
            <img
              src="/assets/icons/cash.jpg"
              alt="visit"
              className="radio-image"
            />
            Cash On Visit
          </label>
        </div>

        <div className="total-price">
          Total Price: Rs. {calculateTotalPrice()}
        </div>
        <button className="booking-button" onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
