import apiInstances from "./axios";

const listEmployeeService = async () => {
  const response = await apiInstances.get("/employee");
  return response.data;
};

const updateEmployeeService = async (id, data) => {
  const response = await apiInstances.put(`/employee/${id}`, data);
  return response;
};

export { listEmployeeService, updateEmployeeService };
