const { default: apiInstances } = require("./axios")

const getListShifts = async () => {
    const response = await apiInstances.get("/shifts/list")
    return response.data
}

export { getListShifts }