const { default: apiInstances } = require("./axios");

const listRoomServices = async () => {
  const response = await apiInstances.get("/room");
  return response.data;
};

const listTyperoomServices = async () => {
  const response = await apiInstances.get("/typeroom");
  return response.data;
};

const updateTypeRoomServices = async (payload, id) => {
  const response = await apiInstances.put(`/typeroom/${id}`, payload);
  return response.data;
};

export { listRoomServices, listTyperoomServices, updateTypeRoomServices };
