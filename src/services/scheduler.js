const { default: apiInstances } = require("./axios");

const getListShifts = async () => {
  const response = await apiInstances.get("/shifts/list");
  return response.data;
};

const getScheduler = async () => {
  const response = await apiInstances.get("/scheduler");
  return response.data;
};

const getSchedulerById = async (id) => {
  const response = await apiInstances.get(`/scheduler/${id}`);
  return response.data;
};

const UpdateSchedulerService = async (id, payload) => {
  const response = await apiInstances.put(`/scheduler/update/${id}`, payload);
  return response;
};
export { getListShifts, getScheduler, getSchedulerById, UpdateSchedulerService };
