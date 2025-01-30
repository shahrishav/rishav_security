import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createRatingComments } from "../apis/Api";

const VenueCard = ({ venueInformation }) => {
  const navigate = useNavigate();
  const [selectedBookNow, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleBookNowClick = () => {
    setSelectedBooking(venueInformation._id);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    try {
      const data = {
        venueId: venueInformation._id,
        userId: JSON.parse(localStorage.getItem("user"))._id,
        rating,
        comment,
      };

      console.log("Sending data:", data);

      const response = await createRatingComments(data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Rating submitted successfully!");
        setTimeout(() => {
          window.location.href = "/user";
        }, 1000);
      } else {
        toast.error("Rating already added by the user!!");
        console.error("Error response data:", response.data);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Rating already added by the user!!");
    }

    setRating(0);
    setComment("");
    handleCloseModal();
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`http://localhost:5500/venues/${venueInformation.image}`}
          className="card-img-top"
          alt={venueInformation.name}
          style={{ height: "180px", objectFit: "cover" }}
        />

        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{venueInformation.name}</h5>
            <i className="bi bi-geo-alt-fill text-danger"></i>
          </div>

          <p className="card-text">{venueInformation.location}</p>
          <p className="card-text">
            {venueInformation.description?.slice(0, 30) ||
              "No description available"}
          </p>

          <div className="total-price">
            <p className="text-center text-info">
              Total Price: {venueInformation.price}
            </p>
          </div>

          <Link
            to={`/venue/${venueInformation._id}/${venueInformation.price}/book`}
          >
            <button
              onClick={handleBookNowClick}
              className="btn btn-outline-dark w-100"
            >
              Book Now!
            </button>
          </Link>

          <button
            onClick={handleShowModal}
            className="btn btn-outline-primary w-100 mt-2"
          >
            View/Add Ratings & Comments
          </button>
        </div>
      </div>

      {/* Modal for displaying and adding ratings */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ratings & Comments</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <h6>Ratings & Comments</h6>
                <ul className="list-group">
                  {venueInformation.ratingComments.length > 0 ? (
                    venueInformation.ratingComments.map((ratingComment) => (
                      <li key={ratingComment._id} className="list-group-item">
                        <strong>Rating:</strong> {ratingComment.rating} ★ <br />
                        <strong>Comment:</strong> {ratingComment.comment}
                      </li>
                    ))
                  ) : (
                    <p>No ratings or comments yet.</p>
                  )}
                </ul>

                <hr />
                <h6>Add Your Rating & Comment</h6>
                <form onSubmit={handleSubmitRating}>
                  <div className="mb-3">
                    <label htmlFor="ratingSelect" className="form-label">
                      Rating
                    </label>
                    <select
                      id="ratingSelect"
                      className="form-select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    >
                      <option value={0}>Select rating</option>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="commentText" className="form-label">
                      Comment
                    </label>
                    <textarea
                      id="commentText"
                      className="form-control"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VenueCard;
