const { default: apiInstances } = require("./axios");

const checkExitsCustomer = async (q) => {
  const response = await apiInstances.get("/customer/search", {
    params: { q: q },
  });
  return response.data;
};

const createCustomerService = async (data) => {
  const response = await apiInstances.post("/customer", data)
  return response.data
}

export {checkExitsCustomer, createCustomerService}
