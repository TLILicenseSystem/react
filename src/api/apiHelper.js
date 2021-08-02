import api from "./api2";

export const getAllUser = async (length = 100) => {
    try {
        const response = await api.get(`/?results=${length}`);
        if (response.status === 200) {
            return response.data.results;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        throw err;
    }
}