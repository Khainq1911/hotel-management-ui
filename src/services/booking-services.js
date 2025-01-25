const { default: apiInstances } = require("./axios");

const createBookingService = async (data) => {
  const response = await apiInstances.post("/booking", data);
  return response;
};
const getBookingService = async (id) => {
  const response = await apiInstances.get(`/booking/${id}`);
  return response.data;
};
export { createBookingService, getBookingService };
