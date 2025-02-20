const { default: apiInstances } = require("./axios");

const listRoomServices = async () => {
  const response = await apiInstances.get("/room/list");
  return response.data;
};

const listTyperoomServices = async () => {
  const response = await apiInstances.get("/typeroom");
  return response.data;
};

const SearchRoomService = async (q, booking_status) => {
  const response = await apiInstances.get("/room", {
    params: {
      q: q,
      booking_status: booking_status,
    },
  });
  return response.data;
};

const updateRoomServices = async (id, payload) => {
  const response = apiInstances.put(`/room/${id}`, payload);
  return response;
};

const updateTypeRoomServices = async (payload, id) => {
  const response = await apiInstances.put(`/typeroom/${id}`, payload);
  return response.data;
};

export {
  listRoomServices,
  listTyperoomServices,
  updateTypeRoomServices,
  SearchRoomService,
  updateRoomServices,
};
