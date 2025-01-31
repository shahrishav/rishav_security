import React, { useState, useEffect } from "react";
import {
  createVenue,
  createCategory,
  getAllCategorys,
  updateVenue,
  deleteVenue,
  deleteCategory,
} from "../../apis/Api";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [categorys, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newVenueName, setNewVenueName] = useState("");
  const [newVenueLocation, setNewVenueLocation] = useState("");
  const [newVenueRating, setNewVenueRating] = useState("");
  const [newVenuePrice, setNewVenuePrice] = useState(""); // State for venue price
  const [venueImage, setVenueImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [venueToEdit, setVenueToEdit] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryPreviewImage, setCategoryPreviewImage] = useState("");

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const response = await getAllCategorys();
        setCategorys(response.data.data);
        toast.success("Categorys fetched successfully");
      } catch (error) {
        console.error(
          "Error fetching categorys:",
          error.response?.data?.message || error.message
        );
        toast.error("Failed to fetch categorys");
      }
    };
    fetchCategorys();
  }, []);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setVenueImage(file); // for backend
    setPreviewImage(URL.createObjectURL(file)); // for preview
  };

  const handleCategoryImage = (event) => {
    const file = event.target.files[0];
    setCategoryImage(file); // for backend
    setCategoryPreviewImage(URL.createObjectURL(file)); // for preview
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategoryName);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    try {
      const response = await createCategory(formData);
      setCategorys([...categorys, response.data.data]);
      toast.success("Category added successfully");
      setNewCategoryName("");
      setCategoryImage(null);
      setCategoryPreviewImage(null);
    } catch (error) {
      console.error(
        "Error adding category:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add category");
    }
  };

  const handleAddVenue = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("name", newVenueName);
    formData.append("location", newVenueLocation);
    formData.append("rating", newVenueRating);
    formData.append("price", newVenuePrice); // Include price in form data
    formData.append("categoryId", selectedCategory);
    formData.append("image", venueImage);

    console.log("Form Data:", formData);

    try {
      const response = await createVenue(formData);
      console.log("API Response:", response);
      setCategorys(
        categorys.map((dest) =>
          dest._id === selectedCategory
            ? { ...dest, venues: [...dest.venues, response.data.data] }
            : dest
        )
      );
      toast.success("Venue added successfully");
      setNewVenueName("");
      setNewVenueLocation("");
      setNewVenueRating("");
      setNewVenuePrice(""); // Reset price field
      setVenueImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error(
        "Error adding venue:",
        error.response?.data?.message || error.message,
        error.response
      );
      toast.error("Failed to add venue");
    }
  };

  const handleEditVenue = async (e) => {
    e.preventDefault();

    if (!venueToEdit) {
      toast.error("No venue selected for editing");
      return;
    }

    const formData = new FormData();
    formData.append("name", newVenueName);
    formData.append("location", newVenueLocation);
    formData.append("rating", newVenueRating);
    formData.append("price", newVenuePrice); // Include price in form data
    if (venueImage) formData.append("image", venueImage);

    try {
      const response = await updateVenue(venueToEdit._id, formData);
      const updatedVenue = response.data.data;
      setCategorys(
        categorys.map((dest) =>
          dest._id === selectedCategory
            ? {
                ...dest,
                venues: dest.venues.map((venue) =>
                  venue._id === venueToEdit._id ? updatedVenue : venue
                ),
              }
            : dest
        )
      );
      toast.success("Venue updated successfully");
      setNewVenueName("");
      setNewVenueLocation("");
      setNewVenueRating("");
      setNewVenuePrice(""); // Reset price field
      setVenueImage(null);
      setPreviewImage(null);
      setVenueToEdit(null);
    } catch (error) {
      console.error(
        "Error updating venue:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to update venue");
    }
  };

  const handleDeleteVenue = async (venueId) => {
    try {
      await deleteVenue(venueId);
      setCategorys(
        categorys.map((dest) => ({
          ...dest,
          venues: dest.venues.filter((venue) => venue._id !== venueId),
        }))
      );
      toast.success("Venue deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting venue:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete venue");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategorys(categorys.filter((dest) => dest._id !== categoryId));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete category");
    }
  };

  const handleEditButtonClick = (venue) => {
    setVenueToEdit(venue);
    setNewVenueName(venue.name);
    setNewVenueLocation(venue.location);
    setNewVenueRating(venue.rating);
    setNewVenuePrice(venue.price); // Set price for editing
    setPreviewImage(`http://localhost:5500/venues/${venue.image}`);
    setSelectedCategory(venue.categoryId);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="admin-dashboard">
      <h3 className="dashboard-title">Admin Dashboard</h3>

      <button
        type="button"
        className="btn btn-danger add-category-btn"
        data-bs-toggle="modal"
        data-bs-target="#addCategoryModal"
      >
        Add Category
      </button>

      <div
        className="modal fade"
        id="addCategoryModal"
        tabIndex="-1"
        aria-labelledby="addCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCategoryLabel">
                Add a new Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddCategory}>
                <label>Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  required
                />

                <label className="mt-2">Category Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleCategoryImage}
                  required
                />

                {categoryPreviewImage && (
                  <div className="mt-3">
                    <img
                      src={categoryPreviewImage}
                      alt="Preview"
                      className="img-thumbnail"
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-danger mt-3 add-venue-btn"
        data-bs-toggle="modal"
        data-bs-target="#addVenueModal"
      >
        Add Venue
      </button>

      <div
        className="modal fade"
        id="addVenueModal"
        tabIndex="-1"
        aria-labelledby="addVenueLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addVenueLabel">
                {venueToEdit ? "Edit Venue" : "Add a new Venue"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={venueToEdit ? handleEditVenue : handleAddVenue}>
                <label>Choose Category</label>
                <select
                  value={selectedCategory}
                  className="form-control"
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categorys.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label className="mt-2">Venue Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newVenueName}
                  onChange={(e) => setNewVenueName(e.target.value)}
                  placeholder="Enter venue name"
                  required
                />

                <label className="mt-2">Venue Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={newVenueLocation}
                  onChange={(e) => setNewVenueLocation(e.target.value)}
                  placeholder="Enter venue location"
                  required
                />

                <label className="mt-2">Venue Rating</label>
                <input
                  type="number"
                  max={5}
                  min={0}
                  className="form-control"
                  value={newVenueRating}
                  onChange={(e) => setNewVenueRating(e.target.value)}
                  placeholder="Enter venue rating"
                  required
                />

                <label className="mt-2">Venue Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={newVenuePrice}
                  onChange={(e) => setNewVenuePrice(e.target.value)}
                  placeholder="Enter venue price"
                  required
                />

                <label className="mt-2">Venue Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImage}
                  required={!venueToEdit}
                />

                {previewImage && (
                  <div className="mt-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-thumbnail"
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  {venueToEdit ? "Update Venue" : "Add Venue"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="list-container mt-3">
        <h4>Categorys and Venues</h4>
        <ul className="list-group">
          {categorys.map((category) => (
            <li key={category._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{category.name}</strong>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </div>
                <img
                  src={`http://localhost:5500/categorys/${category.image}`}
                  alt={category.name}
                  className="img-thumbnail"
                  style={{ width: "50px" }}
                />
              </div>
              {category.venues && category.venues.length > 0 && (
                <ul className="list-group mt-2">
                  {category.venues.map((venue) => (
                    <li key={venue._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{venue.name}</strong>
                          <button
                            className="btn btn-primary me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#addVenueModal"
                            onClick={() => handleEditButtonClick(venue)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => handleDeleteVenue(venue._id)}
                          >
                            Delete
                          </button>
                        </div>
                        <div>
                          <span>Rs. {venue.price}</span>{" "}
                          {/* Display venue price */}
                          <img
                            src={`http://localhost:5500/venues/${venue.image}`}
                            alt={venue.name}
                            className="img-thumbnail ms-2"
                            style={{ width: "50px" }}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
