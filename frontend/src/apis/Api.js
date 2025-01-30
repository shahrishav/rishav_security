import axios from "axios";

// Create backend config()uration
const Api = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const config = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Test API
export const testApi = () => Api.get("/test");

// User APIs
export const registerUserApi = (data) => Api.post("/api/user/create", data);
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Category APIs
export const createCategory = (data) => Api.post("/api/categorys/create", data);
export const getAllCategorys = () =>
  Api.get("/api/categorys/get_all_categorys", config());
export const deleteCategory = (id) =>
  Api.post(`/api/categorys/delete_category/${id}`, config());

// Venue APIs
export const getAllVenues = () =>
  Api.get("/api/venues/get_all_venues", config());
export const createVenue = (data) => Api.post("/api/venues/create", data);
export const getVenueById = (id) =>
  Api.get(`/api/venues/get_venue/${id}`, config());
export const updateVenue = (id, data) =>
  Api.post(`/api/venues/update_venue/${id}`, data, config());
export const deleteVenue = (id) =>
  Api.post(`/api/venues/delete_venue/${id}`, config());
// Get all venues within a specific category
// export const getVenuesByCategory = (categoryId) =>
//     Api.get(`/api/venues/get_venues_by_category/${categoryId}`, config());

export const getVenuesByCategory = async (categoryId, page = 1, limit = 10) => {
  // Adjust this endpoint as per your backend setup
  const response = await Api.get(`/api/venues/pagination`, {
    params: { categoryId, page, limit },
  });
  return response;
};

// Venue Pagination
export const getPaginatedVenues = (page, limit) =>
  Api.get(`/api/venues/pagination?page=${page}&limit=${limit}`, config());

// Forgot Password APIs
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot_password", data);
export const verifyOtpApi = (data) => Api.post("/api/user/verify_otp", data);

//Booking
export const createBooking = (data) =>
  Api.post("/api/bookings/create", data, config());
export const getAllBookings = () =>
  Api.get("/api/bookings/get_all_bookings", config());
export const getBookingById = (id) =>
  Api.get(`/api/bookings/get_booking/${id}`, config());
export const updateBooking = (id, data) =>
  Api.post(`/api/bookings/update_booking/${id}`, data, config());
export const cancelBooking = (id) =>
  Api.post(`/api/bookings/cancel_booking/${id}`, config());
export const viewProfileApi = () => Api.get("/api/user/profile", config());
export const updateProfileApi = (data) =>
  Api.put("/api/user/profile_update", data, config());
export const viewBookingApi = (userId) =>
  Api.get(`/api/bookings/user/${userId}`, config());
export const viewAllBookings = () =>
  Api.get(`/api/bookings/get_all_bookings`, config());

//Rating Commets
export const createRatingComments = (data) =>
  Api.post(`/api/rating-comment/create`, data, config())
    .then((response) => response)
    .catch((error) => {
      console.error("API error:", error);
      throw error;
    });
