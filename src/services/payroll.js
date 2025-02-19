const { default: apiInstances } = require("./axios");

const listPayroll = async () => {
  const response = await apiInstances.get("/payroll");
  return response.data;
};

const updatePayroll = async (payload, id)=>{
    const response = await apiInstances.put(`/payroll/${id}`, payload)
    return response
}

export { listPayroll, updatePayroll };
