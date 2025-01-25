const { default: apiInstances } = require("./axios");

const createPayment = async (data) => {
  const response = await apiInstances.post("/payment", data);
  return response;
};

const getPayment = async (booking_id) => {
  const response = await apiInstances.get(`/payment/${booking_id}`);
  return response.data;
};

const updatePayment = async (booking_id, room_id) => {
  const response = await apiInstances.put(`/payment/${booking_id}/${room_id}`);
  return response;
};
export { createPayment, getPayment, updatePayment };
