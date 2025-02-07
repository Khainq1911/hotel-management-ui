const { default: apiInstances } = require("./axios");

const listRoomServices = async () => {
  const response = await apiInstances.get("/room/list");
  return response.data;
};

const listTyperoomServices = async () => {
  const response = await apiInstances.get("/typeroom");
  return response.data;
};

const SearchRoomService = async (q) => {
  const response = await apiInstances.get("/room", {
    params: {
      q: q,
    },
  });
  return response.data;
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
};
