const { default: apiInstances } = require("./axios");

const createBookingService = async (data) => {
  const response = await apiInstances.post("/booking", data);
  return response
};

export {createBookingService}