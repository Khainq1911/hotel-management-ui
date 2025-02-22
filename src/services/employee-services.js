import apiInstances from "./axios";

const listEmployeeService = async () => {
  const response = await apiInstances.get("/employee");
  return response.data;
};

const queryEmployeeService = async (query) => {
  const response = await apiInstances.get("/employee/search", {
    params: { q: query },
  });
  return response.data;
};

const createEmployeeService = async (payload) => {
  const response = await apiInstances.post("/employee", payload)
  return response
}

const updateEmployeeService = async (id, data) => {
  const response = await apiInstances.put(`/employee/${id}`, data);
  return response;
};

export { listEmployeeService, updateEmployeeService, queryEmployeeService, createEmployeeService };
