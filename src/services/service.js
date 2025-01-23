const { default: apiInstances } = require("./axios")

const listitemsService = async () => {
    const response = await apiInstances.get("/service")
    return response.data
}

export {listitemsService}